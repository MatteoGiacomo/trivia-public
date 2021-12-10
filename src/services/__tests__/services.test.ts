import * as services from "../index";

test("decodeHTMLEntities - returns a text with no HTML entities", () => {
  const encodedText = "In the &quot;Toaru Kagaku no Railgun&quot; anime";
  const result = services.decodeHTMLEntities(encodedText);
  expect(result).toBe("In the \"Toaru Kagaku no Railgun\" anime");
});

describe("codify", () => {
  test("replace space with underscore", () => {
    const text = "text with spaces";
    const result = services.codify(text);
    expect(result).toBe("text_with_spaces");
  });

  test("transform in lower case", () => {
    const text = "text with spaces AND UPPERCASE";
    const result = services.codify(text);
    expect(result).toBe("text_with_spaces_and_uppercase");
  });
})

describe("shuffleList", () => {
  test("return a new array", () => {
    const list = ["foo", "bar", "baz", "Joe", "Doe"];
    const result = services.shuffleList(list);
    expect(list === result).toBe(false);
  });

  test("return a new array with shuffled elements", () => {
    const list = ["foo", "bar", "baz", "Joe", "Doe"];
    const result = services.shuffleList(list);
    expect(list.join('_') === result.join('_')).toBe(false);
  });
})

describe("isEmailValid", () => {
  test("return FALSE when email has no @", () => {
    expect(services.isEmailValid("test-test.com")).toBe(false)
  })  
  test("return FALSE when email has no domain name extension", () => {
    expect(services.isEmailValid("test@test")).toBe(false)
  })  
  test("return FALSE when email has no domain name extension", () => {
    expect(services.isEmailValid("test@test")).toBe(false)
  })  
  test("return TRUE when email is correct", () => {
    expect(services.isEmailValid("test89-test@test.com")).toBe(true)
  })  
})
