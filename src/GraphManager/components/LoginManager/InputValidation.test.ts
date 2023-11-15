import { validateUserSignupRequest } from "./InputValidation";
import { SignUpRequestData } from "./LoginSignupMenu";

describe("validateUserSignupRequest", () => {
  it.each([
    [
      { username: "abcd", email: "a@b.com", password: "1234567890" },
      true,
      "good case",
    ],
    [
      { username: "abc", email: "a@b.com", password: "1234567890" },
      false,
      "username too short",
    ],
    [
      { username: "abcd", email: "ab.com", password: "1234567890" },
      false,
      "email invalid",
    ],
    [
      { username: "abcd", email: "a@b.com", password: "123456789" },
      false,
      "password < 10 chars",
    ],
  ])(
    "should validate %p expects %p",
    async (userInput: SignUpRequestData, valid: boolean, _: string) => {
      expect(await validateUserSignupRequest.isValid(userInput)).toBe(valid);
    }
  );
});