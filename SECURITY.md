# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 1.x.x   | ✅         |
| < 1.0   | ❌         |

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via a private security issue to ensure responsible disclosure.

Include the following information:
- Component name and version
- Type of issue (e.g., XSS, CSRF, injection)
- Full paths of source file(s) related to the issue
- Location of the affected source code (tag/branch/commit)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact assessment

## Response Timeline

- **Initial Response**: Within 48 hours
- **Vulnerability Assessment**: Within 7 days
- **Fix Release**: Within 30 days (depending on severity)
- **Security Advisory**: Published after fix is deployed

## Disclosure Policy

We follow a coordinated disclosure process:

1. Security researcher reports vulnerability privately
2. We acknowledge receipt within 48 hours
3. We work on a fix and keep the reporter updated
4. We release a patch and publish a security advisory
5. Researcher can publish details 30 days after fix release

## Security Best Practices

When using Nolly Components:

### General
- Keep dependencies up to date (`pnpm update`)
- Run `pnpm audit` regularly
- Use Content Security Policy (CSP) headers
- Enable HTTPS for all resources

### Music Player
- **Audio sources**: Always use HTTPS URLs
- **User-provided URLs**: Validate and sanitize
- **CORS**: Configure properly for cross-origin audio
- **Streaming**: Use trusted HLS/DASH sources only
- **Global state**: Sanitize data before storing

### Custom Components
- **Props validation**: Validate all user inputs
- **XSS prevention**: Sanitize HTML content
- **Event handlers**: Avoid inline event handlers
- **Third-party scripts**: Load from trusted CDNs only

## Dependency Security

We monitor dependencies with:

- **Dependabot**: Automatic security updates
- **npm audit**: Weekly vulnerability scans
- **GitHub Security Advisories**: Real-time alerts

## Known Limitations

### Music Player
- **CORS**: May fail with improperly configured audio servers
- **HLS streams**: Requires trusted sources (no user-provided streams without validation)
- **Web Audio API**: Requires user interaction to start (browser policy)

## Hall of Fame

We appreciate security researchers who help keep Nolly Components secure:

- (Your name could be here!)

---

Thank you for helping keep Nolly Components secure!