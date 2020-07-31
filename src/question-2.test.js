// @ts-nocheck

const es5Question2 = require("./question-2.es5");
const es6Question2 = require("./question-2.es6");

describe("Question #2", () => {
  it("pass sample test 1", () => {
    const stages = 5;
    const users = [2, 1, 2, 6, 2, 4, 3, 3];
    const answer = [3, 4, 2, 1, 5];

    expect(es5Question2(stages, users)).toStrictEqual(answer);
    expect(es6Question2(stages, users)).toStrictEqual(answer);
  });

  it("pass sample test 2", () => {
    const stages = 4;
    const users = [4, 4, 4, 4, 4];
    const answer = [4, 1, 2, 3];

    expect(es5Question2(stages, users)).toStrictEqual(answer);
    expect(es6Question2(stages, users)).toStrictEqual(answer);
  });
});
