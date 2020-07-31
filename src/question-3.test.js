// @ts-nocheck

const es5Question3 = require("./question-3.es5");
const es6Question3 = require("./question-3.es6");

describe("Question #3", () => {
  it("pass sample test 1", () => {
    const relations = [
      ["100", "ryan", "music", "2"],
      ["200", "apeach", "math", "2"],
      ["300", "tube", "computer", "3"],
      ["400", "con", "computer", "4"],
      ["500", "muzi", "music", "3"],
      ["600", "apeach", "music", "2"],
    ];
    const answer = 2;

    expect(es5Question3(relations)).toStrictEqual(answer);
    expect(es6Question3(relations)).toStrictEqual(answer);
  });

  it("pass custom test 1", () => {
    const relations = [
      ["100", "id100", "jones", "music", "2"],
      ["200", "id200", "george", "math", "2"],
      ["300", "id300", "jones", "computer", "3"],
      ["400", "id400", "wahyu", "computer", "4"],
      ["500", "id500", "muzi", "music", "3"],
      ["600", "id600", "george", "music", "2"],
    ];
    const answer = 3;

    expect(es5Question3(relations)).toStrictEqual(answer);
    expect(es6Question3(relations)).toStrictEqual(answer);
  });
});
