/*
 * Copyright (c) 2020 Ananda Umamil
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * @typedef {{ type: string, payload: { id: string, name: string } }} Log
 * @typedef {{ type: string, payload: { id: string, name: string, message: string } }} Report
 */

/**
 * @param {string[]} records The chat room records.
 * @returns {string[]} Tne array of chat room log messages.
 */
function solution(records) {
  /** @type {Report[]} */
  let answer = [];
  const logs = records.map(parseLog);

  logs.forEach((log) => {
    const prevItem = answer.find((item) => log.payload.id === item.payload.id);

    switch (log.type) {
      case "Change":
        answer = answer.map((item) => {
          if (log.payload.id === item.payload.id) {
            item.payload.name = log.payload.name;
          }
          return item;
        });
        break;
      case "Enter":
        if (prevItem) {
          answer = answer.map((item) => {
            if (log.payload.id === item.payload.id) {
              item.payload.name = log.payload.name;
            }
            return item;
          });
        }
        answer = [...answer, addMessage(log)];
        break;
      case "Leave":
        if (!log.payload.name && prevItem) {
          log.payload.name = prevItem.payload.name;
        }
        answer = [...answer, addMessage(log)];
        break;
    }
  });

  return answer.map((item) => item.payload.message);
}

/**
 * @param {string} record The log record to parse.
 * @returns {Log} The log object.
 */
function parseLog(record) {
  const [type, id, name] = record.split(" ");
  return { type, payload: { id, name } };
}

/**
 * @param {Log} log The log object.
 * @returns {Report} The log object with message getter.
 */
function addMessage(log) {
  /** @type {Report} */
  const report = JSON.parse(JSON.stringify(log));
  Object.defineProperty(report.payload, "message", {
    get() {
      return this.name + (report.type === "Enter" ? " came in." : " has left.");
    },
  });
  return report;
}

module.exports = solution;
