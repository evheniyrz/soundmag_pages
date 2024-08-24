"use strict";

/**
 *
 * @param {Node} productCard
 * @param {number} linesCount
 * @returns
 */
export default function prepareClampingText(productCard, linesCount) {
  if (null != productCard) {
    /**
     * @type HTMLElement
     */
    const txtDecorator = productCard.querySelector(".txt-decorator");
    /**
     * @type HTMLElement
     */

    if (null != txtDecorator) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const font = getComputedStyle(productCard).font;

      // set the font size and type
      ctx.font = font;

      const { clientWidth: decoratorClientWidth } = txtDecorator;

      /**
       * @type string
       */
      const initialTxt = txtDecorator.dataset.text
        .replaceAll(/\t/g, "")
        .replaceAll(/\n/g, "");
      const initialTxtWidth = ctx.measureText(initialTxt).width;

      const whiteSpaceIndexes = [];
      initialTxt.replace(/\s/g, (_, i) => {
        whiteSpaceIndexes.push(i);
      });

      if (
        whiteSpaceIndexes.length <= 2 &&
        initialTxtWidth <= Math.floor(decoratorClientWidth) * linesCount
      )
        return;

      // last index of text
      whiteSpaceIndexes.push(initialTxt.length);

      const linesSet = [];
      let rowString = "";
      let lastSearchCharIndex = 0;
      let w_sIndex = 0;
      let rowTxtWidth = 0;

      linesIterator: for (
        let lineIndex = 0;
        lineIndex < linesCount;
        lineIndex++
      ) {
        const isLastLine = lineIndex === linesCount - 1;
        let isLastSearchIndex = false;

        do {
          rowString += initialTxt.substring(
            lastSearchCharIndex,
            whiteSpaceIndexes[w_sIndex]
          );
          lastSearchCharIndex = whiteSpaceIndexes[w_sIndex];
          w_sIndex++;

          rowTxtWidth = Math.floor(ctx.measureText(rowString).width);
          isLastSearchIndex =
            lastSearchCharIndex ===
            whiteSpaceIndexes[whiteSpaceIndexes.length - 1];
        } while (
          /**
           * выполнять цикл если
           * - не последняя строка, не найден последний символ и подстрока меньше ширины блока
           * - если последняя строка и не найден последний символ и подстрока меньше ширины блока
           */

          (!isLastLine &&
            !isLastSearchIndex &&
            rowTxtWidth < decoratorClientWidth) ||
          (isLastLine &&
            !isLastSearchIndex &&
            rowTxtWidth < decoratorClientWidth)
        );

        /**
         * если последняя строка блока, выбраны все символы и переполнение строки
         * - обрезать строку до вычесленного кол-ва символов
         */

        if (
          isLastLine &&
          isLastSearchIndex &&
          rowTxtWidth > decoratorClientWidth
        ) {
          const singleCharWidth = Math.floor(
            Math.floor(ctx.measureText(rowString).width) / rowString.length // count of text symbols
          );
          /**
           * @description Char Per Line
           * @type {number} CPL
           */
          const CPL = Math.floor(decoratorClientWidth / singleCharWidth);
          /**
           * remove space character at the beginning of the line. because the browser removes this character
           */
          linesSet[lineIndex] = [
            rowString.trimStart().substring(0, CPL - 3) + ".",
          ];
        }

        /**
         * если =переполнение= строки и не последняя строка блока, не выбраны все символы
         *          === ИЛИ ===
         * если =переполнение сроки= и не последняя строка блока и выбраны все символы
         * - выбрать подстроку по последнему индексу пробела
         *
         */
        if (
          (!isLastLine &&
            isLastSearchIndex &&
            rowTxtWidth > decoratorClientWidth) ||
          (!isLastLine &&
            !isLastSearchIndex &&
            rowTxtWidth > decoratorClientWidth)
        ) {
          const rightmost_W_S = rowString.trimEnd().lastIndexOf(" ");
          linesSet[lineIndex] = [rowString.trim().substring(0, rightmost_W_S)];
        }
        /**
         * если последняя строка и длина подстроки меньше/равно ширины блока
         *          == ИЛИ ===
         * если не последняя строка и выбраны все символы и длина подстроки меньше/равно ширины блока
         * - возвращаем всю строку
         */
        if (
          (isLastLine && rowTxtWidth <= decoratorClientWidth) ||
          (!isLastLine &&
            isLastSearchIndex &&
            rowTxtWidth <= decoratorClientWidth) ||
          (!isLastLine &&
            !isLastSearchIndex &&
            rowTxtWidth <= decoratorClientWidth)
        ) {
          linesSet[lineIndex] = [rowString];
        }

        /**
         * если не последняя строка и найдены все символы, но переполнение строки
         * === ИЛИ ===
         * если не последняя строка и не последний символ, но переполнение строки
         * -смещаем индексы на один шаг назад для продолжения заполнения строк
         */
        if (
          (!isLastLine &&
            isLastSearchIndex &&
            rowTxtWidth > decoratorClientWidth) ||
          (!isLastLine &&
            !isLastSearchIndex &&
            rowTxtWidth > decoratorClientWidth)
        ) {
          w_sIndex -= 1;
          lastSearchCharIndex = whiteSpaceIndexes[w_sIndex - 1];
        }

        /**
         * завершаем перебор строк блока, если
         * - непоследняя строка и найден последний символ и длина строки меньше/равно ширины блока
         */
        if (
          !isLastLine &&
          (isLastSearchIndex || null == lastSearchCharIndex) &&
          rowTxtWidth <= decoratorClientWidth
        ) {
          break linesIterator;
        }
        /**
         * после каждого перебора обнуляем подстроку
         */
        rowString = "";
      }

      const clampedTxt = linesSet.flat(1).join(" ");
      txtDecorator.textContent = clampedTxt;
    }
  }
}
