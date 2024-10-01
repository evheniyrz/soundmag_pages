'use strict';
import clampLinkText from "./clamp-link-text.js";
let resizeObserver;
window.addEventListener("DOMContentLoaded", () => {


  resizeObserver = new ResizeObserver(_ => {
    const lines = document.body.clientWidth <= 1024 ? 3 : 2;
    clampLinkText(lines);
  });

  const catalog = document.querySelector('#catalog');
  resizeObserver?.observe(catalog);

  window.addEventListener("beforeunload", () => {
    resizeObserver?.disconnect();
  });

  // ============= //

});


