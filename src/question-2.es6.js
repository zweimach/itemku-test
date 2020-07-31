/*
 * Copyright (c) 2020 Ananda Umamil
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * @typedef {{ stage: number, failRate: number }} Stage
 */

/**
 * @param {number} stages The number of stage levels.
 * @param {number[]} users The array of current stage level for each user.
 * @returns {number[]} The array of stage level from the highest to lowest failure rate.
 */
function solution(stages, users) {
  /** @type {Stage[]} */
  let answer = [];
  let currUsers = users;

  for (let stage = 1; stage <= stages; ++stage) {
    const passed = currUsers.filter((user) => user > stage);
    const failed = currUsers.filter((user) => user <= stage);
    answer = [...answer, { stage, failRate: failed.length / currUsers.length }];
    currUsers = passed;
  }
  answer.sort((a, b) =>
    a.failRate > b.failRate ? -1 : a.failRate < b.failRate ? 1 : 0
  );

  return answer.map((item) => item.stage);
}

module.exports = solution;
