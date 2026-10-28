# Feature matrix — v0.4

Status definitions:

- **Implemented (UI):** the independent web interface exists.
- **Prototype:** visual or local-only demonstration; not connected to Android.
- **Planned:** requires future design and review.
- **Unavailable:** no implementation currently exists.
- **Not verified:** not tested against a real device/runtime.

| Feature | v0.4 status | Evidence / limitation |
|---|---|---|
| Responsive interface | Implemented (UI) | Static HTML/CSS |
| Management panel navigation | Implemented (UI) | Local expand/collapse |
| Runtime contract | Implemented (contract only) | Schema and validation helpers |
| Connection state | Implemented (disconnected only) | No transport |
| Runtime version / ABI / SDK | Unavailable | No device data |
| Root implementation/version | Unavailable | No root-manager integration |
| Injection / Zygote status | Unavailable | No runtime telemetry |
| App denylist policy | Prototype | Demo control only |
| Treat non-root apps as denylist | Prototype | Demo control only |
| Anonymous memory | Prototype | Demo control only; not a RAM optimizer |
| Zygisk Next linker | Prototype | Demo control only |
| dmesg logging | Prototype | Demo control only |
| Zygote blacklist | Planned | No runtime write path |
| 32-bit / 64-bit module inventory | Unavailable | No module enumeration |
| Issue detection | Unavailable | No live diagnostics |
| Bugreport export | Unavailable | No report generation |
| Upstream release link | Implemented (link) | Manual upstream review |
| Checksum verification | Planned/manual documentation | No automated verifier |
| Automatic upstream synchronization | Not implemented | Must respect upstream restrictions |
| Android companion/local adapter | Planned review only | Not implemented or approved |
| Device compatibility | Not verified | No integration test evidence |
| APK / flashable ZIP | Unavailable | Not provided |

Do not promote a feature to “available” or “verified” based only on UI presence, a passing workflow, or a simulated state.
