'use strict';

document.querySelectorAll('.feature[data-panel]').forEach((button) => {
  button.addEventListener('click', () => {
    const panelId = button.dataset.panel;
    const panel = document.getElementById(panelId);
    if (!panel) return;

    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });
});
