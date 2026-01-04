# Security Policy

## 🔒 Reporting Security Vulnerabilities

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability in NexFlow SMF, please report it responsibly:

1. **Email**: Contact us via GitHub Issues with the subject "SECURITY" (we'll follow up privately)
2. **GitHub Security Advisories**: Use GitHub's [private vulnerability reporting](https://github.com/moejeaux/nexflow-smf-public/security/advisories/new)

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes (if available)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Fix Timeline**: Depends on severity (critical: ASAP, high: 1-2 weeks)

## 🛡️ Security Best Practices for Users

### API Keys

- **Never commit API keys** to version control
- Use environment variables or a secrets manager
- Rotate keys periodically
- Use separate keys for development and production

### Smart Contract Interactions

- Verify contract addresses before interacting
- Use the official addresses listed in README.md
- Monitor transactions on [BaseScan](https://basescan.org)

### Dependencies

- Keep the SDK updated to the latest version
- Review changelogs for security patches
- Use `npm audit` to check for known vulnerabilities

## 📋 Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x.x   | ✅ Yes    |
| < 1.0   | ❌ No     |

## 🔗 Resources

- [BaseScan Contract](https://basescan.org/address/0x43A04228152115fDd5663B2Aa559Ebd84D17A49D)
- [NexFlow Documentation](https://nexflowapp.app/docs)

