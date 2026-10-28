/* MATRIX-ZYGISK v0.4 — data contract only; no Android transport. */
"use strict";

(function (root) {
  const SCHEMA_VERSION = 1;
  const CONNECTION_STATES = Object.freeze([
    "disconnected", "connecting", "connected", "unsupported", "error", "stale"
  ]);
  const INJECTION_STATES = Object.freeze(["enabled", "disabled", "unknown"]);
  const CAPABILITIES = Object.freeze([
    "readRuntimeStatus",
    "readModuleInventory",
    "readDiagnostics",
    "changeDenylistPolicy",
    "changeLinkerSetting",
    "readZygoteStatus",
    "exportBugreport"
  ]);

  function emptySnapshot() {
    return {
      schemaVersion: SCHEMA_VERSION,
      connection: {
        state: "disconnected",
        adapterId: null,
        lastUpdated: null,
        message: "No authorized runtime adapter is connected."
      },
      runtime: {
        name: null,
        version: null,
        abi: null,
        androidSdk: null,
        rootImplementation: null,
        rootVersion: null,
        injectionState: "unknown"
      },
      capabilities: Object.fromEntries(CAPABILITIES.map((name) => [name, false])),
      diagnostics: {
        moduleInventoryAvailable: false,
        issueCount: null,
        bugreportAvailable: false
      }
    };
  }

  function isPlainObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  function validateSnapshot(snapshot) {
    const errors = [];
    if (!isPlainObject(snapshot)) return { valid: false, errors: ["snapshot must be an object"] };
    if (snapshot.schemaVersion !== SCHEMA_VERSION) errors.push("unsupported schemaVersion");
    if (!isPlainObject(snapshot.connection)) errors.push("connection must be an object");
    else if (!CONNECTION_STATES.includes(snapshot.connection.state)) errors.push("invalid connection.state");
    if (!isPlainObject(snapshot.runtime)) errors.push("runtime must be an object");
    else if (!INJECTION_STATES.includes(snapshot.runtime.injectionState)) errors.push("invalid runtime.injectionState");
    if (!isPlainObject(snapshot.capabilities)) errors.push("capabilities must be an object");
    else {
      for (const key of CAPABILITIES) {
        if (typeof snapshot.capabilities[key] !== "boolean") {
          errors.push("capabilities." + key + " must be boolean");
        }
      }
    }
    if (!isPlainObject(snapshot.diagnostics)) errors.push("diagnostics must be an object");
    return { valid: errors.length === 0, errors };
  }

  function normalizeSnapshot(input) {
    const check = validateSnapshot(input);
    if (!check.valid) {
      return {
        snapshot: emptySnapshot(),
        valid: false,
        errors: check.errors
      };
    }
    // Return a defensive copy so UI consumers cannot mutate provider-owned data.
    return {
      snapshot: JSON.parse(JSON.stringify(input)),
      valid: true,
      errors: []
    };
  }

  const api = Object.freeze({
    SCHEMA_VERSION,
    CONNECTION_STATES,
    INJECTION_STATES,
    CAPABILITIES,
    emptySnapshot,
    validateSnapshot,
    normalizeSnapshot
  });

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.MatrixRuntimeContract = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
