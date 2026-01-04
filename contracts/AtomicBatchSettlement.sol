// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title AtomicBatchSettlement
 * @author NexFlow Team
 * @notice Atomic batch settlement for x402 payments via Smart Meta-Facilitator (SMF)
 * @dev Settles batched micropayments atomically with Merkle proof verification.
 * 
 * Key features:
 * - Atomic execution: all payments in a batch settle or all fail
 * - Merkle proof verification for payment inclusion
 * - Facilitator escrow management
 * - Platform fee deduction (configurable basis points)
 * - Multi-sig admin controls for critical functions
 * - Time-locked parameter updates (48h delay)
 * 
 * Security considerations:
 * - ReentrancyGuard on all state-changing external functions
 * - SafeERC20 for token transfers
 * - Ownable2Step for ownership transfer safety
 * - Pausable for emergency stops
 */
contract AtomicBatchSettlement is ReentrancyGuard, Ownable2Step, Pausable {
    using SafeERC20 for IERC20;

    // =========================================================================
    // CONSTANTS
    // =========================================================================

    /// @notice Maximum platform fee: 5% (500 basis points)
    uint256 public constant MAX_PLATFORM_FEE_BPS = 500;

    /// @notice Basis points denominator (10000 = 100%)
    uint256 public constant BASIS_POINTS_DENOMINATOR = 10000;

    /// @notice Timelock delay for parameter updates (48 hours)
    uint256 public constant TIMELOCK_DELAY = 48 hours;

    /// @notice Maximum batch size (gas limit consideration)
    uint256 public constant MAX_BATCH_SIZE = 100;

    // =========================================================================
    // STATE VARIABLES
    // =========================================================================

    /// @notice Platform fee in basis points (e.g., 25 = 0.25%)
    uint256 public platformFeeBps;

    /// @notice Address that receives platform fees
    address public feeRecipient;

    /// @notice Multi-sig admin address for privileged operations
    address public adminMultisig;

    /// @notice Escrow balances: facilitator => token => balance
    mapping(address => mapping(address => uint256)) public escrowBalances;

    /// @notice Pending withdrawals to prevent front-running: facilitator => token => amount
    mapping(address => mapping(address => uint256)) public pendingWithdrawals;

    /// @notice Facilitator allowlist
    mapping(address => bool) public facilitatorAllowlist;

    /// @notice Processed batch roots (prevents replay)
    mapping(bytes32 => bool) public processedBatches;

    /// @notice Processed individual payments (prevents replay)
    mapping(bytes32 => bool) public processedPayments;

    /// @notice Accumulated fees per token
    mapping(address => uint256) public accumulatedFees;

    // =========================================================================
    // STRUCTS FOR STACK OPTIMIZATION
    // =========================================================================

    /// @notice Batch settlement parameters (used to reduce stack depth)
    struct BatchParams {
        bytes32 merkleRoot;
        address facilitator;
        address token;
        uint256 count;
    }

    // =========================================================================
    // TIMELOCK STATE
    // =========================================================================

    /// @notice Pending parameter update structure
    struct PendingUpdate {
        uint256 newValue;
        uint256 executeAfter;
        bool exists;
    }

    /// @notice Pending fee update
    PendingUpdate public pendingFeeUpdate;

    /// @notice Pending facilitator updates: facilitator => (allow, executeAfter, exists)
    mapping(address => PendingUpdate) public pendingFacilitatorUpdates;

    // =========================================================================
    // EVENTS
    // =========================================================================

    /// @notice Emitted when a batch is settled successfully
    event BatchSettled(
        bytes32 indexed merkleRoot,
        address indexed facilitator,
        address indexed token,
        uint256 paymentCount,
        uint256 totalAmount,
        uint256 totalFees
    );

    /// @notice Emitted for each individual payment in a batch
    event PaymentProcessed(
        bytes32 indexed batchRoot,
        bytes32 indexed paymentId,
        address indexed recipient,
        uint256 amount,
        address token
    );

    /// @notice Emitted when a facilitator deposits escrow
    event EscrowDeposited(
        address indexed facilitator,
        address indexed token,
        uint256 amount,
        uint256 newBalance
    );

    /// @notice Emitted when a facilitator withdraws escrow
    event EscrowWithdrawn(
        address indexed facilitator,
        address indexed token,
        uint256 amount,
        uint256 newBalance
    );

    /// @notice Emitted when fees are deducted from escrow
    event FeeDeducted(
        bytes32 indexed batchRoot,
        address indexed facilitator,
        uint256 feeAmount
    );

    /// @notice Emitted when a facilitator is slashed
    event SlashingApplied(
        address indexed facilitator,
        address indexed token,
        uint256 amount,
        string reason
    );

    /// @notice Emitted when admin proposes a fee update
    event FeeUpdateProposed(
        uint256 currentFee,
        uint256 newFee,
        uint256 executeAfter
    );

    /// @notice Emitted when a fee update is executed
    event FeeUpdateExecuted(uint256 oldFee, uint256 newFee);

    /// @notice Emitted when admin proposes a facilitator update
    event FacilitatorUpdateProposed(
        address indexed facilitator,
        bool allow,
        uint256 executeAfter
    );

    /// @notice Emitted when a facilitator update is executed
    event FacilitatorUpdateExecuted(address indexed facilitator, bool allow);

    /// @notice Emitted when admin multisig is updated
    event AdminMultisigUpdated(address indexed oldAdmin, address indexed newAdmin);

    /// @notice Emitted when fee recipient is updated
    event FeeRecipientUpdated(address indexed oldRecipient, address indexed newRecipient);

    /// @notice Emitted when fees are withdrawn
    event FeesWithdrawn(address indexed token, uint256 amount, address indexed recipient);

    // =========================================================================
    // ERRORS
    // =========================================================================

    error InvalidMerkleProof();
    error InsufficientEscrowBalance(uint256 required, uint256 available);
    error FacilitatorNotAllowed(address facilitator);
    error BatchAlreadyProcessed(bytes32 merkleRoot);
    error PaymentAlreadyProcessed(bytes32 paymentId);
    error InvalidBatchSize(uint256 size);
    error ArrayLengthMismatch();
    error InvalidFeePercentage(uint256 fee);
    error TimelockNotExpired(uint256 executeAfter, uint256 currentTime);
    error NoPendingUpdate();
    error ZeroAddress();
    error ZeroAmount();
    error NotAdminMultisig();
    error TransferFailed();
    error NoChangeNeeded();

    // =========================================================================
    // MODIFIERS
    // =========================================================================

    /// @notice Restricts function to admin multisig only
    modifier onlyAdminMultisig() {
        if (msg.sender != adminMultisig) revert NotAdminMultisig();
        _;
    }

    /// @notice Validates facilitator is allowlisted
    modifier onlyAllowedFacilitator(address facilitator) {
        if (!facilitatorAllowlist[facilitator]) revert FacilitatorNotAllowed(facilitator);
        _;
    }

    // =========================================================================
    // CONSTRUCTOR
    // =========================================================================

    /**
     * @notice Initialize the contract with admin multisig and initial fee
     * @param _adminMultisig Multi-sig address for admin functions
     * @param _feeRecipient Address that receives platform fees
     * @param _platformFeeBps Initial platform fee in basis points
     * @param _initialFacilitators Array of initially allowed facilitators
     */
    constructor(
        address _adminMultisig,
        address _feeRecipient,
        uint256 _platformFeeBps,
        address[] memory _initialFacilitators
    ) Ownable(msg.sender) {
        if (_adminMultisig == address(0)) revert ZeroAddress();
        if (_feeRecipient == address(0)) revert ZeroAddress();
        if (_platformFeeBps > MAX_PLATFORM_FEE_BPS) revert InvalidFeePercentage(_platformFeeBps);

        adminMultisig = _adminMultisig;
        feeRecipient = _feeRecipient;
        platformFeeBps = _platformFeeBps;

        // Add initial facilitators to allowlist
        for (uint256 i = 0; i < _initialFacilitators.length; i++) {
            if (_initialFacilitators[i] != address(0)) {
                facilitatorAllowlist[_initialFacilitators[i]] = true;
                emit FacilitatorUpdateExecuted(_initialFacilitators[i], true);
            }
        }
    }

    // =========================================================================
    // ESCROW MANAGEMENT
    // =========================================================================

    /**
     * @notice Deposit tokens into escrow for a facilitator
     * @param token ERC20 token address
     * @param amount Amount to deposit
     * @dev Facilitator must be allowlisted. Transfers tokens from msg.sender.
     */
    function depositEscrow(
        address token,
        uint256 amount
    ) external nonReentrant whenNotPaused onlyAllowedFacilitator(msg.sender) {
        if (token == address(0)) revert ZeroAddress();
        if (amount == 0) revert ZeroAmount();

        // Transfer tokens from facilitator to contract
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);

        // Update escrow balance
        escrowBalances[msg.sender][token] += amount;

        emit EscrowDeposited(msg.sender, token, amount, escrowBalances[msg.sender][token]);
    }

    /**
     * @notice Withdraw tokens from escrow
     * @param token ERC20 token address
     * @param amount Amount to withdraw
     * @dev Can only withdraw up to available balance (balance - pending withdrawals)
     */
    function withdrawEscrow(
        address token,
        uint256 amount
    ) external nonReentrant whenNotPaused onlyAllowedFacilitator(msg.sender) {
        if (token == address(0)) revert ZeroAddress();
        if (amount == 0) revert ZeroAmount();

        // Cache SLOAD and account for pending withdrawals
        uint256 balance = escrowBalances[msg.sender][token];
        uint256 pending = pendingWithdrawals[msg.sender][token];
        uint256 available = balance - pending;
        
        if (amount > available) revert InsufficientEscrowBalance(amount, available);

        // Update escrow balance
        escrowBalances[msg.sender][token] -= amount;

        // Transfer tokens to facilitator
        IERC20(token).safeTransfer(msg.sender, amount);

        emit EscrowWithdrawn(msg.sender, token, amount, escrowBalances[msg.sender][token]);
    }

    // =========================================================================
    // ATOMIC BATCH SETTLEMENT
    // =========================================================================

    /**
     * @notice Settle a batch of payments atomically
     * @param merkleRoot Merkle root committing to the batch
     * @param facilitator Facilitator whose escrow is used
     * @param token ERC20 token address for payments
     * @param paymentIds Unique identifiers for each payment
     * @param recipients Array of payment recipient addresses
     * @param amounts Array of payment amounts (in wei)
     * @param merkleProofs Array of Merkle proofs for each payment
     * @dev All payments must verify or entire transaction reverts.
     *      Fees are deducted from facilitator's escrow atomically.
     *      
     * ATOMIC EXECUTION FLOW:
     * 1. Validate batch hasn't been processed (replay protection)
     * 2. Validate facilitator is allowed and has sufficient escrow
     * 3. For each payment:
     *    a. Verify Merkle proof against root
     *    b. Check payment hasn't been processed (idempotency)
     *    c. Calculate and accrue fee
     *    d. Transfer net amount to recipient
     * 4. Deduct total fees from escrow
     * 5. Mark batch as processed
     * 6. If ANY step fails, ENTIRE transaction reverts
     */
    function settleBatch(
        bytes32 merkleRoot,
        address facilitator,
        address token,
        bytes32[] calldata paymentIds,
        address[] calldata recipients,
        uint256[] calldata amounts,
        bytes32[][] calldata merkleProofs
    ) external nonReentrant whenNotPaused onlyAllowedFacilitator(facilitator) {
        // Use struct to reduce stack depth
        BatchParams memory params = BatchParams({
            merkleRoot: merkleRoot,
            facilitator: facilitator,
            token: token,
            count: paymentIds.length
        });
        
        // Validate inputs
        _validateBatchInput(params.count, recipients.length, amounts.length, merkleProofs.length);
        _validateBatchNotProcessed(params.merkleRoot);
        
        // Execute settlement
        _executeSettlement(params, paymentIds, recipients, amounts, merkleProofs);
    }
    
    /**
     * @notice Execute the settlement (separated to reduce stack depth)
     */
    function _executeSettlement(
        BatchParams memory params,
        bytes32[] calldata paymentIds,
        address[] calldata recipients,
        uint256[] calldata amounts,
        bytes32[][] calldata merkleProofs
    ) internal {
        // Calculate totals
        (uint256 totalAmount, uint256 totalFees) = _calculateBatchTotals(amounts);
        
        // Validate escrow
        _validateEscrowBalance(params.facilitator, params.token, totalAmount + totalFees);

        // Process all payments
        _processPayments(params.merkleRoot, params.token, paymentIds, recipients, amounts, merkleProofs);

        // Finalize
        _finalizeBatch(params, totalAmount, totalFees);
    }

    /**
     * @notice Validate batch input arrays
     */
    function _validateBatchInput(
        uint256 paymentCount,
        uint256 recipientCount,
        uint256 amountCount,
        uint256 proofCount
    ) internal pure {
        if (paymentCount == 0 || paymentCount > MAX_BATCH_SIZE) {
            revert InvalidBatchSize(paymentCount);
        }
        if (recipientCount != paymentCount || amountCount != paymentCount || proofCount != paymentCount) {
            revert ArrayLengthMismatch();
        }
    }

    /**
     * @notice Check batch hasn't been processed (replay protection)
     */
    function _validateBatchNotProcessed(bytes32 merkleRoot) internal view {
        if (processedBatches[merkleRoot]) {
            revert BatchAlreadyProcessed(merkleRoot);
        }
    }

    /**
     * @notice Calculate total amounts and fees for a batch
     */
    function _calculateBatchTotals(
        uint256[] calldata amounts
    ) internal view returns (uint256 totalAmount, uint256 totalFees) {
        uint256 len = amounts.length;
        for (uint256 i = 0; i < len;) {
            totalAmount += amounts[i];
            totalFees += _calculateFee(amounts[i]);
            unchecked { ++i; }
        }
    }

    /**
     * @notice Validate facilitator has sufficient escrow
     */
    function _validateEscrowBalance(
        address facilitator,
        address token,
        uint256 required
    ) internal view {
        uint256 available = escrowBalances[facilitator][token];
        if (available < required) {
            revert InsufficientEscrowBalance(required, available);
        }
    }

    /**
     * @notice Process all payments in a batch
     */
    function _processPayments(
        bytes32 merkleRoot,
        address token,
        bytes32[] calldata paymentIds,
        address[] calldata recipients,
        uint256[] calldata amounts,
        bytes32[][] calldata merkleProofs
    ) internal {
        uint256 len = paymentIds.length;
        for (uint256 i = 0; i < len;) {
            _processSinglePayment(
                merkleRoot,
                token,
                paymentIds[i],
                recipients[i],
                amounts[i],
                merkleProofs[i]
            );
            unchecked { ++i; }
        }
    }

    /**
     * @notice Process a single payment within a batch
     */
    function _processSinglePayment(
        bytes32 merkleRoot,
        address token,
        bytes32 paymentId,
        address recipient,
        uint256 amount,
        bytes32[] calldata merkleProof
    ) internal {
        // Check payment hasn't been processed
        if (processedPayments[paymentId]) {
            revert PaymentAlreadyProcessed(paymentId);
        }

        // Verify Merkle proof (use abi.encode to prevent hash collisions)
        bytes32 leaf = keccak256(abi.encode(paymentId, recipient, amount, token));
        if (!MerkleProof.verify(merkleProof, merkleRoot, leaf)) {
            revert InvalidMerkleProof();
        }

        // Mark payment as processed
        processedPayments[paymentId] = true;

        // Transfer payment to recipient
        IERC20(token).safeTransfer(recipient, amount);

        emit PaymentProcessed(merkleRoot, paymentId, recipient, amount, token);
    }

    /**
     * @notice Finalize batch: deduct escrow, accumulate fees, mark processed
     */
    function _finalizeBatch(
        BatchParams memory params,
        uint256 totalAmount,
        uint256 totalFees
    ) internal {
        // Deduct from escrow (payments + fees)
        escrowBalances[params.facilitator][params.token] -= (totalAmount + totalFees);

        // Accumulate fees for later withdrawal
        accumulatedFees[params.token] += totalFees;

        // Mark batch as processed
        processedBatches[params.merkleRoot] = true;

        emit FeeDeducted(params.merkleRoot, params.facilitator, totalFees);
        emit BatchSettled(params.merkleRoot, params.facilitator, params.token, params.count, totalAmount, totalFees);
    }

    /**
     * @notice Verify a single Merkle proof (view function for off-chain verification)
     * @param paymentId Unique payment identifier
     * @param recipient Payment recipient
     * @param amount Payment amount
     * @param token Token address
     * @param merkleProof Proof path
     * @param merkleRoot Expected root
     * @return valid Whether the proof is valid
     */
    function verifyPaymentProof(
        bytes32 paymentId,
        address recipient,
        uint256 amount,
        address token,
        bytes32[] calldata merkleProof,
        bytes32 merkleRoot
    ) external pure returns (bool valid) {
        // Use abi.encode to prevent hash collisions (matches _processSinglePayment)
        bytes32 leaf = keccak256(abi.encode(paymentId, recipient, amount, token));
        return MerkleProof.verify(merkleProof, merkleRoot, leaf);
    }

    // =========================================================================
    // FEE MANAGEMENT
    // =========================================================================

    /**
     * @notice Calculate platform fee for an amount
     * @param amount Payment amount
     * @return fee Fee amount
     */
    function calculateFee(uint256 amount) external view returns (uint256 fee) {
        return _calculateFee(amount);
    }

    /**
     * @notice Internal fee calculation
     */
    function _calculateFee(uint256 amount) internal view returns (uint256) {
        // Round up to ensure platform always receives full fee
        return (amount * platformFeeBps + BASIS_POINTS_DENOMINATOR - 1) / BASIS_POINTS_DENOMINATOR;
    }

    /**
     * @notice Withdraw accumulated fees
     * @param token Token to withdraw fees for
     * @dev Only callable by fee recipient
     */
    function withdrawFees(address token) external nonReentrant {
        if (msg.sender != feeRecipient) revert NotAdminMultisig();

        uint256 amount = accumulatedFees[token];
        if (amount == 0) revert ZeroAmount();

        accumulatedFees[token] = 0;
        IERC20(token).safeTransfer(feeRecipient, amount);

        emit FeesWithdrawn(token, amount, feeRecipient);
    }

    // =========================================================================
    // ADMIN FUNCTIONS (MULTI-SIG ONLY)
    // =========================================================================

    /**
     * @notice Slash a misbehaving facilitator's escrow
     * @param facilitator Facilitator to slash
     * @param token Token to slash
     * @param amount Amount to slash
     * @param reason Reason for slashing
     * @dev Only callable by admin multisig. Slashed funds go to fee recipient.
     */
    function slashFacilitator(
        address facilitator,
        address token,
        uint256 amount,
        string calldata reason
    ) external onlyAdminMultisig nonReentrant {
        if (token == address(0)) revert ZeroAddress();
        
        uint256 available = escrowBalances[facilitator][token];
        uint256 slashAmount = amount > available ? available : amount;

        escrowBalances[facilitator][token] -= slashAmount;
        IERC20(token).safeTransfer(feeRecipient, slashAmount);

        emit SlashingApplied(facilitator, token, slashAmount, reason);
    }

    /**
     * @notice Update admin multisig address
     * @param newAdminMultisig New admin multisig address
     * @dev Only callable by current admin multisig
     */
    function updateAdminMultisig(address newAdminMultisig) external onlyAdminMultisig {
        if (newAdminMultisig == address(0)) revert ZeroAddress();

        address oldAdmin = adminMultisig;
        adminMultisig = newAdminMultisig;

        emit AdminMultisigUpdated(oldAdmin, newAdminMultisig);
    }

    /**
     * @notice Update fee recipient address
     * @param newFeeRecipient New fee recipient address
     * @dev Only callable by admin multisig
     */
    function updateFeeRecipient(address newFeeRecipient) external onlyAdminMultisig {
        if (newFeeRecipient == address(0)) revert ZeroAddress();

        address oldRecipient = feeRecipient;
        feeRecipient = newFeeRecipient;

        emit FeeRecipientUpdated(oldRecipient, newFeeRecipient);
    }

    // =========================================================================
    // TIME-LOCKED PARAMETER UPDATES
    // =========================================================================

    /**
     * @notice Propose a platform fee update (subject to 48h timelock)
     * @param newFeeBps New fee in basis points
     */
    function proposeFeeUpdate(uint256 newFeeBps) external onlyAdminMultisig {
        if (newFeeBps > MAX_PLATFORM_FEE_BPS) revert InvalidFeePercentage(newFeeBps);

        uint256 executeAfter = block.timestamp + TIMELOCK_DELAY;
        pendingFeeUpdate = PendingUpdate({
            newValue: newFeeBps,
            executeAfter: executeAfter,
            exists: true
        });

        emit FeeUpdateProposed(platformFeeBps, newFeeBps, executeAfter);
    }

    /**
     * @notice Execute a pending fee update after timelock expires
     */
    function executeFeeUpdate() external onlyAdminMultisig {
        if (!pendingFeeUpdate.exists) revert NoPendingUpdate();
        if (block.timestamp < pendingFeeUpdate.executeAfter) {
            revert TimelockNotExpired(pendingFeeUpdate.executeAfter, block.timestamp);
        }

        uint256 oldFee = platformFeeBps;
        platformFeeBps = pendingFeeUpdate.newValue;
        delete pendingFeeUpdate;

        emit FeeUpdateExecuted(oldFee, platformFeeBps);
    }

    /**
     * @notice Cancel a pending fee update
     */
    function cancelFeeUpdate() external onlyAdminMultisig {
        delete pendingFeeUpdate;
    }

    /**
     * @notice Propose a facilitator allowlist update (subject to 48h timelock)
     * @param facilitator Facilitator address
     * @param allow Whether to allow or disallow
     */
    function proposeFacilitatorUpdate(
        address facilitator,
        bool allow
    ) external onlyAdminMultisig {
        if (facilitator == address(0)) revert ZeroAddress();
        
        // Prevent redundant updates
        if (facilitatorAllowlist[facilitator] == allow) revert NoChangeNeeded();

        uint256 executeAfter = block.timestamp + TIMELOCK_DELAY;
        pendingFacilitatorUpdates[facilitator] = PendingUpdate({
            newValue: allow ? 1 : 0,
            executeAfter: executeAfter,
            exists: true
        });

        emit FacilitatorUpdateProposed(facilitator, allow, executeAfter);
    }

    /**
     * @notice Execute a pending facilitator update after timelock expires
     * @param facilitator Facilitator address
     */
    function executeFacilitatorUpdate(address facilitator) external onlyAdminMultisig {
        PendingUpdate memory update = pendingFacilitatorUpdates[facilitator];
        if (!update.exists) revert NoPendingUpdate();
        if (block.timestamp < update.executeAfter) {
            revert TimelockNotExpired(update.executeAfter, block.timestamp);
        }

        bool allow = update.newValue == 1;
        facilitatorAllowlist[facilitator] = allow;
        delete pendingFacilitatorUpdates[facilitator];

        emit FacilitatorUpdateExecuted(facilitator, allow);
    }

    /**
     * @notice Cancel a pending facilitator update
     * @param facilitator Facilitator address
     */
    function cancelFacilitatorUpdate(address facilitator) external onlyAdminMultisig {
        delete pendingFacilitatorUpdates[facilitator];
    }

    // =========================================================================
    // EMERGENCY FUNCTIONS
    // =========================================================================

    /**
     * @notice Pause contract (emergency stop)
     * @dev Only callable by owner or admin multisig
     */
    function pause() external {
        if (msg.sender != owner() && msg.sender != adminMultisig) {
            revert NotAdminMultisig();
        }
        _pause();
    }

    /**
     * @notice Unpause contract
     * @dev Only callable by owner or admin multisig
     */
    function unpause() external {
        if (msg.sender != owner() && msg.sender != adminMultisig) {
            revert NotAdminMultisig();
        }
        _unpause();
    }

    // =========================================================================
    // VIEW FUNCTIONS
    // =========================================================================

    /**
     * @notice Get escrow balance for a facilitator and token
     * @param facilitator Facilitator address
     * @param token Token address
     * @return balance Current escrow balance
     */
    function getEscrowBalance(
        address facilitator,
        address token
    ) external view returns (uint256 balance) {
        return escrowBalances[facilitator][token];
    }

    /**
     * @notice Check if a batch has been processed
     * @param merkleRoot Batch merkle root
     * @return processed Whether the batch was processed
     */
    function isBatchProcessed(bytes32 merkleRoot) external view returns (bool processed) {
        return processedBatches[merkleRoot];
    }

    /**
     * @notice Check if a payment has been processed
     * @param paymentId Payment ID
     * @return processed Whether the payment was processed
     */
    function isPaymentProcessed(bytes32 paymentId) external view returns (bool processed) {
        return processedPayments[paymentId];
    }

    /**
     * @notice Check if a facilitator is allowed
     * @param facilitator Facilitator address
     * @return allowed Whether the facilitator is allowed
     */
    function isFacilitatorAllowed(address facilitator) external view returns (bool allowed) {
        return facilitatorAllowlist[facilitator];
    }
}

