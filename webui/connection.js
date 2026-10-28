/* MATRIX-ZYGISK v0.4 — disconnected provider; no probing or network calls. */
"use strict";

(function (root) {
  function createDisconnectedProvider(contract) {
    if (!contract || typeof contract.emptySnapshot !== "function") {
      throw new TypeError("A valid MATRIX runtime contract is required.");
    }

    return Object.freeze({
      mode: "simulation",
      async getSnapshot() {
        const snapshot = contract.emptySnapshot();
        snapshot.connection.message =
          "Simulation mode: no Android device or runtime is connected.";
        return snapshot;
      },
      async connect() {
        return {
          ok: false,
          state: "disconnected",
          message: "No authorized adapter is implemented in v0.4."
        };
      },
      async execute() {
        return {
          ok: false,
          state: "unsupported",
          message: "Runtime operations are not available in this prototype."
        };
      }
    });
  }

  const api = Object.freeze({ createDisconnectedProvider });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.MatrixConnection = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
