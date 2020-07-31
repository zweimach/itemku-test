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
  var answer = [];
  var columnCount = relations[0].length;

  var indexCombinations = relations[0].map(function (_, i) {
    return generateCombinations(columnCount, i + 1);
  });

  var relationCombinations = relations.map(function (relations) {
    return indexCombinations.map(function (combinations) {
      return combinations.map(function (val) {
        return {
          value: val.reduce(function (prev, curr, index) {
            return (
              prev +
              (index === 0 ? relations[curr] : ", " + relations[curr]) +
              (relations.length - 1 === index ? ")" : "")
            );
          }, "("),
          column: val.reduce(function (prev, curr, index) {
            return prev + (index === 0 ? curr : ", " + curr);
          }, ""),
        };
      });
    });
  });

  /** @type {{ value: string, column: string}[]} */
  var flatCombinations = flatten(relationCombinations, Infinity);

  var removeDuplicates = flatCombinations
    .filter(function (val, _, self) {
      return (
        countOccurrences(self, val, function (a, b) {
          return a.value === b.value;
        }) === 1
      );
    })
    .filter(function (val, _, self) {
      return (
        countOccurrences(self, val, function (v, val) {
          return v.column === val.column;
        }) === relations.length
      );
    });

  var uniqueColumns = removeDuplicates
    .slice(0, removeDuplicates.length / relations.length)
    .map(function (val) {
      return val.column
        .split(", ")
        .map(function (column) {
          return Number.parseInt(column);
        })
        .join("");
    });

  /** @type {string[]} */
  var stringArray = [];
  answer = uniqueColumns.reduce(function (prev, curr) {
    var notUnique = false;
    for (var i = 0; i < prev.length; ++i) {
      notUnique = notUnique || curr.includes(prev[i]);
    }
    return notUnique ? prev : prev.concat([curr]);
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
function countOccurrences(arr, val, pred) {
  return arr.reduce(function (a, v) {
    return (pred ? pred(v, val) : v === val) ? a + 1 : a;
  }, 0);
}

/**
 * @param {any[]} arr The array to recursively flatten.
 * @param {number} depth The maximum recursion depth.
 * @returns {any[]} The new flattened array.
 */
function flatten(arr, depth) {
  return arr.reduce(function (a, v) {
    return a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v);
  }, []);
}

/**
 * @param {number} n A number from 0 to n.
 * @param {number} k The number of combinations.
 * @returns {number[][]} The array of combinations.
 */
function generateCombinations(n, k) {
  if (k === 0) return [[]];
  /** @type {number[][]} */
  var result = [];
  for (var i = 0; i < n; ++i) {
    if (n - i - 1 < k - 1) continue;
    generateCombinations(n - i - 1, k - 1).forEach(function (js) {
      result.push(
        [i].concat(
          js.map(function (j) {
            return j + i + 1;
          })
        )
      );
    });
  }
  return result;
}

module.exports = solution;
