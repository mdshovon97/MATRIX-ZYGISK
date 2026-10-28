/* MATRIX-ZYGISK v0.4 — UI interactions only; no runtime commands. */
"use strict";

(() => {
  const contract = window.MatrixRuntimeContract;
  const connectionApi = window.MatrixConnection;
  const provider = contract && connectionApi
    ? connectionApi.createDisconnectedProvider(contract)
    : null;

  const toast = document.getElementById("toast");
  const connectionLabel = document.getElementById("connection-label");
  const connectionMessage = document.getElementById("connection-message");
  const providerLabel = document.getElementById("provider-label");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    if (toastTimer !== null) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
      toastTimer = null;
    }, 3000);
  }

  document.querySelectorAll(".module-button[data-panel]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(button.dataset.panel);
      if (!panel) return;
      const expanded = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(expanded));
      panel.hidden = !expanded;
    });
  });

  document.querySelectorAll('.quick-nav a[href^="#module-"]').forEach((link) => {
    link.addEventListener("click", () => {
      const module = document.querySelector(link.getAttribute("href"));
      const button = module && module.querySelector(".module-button[data-panel]");
      const panel = button && document.getElementById(button.dataset.panel);
      if (button && panel && button.getAttribute("aria-expanded") !== "true") {
        button.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }
    });
  });

  document.querySelectorAll("[data-demo]").forEach((control) => {
    control.addEventListener("change", () => {
      showToast("Simulation only — no Android or runtime setting was changed.");
    });
  });

  const connectButton = document.getElementById("connect-button");
  if (connectButton) {
    connectButton.addEventListener("click", async () => {
      if (!provider) {
        showToast("Contract files unavailable. Runtime connection remains disabled.");
        return;
      }
      const result = await provider.connect();
      showToast(result.message);
    });
  }

  async function renderConnection() {
    if (!provider || !contract) {
      if (connectionLabel) connectionLabel.textContent = "Unavailable";
      if (connectionMessage) connectionMessage.textContent = "Contract module could not be loaded.";
      if (providerLabel) providerLabel.textContent = "SIMULATION OFFLINE";
      return;
    }
    const raw = await provider.getSnapshot();
    const result = contract.normalizeSnapshot(raw);
    const snapshot = result.snapshot;
    if (connectionLabel) connectionLabel.textContent = "Not connected";
    if (connectionMessage) connectionMessage.textContent =
      result.valid ? snapshot.connection.message : "Invalid contract data; fail-closed fallback active.";
    if (providerLabel) providerLabel.textContent = "SIMULATION ONLY";
    document.querySelectorAll("[data-runtime-action]").forEach((element) => {
      element.setAttribute("disabled", "disabled");
      element.setAttribute("aria-disabled", "true");
    });
  }

  renderConnection().catch(() => {
    if (connectionLabel) connectionLabel.textContent = "Error";
    if (connectionMessage) connectionMessage.textContent = "Unable to load local contract state.";
    if (providerLabel) providerLabel.textContent = "SIMULATION OFFLINE";
  });
})();
