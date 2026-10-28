
"use strict";

document.querySelectorAll(".feature[data-panel]").forEach((button) => {
  button.addEventListener("click", () => {
    const panelId = button.dataset.panel;
    const panel = document.getElementById(panelId);

    if (!panel) {
      console.warn(`MATRIX-ZYGISK: panel not found: ${panelId}`);
      return;
    }

    const isExpanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isExpanded));
    panel.hidden = isExpanded;
  });
});
