const { reverse } = require("../utils/for_testing");

describe("reverse", () => {
  test("reverse of a", () => {
    const result = reverse("a");
    expect(result).toBe("a");
  });

  test("reverse of istanbul", () => {
    const result = reverse("istanbul");
    expect(result).toBe("lubnatsi");
  });

  test("reverse of amsterdam", () => {
    const result = reverse("amsterdam");
    expect(result).toBe("madretsma");
  });
});
