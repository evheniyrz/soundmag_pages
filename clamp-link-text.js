'use strict';
import prepareClampingText from "./prepare-text.js";
/**
 *
 * @param {number} lines
 */
export default function clampLinkText(lines = 2) {
  //some delay to get correct dimensions after resizing or changing the orientation of the mobile device screen
  const tId = setTimeout(() => {
    /**
     * @type {NodeList} cardsGrid
     */
    const cardsGrid = document.querySelectorAll('.product-sampling-section:not(.brand-style) .products-tile-grid');
    if (cardsGrid.length < 1) return;

    cardsGrid?.forEach(item => {
      /**
       * @type  {HTMLCollection} productCards
       */
      const productCards = item.children;

      for (const cardElement of productCards) {
        prepareClampingText(cardElement, lines);
      }
    })
    clearTimeout(tId)
  }, 50)
}