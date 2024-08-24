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
    const txtDecoratorPlaceholder = productCard.querySelector(
      ".txt-decorator-placeholder"
    );

    if (null != txtDecorator) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const font = getComputedStyle(productCard).font;

      // set the font size and type
      ctx.font = font;

      const {
        clientWidth: placeholderClientWidth,
      } = txtDecoratorPlaceholder;

      /**
       * @type string
       */
      const initialTxt = txtDecorator.dataset.text
        .replaceAll(/\t/g, "")
        .replaceAll(/\n/g, "");
      const initialTxtLength = ctx.measureText(initialTxt).width;

      const whiteSpaceIndexes = [];
      initialTxt.replace(/\s/g, (searchValue, i) => {
        whiteSpaceIndexes.push(i);
      });


      if (
        whiteSpaceIndexes.length <= 2 &&
        initialTxtLength <=
        Math.floor(placeholderClientWidth) * linesCount
      )
        return;
      // last index of text
      whiteSpaceIndexes.push(initialTxt.length);

      const linesSet = [];
      let rowString = "";
      let lastSearchCharIndex = 0;
      let w_sIndex = 0;
      let rowTxtLength = 0;

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

          rowTxtLength = Math.floor(
            ctx.measureText(rowString.trimStart()).width
          );
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
            rowTxtLength < placeholderClientWidth) ||
          (isLastLine &&
            !isLastSearchIndex &&
            rowTxtLength < placeholderClientWidth)
        );

        /**
         * если последняя строка блока, выбраны все символы и переполнение строки
         * - обрезать строку до вычесленного кол-ва символов
         */

        if (
          isLastLine &&
          isLastSearchIndex &&
          rowTxtLength > placeholderClientWidth
        ) {
          const CPL = Math.round(
            Math.floor(placeholderClientWidth) /
            Math.round(ctx.measureText("o").width)
          );
          linesSet[lineIndex] = [rowString.substring(0, CPL - 1) + "."];
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
            rowTxtLength > placeholderClientWidth) ||
          (!isLastLine &&
            !isLastSearchIndex &&
            rowTxtLength > placeholderClientWidth)
        ) {
          const rightmost_W_S = rowString.trimEnd().lastIndexOf(" ");
          linesSet[lineIndex] = [rowString.substring(0, rightmost_W_S)];
        }
        /**
         * если последняя строка и длина подстроки меньше/равно ширины блока
         *          == ИЛИ ===
         * если не последняя строка и выбраны все символы и длина подстроки меньше/равно ширины блока
         * - возвращаем всю строку
         */
        if (
          (isLastLine && rowTxtLength <= placeholderClientWidth) ||
          (!isLastLine &&
            isLastSearchIndex &&
            rowTxtLength <= placeholderClientWidth) ||
          (!isLastLine &&
            !isLastSearchIndex &&
            rowTxtLength <= placeholderClientWidth)
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
            rowTxtLength > placeholderClientWidth) ||
          (!isLastLine &&
            !isLastSearchIndex &&
            rowTxtLength > placeholderClientWidth)
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
          rowTxtLength <= placeholderClientWidth
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
