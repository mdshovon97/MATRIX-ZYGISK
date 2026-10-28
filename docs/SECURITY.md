# Security and privacy boundary

## v0.4 scope

This version is a static website prototype. It does not access Android APIs, use ADB, call a local bridge, execute shell commands, or change root/runtime settings. The demo provider must remain simulation-only.

## Non-negotiable requirements for future integration

1. **No generic privileged shell.** Expose narrowly defined, allowlisted operations only.
2. **Least privilege.** The future device-side component should request only the permissions required for each documented capability.
3. **Authentication and origin checks.** A future local interface must authenticate its client and validate allowed origins; CORS alone is not authentication.
4. **No open localhost API.** Do not expose a root-capable endpoint to arbitrary websites or bind privileged services to all interfaces.
5. **Strict schema validation.** Reject unexpected fields, oversized payloads, unsupported schema versions, invalid enum values, and malformed identifiers.
6. **Fail closed.** A timeout, parse error, unsupported capability, or disconnect must never be shown as a successful change.
7. **Verify writes.** If permitted writes are ever implemented, read back the state and report the actual result.
8. **Protect diagnostics.** Logs may include package names, paths, identifiers, and environment details. Redact and preview before export or sharing.
9. **No secret storage in web assets.** Never embed tokens, private keys, signing material, or root credentials in HTML/JS.
10. **Permission and compatibility review.** Review upstream restrictions and all applicable licensing before any integration, packaging, or redistribution.

## Threats to consider

- Malicious websites attempting to call a local privileged service.
- Cross-origin requests and DNS rebinding against a future local bridge.
- Stale or forged runtime state.
- Untrusted module names or other values inserted into the DOM.
- Sensitive diagnostic output accidentally shared.
- Compromised third-party GitHub Actions or dependencies.
- Misleading UI states that encourage risky device changes.

## Release gate

Do not advertise runtime functionality until the architecture and permissions are reviewed, the implementation is permitted, and integration tests validate both success and failure paths on documented devices. Static CI success is not a security audit.
