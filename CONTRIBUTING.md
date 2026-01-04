# Contributing to NexFlow SMF

Thank you for your interest in contributing to NexFlow SMF! This document provides guidelines for contributing to the project.

## 🚀 How to Contribute

### Reporting Issues

1. **Search existing issues** first to avoid duplicates
2. **Use the issue template** when creating new issues
3. **Provide context**: OS, Node version, SDK version, and reproduction steps
4. **Include error messages** and stack traces when applicable

### Submitting Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the code style** of the existing codebase
3. **Add tests** for new functionality
4. **Update documentation** if your changes affect the API
5. **Write clear commit messages** following [Conventional Commits](https://conventionalcommits.org/)

### Pull Request Process

1. Ensure all tests pass: `npm run test`
2. Ensure TypeScript compiles: `npm run typecheck`
3. Update the README if you've changed the public API
4. Your PR will be reviewed by maintainers

## 📁 Project Structure

```
nexflow-smf-public/
├── contracts/       # Solidity smart contracts
│   └── AtomicBatchSettlement.sol
├── sdk/            # TypeScript SDK source
│   ├── src/
│   │   ├── index.ts      # Main exports
│   │   ├── client.ts     # API client
│   │   ├── types.ts      # Type definitions
│   │   ├── errors.ts     # Error classes
│   │   └── utils.ts      # Utility functions
│   └── package.json
├── examples/       # Usage examples
└── README.md
```

## 🛠️ Development Setup

```bash
# Clone the repo
git clone https://github.com/moejeaux/nexflow-smf-public.git
cd nexflow-smf-public

# Install SDK dependencies
cd sdk
npm install

# Build the SDK
npm run build

# Run type checking
npm run typecheck
```

## 📝 Code Style

- **TypeScript**: Use strict mode, prefer explicit types
- **Naming**: camelCase for variables/functions, PascalCase for types/classes
- **Documentation**: JSDoc comments for public APIs
- **No runtime dependencies**: The SDK should remain zero-dependency

## 🔍 Areas for Contribution

- **SDK improvements**: Better error handling, new utility functions
- **Documentation**: Tutorials, API docs, examples
- **Examples**: Real-world integration examples
- **Testing**: Unit tests, integration tests
- **Contract audits**: Security review of Solidity code

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 💬 Questions?

- Open a [GitHub Discussion](https://github.com/moejeaux/nexflow-smf-public/discussions)
- Check the [documentation](https://nexflowapp.app/docs)

Thank you for contributing! 🎉

