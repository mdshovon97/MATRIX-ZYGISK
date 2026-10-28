"use strict";

(() => {
  const panelButtons = document.querySelectorAll(".module-button[data-panel]");
  const toast = document.getElementById("toast");
  let toastTimer = null;

  panelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const panelId = button.dataset.panel;
      const panel = document.getElementById(panelId);
      if (!panel) {
        console.warn(`MATRIX-ZYGISK: panel not found: ${panelId}`);
        return;
      }
      const willExpand = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(willExpand));
      panel.hidden = !willExpand;
    });
  });

  // Quick navigation opens collapsed panels before the browser scrolls to them.
  document.querySelectorAll('.quick-nav a[href^="#module-"]').forEach((link) => {
    link.addEventListener("click", () => {
      const module = document.querySelector(link.getAttribute("href"));
      const button = module?.querySelector(".module-button[data-panel]");
      const panel = button ? document.getElementById(button.dataset.panel) : null;
      if (button && panel && button.getAttribute("aria-expanded") !== "true") {
        button.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }
    });
  });

  // Local-only prototype behavior. No Android/runtime commands are issued.
  document.querySelectorAll("[data-demo]").forEach((control) => {
    control.addEventListener("change", () => {
      if (!toast) return;
      toast.hidden = false;
      if (toastTimer !== null) window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => {
        toast.hidden = true;
        toastTimer = null;
      }, 2800);
    });
  });
})();
