# Architecture — v0.4

## Current implementation

The website is static HTML, CSS, and JavaScript. `app.js` owns local panel interactions and presentation. `runtime-contract.js` defines the data shape and validation helpers. `connection.js` exposes a disconnected, simulation-only provider.

No component communicates with Android or Zygisk Next. No local HTTP endpoint is probed. No privileged commands are issued.

## Contract flow

```text
UI view
  │ reads normalized snapshot
  ▼
Connection provider (v0.4: disconnected only)
  │ future adapter would return contract-compliant data
  ▼
Runtime contract validator
```

The provider deliberately returns `disconnected`. A future adapter is only a proposal and must not be added until permission, licensing, security, and compatibility have been reviewed.

## Contract rules

1. `schemaVersion` is an integer and must be explicitly supported.
2. Unknown values remain `null`, `unknown`, or `false`; never invent live status.
3. Capabilities are opt-in declarations, not proof that an operation is safe.
4. The UI must disable runtime actions unless an authorized adapter and capability are present.
5. Any future write operation must be allowlisted, validated, bounded by a timeout, and verified after completion.
6. Errors must fail closed and must not fall back to a simulated “success”.
7. Timestamps are UTC ISO 8601 strings or `null`.
8. Contract data must not contain credentials or unnecessary personal identifiers.

## Connection states

- `disconnected`: no integration is configured.
- `connecting`: an authorized integration is actively establishing a session.
- `connected`: an integration session is established; individual capabilities still require validation.
- `unsupported`: an integration exists but does not support the requested schema or operation.
- `error`: a connection or validation failure occurred.
- `stale`: data was once received but exceeded its freshness policy.

v0.4 intentionally implements only `disconnected` and local simulation behavior. Other states are defined for contract clarity, not evidence of implemented transport.

## Future review gates

- Written upstream permission and license review.
- Threat model and explicit user consent.
- Origin/authentication model and least-privilege permissions.
- Protocol versioning and strict schema validation.
- No generic shell or arbitrary command endpoint.
- Timeouts, replay protection where applicable, audit-safe error handling, and recovery behavior.
- Device and Android-version test matrix.
