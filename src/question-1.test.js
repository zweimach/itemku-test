// @ts-nocheck

const es5Question1 = require("./question-1.es5");
const es6Question1 = require("./question-1.es6");

describe("Question #1", () => {
  it("pass sample test 1", () => {
    const records = [
      "Enter uid1234 Muzi",
      "Enter uid4567 Prodo",
      "Leave uid1234",
      "Enter uid1234 Prodo",
      "Change uid4567 Ryan",
    ];
    const answer = [
      "Prodo came in.",
      "Ryan came in.",
      "Prodo has left.",
      "Prodo came in.",
    ];

    expect(es5Question1(records)).toStrictEqual(answer);
    expect(es6Question1(records)).toStrictEqual(answer);
  });
});
