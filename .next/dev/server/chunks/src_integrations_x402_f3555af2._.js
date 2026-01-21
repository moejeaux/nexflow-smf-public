module.exports = [
"[project]/src/integrations/x402/caip-utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// CAIP (Chain Agnostic Improvement Proposals) Utilities
// =============================================================================
// Utilities for parsing, formatting, and validating CAIP identifiers
// CAIP-2: Blockchain ID Specification
// CAIP-19: Asset ID Specification
/**
 * CAIP-2 Network Identifier
 * Format: <namespace>:<reference>
 * Examples:
 * - eip155:1 (Ethereum Mainnet)
 * - eip155:8453 (Base)
 * - eip155:56 (BNB Chain)
 * - eip155:137 (Polygon)
 * - solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp (Solana Mainnet)
 */ __turbopack_context__.s([
    "CAIP_ASSETS",
    ()=>CAIP_ASSETS,
    "CAIP_NETWORKS",
    ()=>CAIP_NETWORKS,
    "caipToNetwork",
    ()=>caipToNetwork,
    "formatCAIPAsset",
    ()=>formatCAIPAsset,
    "formatCAIPNetwork",
    ()=>formatCAIPNetwork,
    "getChainId",
    ()=>getChainId,
    "getTokenAddress",
    ()=>getTokenAddress,
    "isEVMNetwork",
    ()=>isEVMNetwork,
    "isSolanaNetwork",
    ()=>isSolanaNetwork,
    "networkToCAIP",
    ()=>networkToCAIP,
    "parseCAIPAsset",
    ()=>parseCAIPAsset,
    "parseCAIPNetwork",
    ()=>parseCAIPNetwork,
    "tokenToCAIP",
    ()=>tokenToCAIP,
    "validateCAIPAsset",
    ()=>validateCAIPAsset,
    "validateCAIPNetwork",
    ()=>validateCAIPNetwork
]);
function parseCAIPNetwork(caip) {
    try {
        const [namespace, reference] = caip.split(':');
        if (!namespace || !reference) {
            return null;
        }
        // For EVM chains (eip155), reference is the chain ID
        let chainId;
        if (namespace === 'eip155') {
            chainId = parseInt(reference, 10);
            if (isNaN(chainId)) {
                return null;
            }
        }
        return {
            namespace,
            reference,
            chainId
        };
    } catch  {
        return null;
    }
}
function formatCAIPNetwork(namespace, reference) {
    return `${namespace}:${reference}`;
}
function parseCAIPAsset(caip) {
    try {
        const parts = caip.split('/');
        if (parts.length !== 2) {
            return null;
        }
        const networkPart = parts[0];
        const assetPart = parts[1];
        const network = parseCAIPNetwork(networkPart);
        if (!network) {
            return null;
        }
        const [assetNamespace, assetReference] = assetPart.split(':');
        if (!assetNamespace || !assetReference) {
            return null;
        }
        return {
            network,
            assetNamespace,
            assetReference,
            address: assetNamespace === 'erc20' ? assetReference : undefined
        };
    } catch  {
        return null;
    }
}
function formatCAIPAsset(network, assetNamespace, assetReference) {
    return `${network}/${assetNamespace}:${assetReference}`;
}
function networkToCAIP(network) {
    const networkMap = {
        ethereum: 'eip155:1',
        mainnet: 'eip155:1',
        base: 'eip155:8453',
        'base-mainnet': 'eip155:8453',
        bnb: 'eip155:56',
        'bnb-chain': 'eip155:56',
        'bsc': 'eip155:56',
        polygon: 'eip155:137',
        'polygon-mainnet': 'eip155:137',
        arbitrum: 'eip155:42161',
        'arbitrum-one': 'eip155:42161',
        optimism: 'eip155:10',
        'optimism-mainnet': 'eip155:10',
        avalanche: 'eip155:43114',
        'avalanche-mainnet': 'eip155:43114',
        solana: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
        'solana-mainnet': 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'
    };
    const normalized = network.toLowerCase().replace(/_/g, '-');
    return networkMap[normalized] || null;
}
function caipToNetwork(caip) {
    const parsed = parseCAIPNetwork(caip);
    if (!parsed) {
        return null;
    }
    if (parsed.namespace === 'eip155') {
        const chainIdMap = {
            1: 'ethereum',
            8453: 'base',
            56: 'bnb',
            137: 'polygon',
            42161: 'arbitrum',
            10: 'optimism',
            43114: 'avalanche'
        };
        return chainIdMap[parsed.chainId] || null;
    }
    if (parsed.namespace === 'solana') {
        return 'solana';
    }
    return null;
}
function getChainId(caip) {
    const parsed = parseCAIPNetwork(caip);
    if (parsed?.namespace === 'eip155' && parsed.chainId) {
        return parsed.chainId;
    }
    return null;
}
function isEVMNetwork(caip) {
    const parsed = parseCAIPNetwork(caip);
    return parsed?.namespace === 'eip155' || false;
}
function isSolanaNetwork(caip) {
    const parsed = parseCAIPNetwork(caip);
    return parsed?.namespace === 'solana' || false;
}
function validateCAIPNetwork(caip) {
    return parseCAIPNetwork(caip) !== null;
}
function validateCAIPAsset(caip) {
    return parseCAIPAsset(caip) !== null;
}
function getTokenAddress(caip) {
    const parsed = parseCAIPAsset(caip);
    if (parsed?.assetNamespace === 'erc20') {
        return parsed.address || null;
    }
    return null;
}
function tokenToCAIP(network, tokenAddress) {
    const networkCAIP = networkToCAIP(network);
    if (!networkCAIP) {
        return null;
    }
    return formatCAIPAsset(networkCAIP, 'erc20', tokenAddress);
}
const CAIP_NETWORKS = {
    ETHEREUM: 'eip155:1',
    BASE: 'eip155:8453',
    BNB_CHAIN: 'eip155:56',
    POLYGON: 'eip155:137',
    ARBITRUM: 'eip155:42161',
    OPTIMISM: 'eip155:10',
    AVALANCHE: 'eip155:43114',
    SOLANA: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'
};
const CAIP_ASSETS = {
    USDC_ETHEREUM: 'eip155:1/erc20:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    USDC_BASE: 'eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    USDC_POLYGON: 'eip155:137/erc20:0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    USDC_ARBITRUM: 'eip155:42161/erc20:0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    USDC_OPTIMISM: 'eip155:10/erc20:0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
    ETH_ETHEREUM: 'eip155:1/slip44:60'
};
}),
"[project]/src/integrations/x402/chain-registry.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// CHAIN REGISTRY
// =============================================================================
// Registry of supported blockchain networks with metadata
__turbopack_context__.s([
    "ChainRegistry",
    ()=>ChainRegistry,
    "getChainRegistry",
    ()=>getChainRegistry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/caip-utils.ts [app-route] (ecmascript)");
;
class ChainRegistry {
    networks = new Map();
    constructor(){
        this.registerDefaultNetworks();
    }
    /**
   * Register a network
   */ register(network) {
        this.networks.set(network.caip, network);
    }
    /**
   * Get network metadata by CAIP identifier
   */ get(caip) {
        return this.networks.get(caip);
    }
    /**
   * Get network by legacy name
   */ getByLegacyName(name) {
        for (const network of this.networks.values()){
            if (network.name.toLowerCase() === name.toLowerCase()) {
                return network;
            }
        }
        return undefined;
    }
    /**
   * Get all registered networks
   */ getAll() {
        return Array.from(this.networks.values());
    }
    /**
   * Get all EVM networks
   */ getEVMs() {
        return Array.from(this.networks.values()).filter((n)=>n.isEVM);
    }
    /**
   * Get all Solana networks
   */ getSolanas() {
        return Array.from(this.networks.values()).filter((n)=>n.isSolana);
    }
    /**
   * Check if network is registered
   */ has(caip) {
        return this.networks.has(caip);
    }
    /**
   * Register default networks
   */ registerDefaultNetworks() {
        // Ethereum Mainnet
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].ETHEREUM,
            name: 'ethereum',
            displayName: 'Ethereum',
            chainId: 1,
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: [
                'https://eth.llamarpc.com'
            ],
            blockExplorers: [
                {
                    name: 'Etherscan',
                    url: 'https://etherscan.io'
                }
            ],
            isTestnet: false,
            isEVM: true,
            isSolana: false,
            supportsEIP1559: true,
            averageGasPrice: '30000000000',
            averageBlockTime: 12
        });
        // Base
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].BASE,
            name: 'base',
            displayName: 'Base',
            chainId: 8453,
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: [
                'https://mainnet.base.org'
            ],
            blockExplorers: [
                {
                    name: 'BaseScan',
                    url: 'https://basescan.org'
                }
            ],
            isTestnet: false,
            isEVM: true,
            isSolana: false,
            supportsEIP1559: true,
            averageGasPrice: '1000000',
            averageBlockTime: 2
        });
        // BNB Chain
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].BNB_CHAIN,
            name: 'bnb',
            displayName: 'BNB Chain',
            chainId: 56,
            nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18
            },
            rpcUrls: [
                'https://bsc-dataseed.binance.org'
            ],
            blockExplorers: [
                {
                    name: 'BscScan',
                    url: 'https://bscscan.com'
                }
            ],
            isTestnet: false,
            isEVM: true,
            isSolana: false,
            supportsEIP1559: false,
            averageGasPrice: '3000000000',
            averageBlockTime: 3
        });
        // Polygon
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].POLYGON,
            name: 'polygon',
            displayName: 'Polygon',
            chainId: 137,
            nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
            },
            rpcUrls: [
                'https://polygon-rpc.com'
            ],
            blockExplorers: [
                {
                    name: 'PolygonScan',
                    url: 'https://polygonscan.com'
                }
            ],
            isTestnet: false,
            isEVM: true,
            isSolana: false,
            supportsEIP1559: true,
            averageGasPrice: '30000000000',
            averageBlockTime: 2
        });
        // Arbitrum One
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].ARBITRUM,
            name: 'arbitrum',
            displayName: 'Arbitrum One',
            chainId: 42161,
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: [
                'https://arb1.arbitrum.io/rpc'
            ],
            blockExplorers: [
                {
                    name: 'Arbiscan',
                    url: 'https://arbiscan.io'
                }
            ],
            isTestnet: false,
            isEVM: true,
            isSolana: false,
            supportsEIP1559: true,
            averageGasPrice: '100000000',
            averageBlockTime: 0.25
        });
        // Optimism
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].OPTIMISM,
            name: 'optimism',
            displayName: 'Optimism',
            chainId: 10,
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: [
                'https://mainnet.optimism.io'
            ],
            blockExplorers: [
                {
                    name: 'Optimistic Etherscan',
                    url: 'https://optimistic.etherscan.io'
                }
            ],
            isTestnet: false,
            isEVM: true,
            isSolana: false,
            supportsEIP1559: true,
            averageGasPrice: '1000000',
            averageBlockTime: 2
        });
        // Avalanche
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].AVALANCHE,
            name: 'avalanche',
            displayName: 'Avalanche',
            chainId: 43114,
            nativeCurrency: {
                name: 'AVAX',
                symbol: 'AVAX',
                decimals: 18
            },
            rpcUrls: [
                'https://api.avax.network/ext/bc/C/rpc'
            ],
            blockExplorers: [
                {
                    name: 'Snowtrace',
                    url: 'https://snowtrace.io'
                }
            ],
            isTestnet: false,
            isEVM: true,
            isSolana: false,
            supportsEIP1559: true,
            averageGasPrice: '25000000000',
            averageBlockTime: 2
        });
        // Solana Mainnet (placeholder - full support when SDK available)
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].SOLANA,
            name: 'solana',
            displayName: 'Solana',
            chainId: null,
            nativeCurrency: {
                name: 'SOL',
                symbol: 'SOL',
                decimals: 9
            },
            rpcUrls: [
                'https://api.mainnet-beta.solana.com'
            ],
            blockExplorers: [
                {
                    name: 'Solana Explorer',
                    url: 'https://explorer.solana.com'
                }
            ],
            isTestnet: false,
            isEVM: false,
            isSolana: true,
            averageBlockTime: 0.4
        });
    }
}
// Singleton instance
let chainRegistry = null;
function getChainRegistry() {
    if (!chainRegistry) {
        chainRegistry = new ChainRegistry();
    }
    return chainRegistry;
}
}),
];

//# sourceMappingURL=src_integrations_x402_f3555af2._.js.map