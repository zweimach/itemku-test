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
  var answer = [];
  var logs = records.map(parseLog);

  logs.forEach(function (log) {
    var prevItem = answer.find(function (item) {
      return log.payload.id === item.payload.id;
    });

    switch (log.type) {
      case "Change":
        answer = answer.map(function (item) {
          if (log.payload.id === item.payload.id) {
            item.payload.name = log.payload.name;
          }
          return item;
        });
        break;
      case "Enter":
        if (prevItem) {
          answer = answer.map(function (item) {
            if (log.payload.id === item.payload.id) {
              item.payload.name = log.payload.name;
            }
            return item;
          });
        }
        answer.push(addMessage(log));
        break;
      case "Leave":
        if (!log.payload.name && prevItem) {
          log.payload.name = prevItem.payload.name;
        }
        answer.push(addMessage(log));
        break;
    }
  });

  return answer.map(function (item) {
    return item.payload.message;
  });
}

/**
 * @param {string} record The log record to parse.
 * @returns {Log} The log object.
 */
function parseLog(record) {
  var result = record.split(" ");
  return { type: result[0], payload: { id: result[1], name: result[2] } };
}

/**
 * @param {Log} log The log object.
 * @returns {Report} The log object with message getter.
 */
function addMessage(log) {
  /** @type {Report} */
  var report = JSON.parse(JSON.stringify(log));
  Object.defineProperty(report.payload, "message", {
    get: function () {
      return this.name + (report.type === "Enter" ? " came in." : " has left.");
    },
  });
  return report;
}

module.exports = solution;
