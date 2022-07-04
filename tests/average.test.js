const { average } = require("../utils/for_testing");

describe("average", () => {
  test("of one value is the value itsself", () => {
    const result = average([1]);
    expect(result).toBe(1);
  });

  test("of many is calculated right", () => {
    const result = average([1, 2, 3]);
    expect(result).toBe(2);
  });

  test("of empty array is 0", () => {
    const result = average([]);
    expect(result).toBe(0);
  });
});
