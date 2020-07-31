/*
 * Copyright (c) 2020 Ananda Umamil
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * @param {string[][]} relations The database relations.
 * @returns {number} The number of unique keys.
 */
function solution(relations) {
  /** @type {string[]} */
  let answer = [];
  const columnCount = relations[0].length;

  const indexCombinations = relations[0].map((_, i) =>
    generateCombinations(columnCount, i + 1)
  );

  const relationCombinations = relations.map((relations) =>
    indexCombinations.map((combinations) =>
      combinations.map((val) => ({
        value: val.reduce(
          (prev, curr, index) =>
            `${prev}${index === 0 ? relations[curr] : `, ${relations[curr]}`}${
              relations.length - 1 === index ? ")" : ""
            }`,
          "("
        ),
        column: val.reduce(
          (prev, curr, index) => `${prev}${index === 0 ? curr : `, ${curr}`}`,
          ""
        ),
      }))
    )
  );

  /** @type {{ value: string, column: string}[]} */
  const flatCombinations = flatten(relationCombinations, Infinity);

  const removeDuplicates = flatCombinations
    .filter(
      (val, _, self) =>
        countOccurrences(self, val, (a, b) => a.value === b.value) === 1
    )
    .filter(
      (val, _, self) =>
        countOccurrences(self, val, (v, val) => v.column === val.column) ===
        relations.length
    );

  const uniqueColumns = removeDuplicates
    .slice(0, removeDuplicates.length / relations.length)
    .map((val) =>
      val.column
        .split(", ")
        .map((column) => Number.parseInt(column))
        .join("")
    );

  /** @type {string[]} */
  const stringArray = [];
  answer = uniqueColumns.reduce((prev, curr) => {
    let notUnique = false;
    for (let i = 0; i < prev.length; ++i) {
      notUnique = notUnique || curr.includes(prev[i]);
    }
    return notUnique ? prev : [...prev, curr];
  }, stringArray);

  return answer.length;
}

/**
 * @template T
 * @param {T[]} arr The array of values to check.
 * @param {T} val The value to count.
 * @param {(a: T, b: T) => boolean | undefined} pred The comparison function.
 * @returns {number} The number of occurences.
 */
function countOccurrences(arr, val, pred = (a, b) => a === b) {
  return arr.reduce((a, v) => (pred(v, val) ? a + 1 : a), 0);
}

/**
 * @param {any[]} arr The array to recursively flatten.
 * @param {number} depth The maximum recursion depth.
 * @returns {any[]} The new flattened array.
 */
function flatten(arr, depth = 1) {
  return arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  );
}

/**
 * @param {number} n A number from 0 to n.
 * @param {number} k The number of combinations.
 * @returns {number[][]} The array of combinations.
 */
function generateCombinations(n, k) {
  if (k === 0) return [[]];
  /** @type {number[][]} */
  const result = [];
  for (var i = 0; i < n; ++i) {
    if (n - i - 1 < k - 1) continue;
    generateCombinations(n - i - 1, k - 1).forEach((js) => {
      result.push([i, ...js.map((j) => j + i + 1)]);
    });
  }
  return result;
}

module.exports = solution;
