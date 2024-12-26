const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const result = [];
  const discardIndices = new Set();

  for (let i = 0; i < arr.length; i++) {
    if (discardIndices.has(i)) {
      continue;
    }

    switch (arr[i]) {
      case "--discard-next":
        if (i + 1 < arr.length) {
          discardIndices.add(i + 1);
        }
        break;

      case "--discard-prev":
        if (i - 1 >= 0 && !discardIndices.has(i - 1)) {
          result.pop();
        }
        break;

      case "--double-next":
        if (i + 1 < arr.length) {
          result.push(arr[i + 1]);
        }
        break;

      case "--double-prev":
        if (i - 1 >= 0 && !discardIndices.has(i - 1)) {
          result.push(arr[i - 1]);
        }
        break;

      default:
        result.push(arr[i]);
    }
  }

  return result;
}

module.exports = {
  transform,
};
