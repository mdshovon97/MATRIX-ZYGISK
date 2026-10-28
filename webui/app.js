"use strict";

(() => {
  document.querySelectorAll(".module-button[data-panel]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(button.dataset.panel);
      if (!panel) {
        console.warn(`MATRIX-ZYGISK: panel not found: ${button.dataset.panel}`);
        return;
      }
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    });
  });

  // Local-only prototype behavior. No Android/runtime commands are issued.
  const toast = document.getElementById("toast");
  let toastTimer;
  document.querySelectorAll("[data-demo]").forEach((control) => {
    control.addEventListener("change", () => {
      if (!toast) return;
      toast.hidden = false;
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => { toast.hidden = true; }, 2800);
    });
  });
})();

