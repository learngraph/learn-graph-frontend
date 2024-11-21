import { validateUrl } from "./MarkdownField";

// must mock this, since it's incompatible with create-react-app's jest config (see PopUp.test.tsx)
jest.mock("@mui/material/OutlinedInput/NotchedOutline", () => (props: any) => {
  return <div>props: {JSON.stringify(props)}</div>;
});


describe("validateUrl", () => {
  it("should match an ugly url with ()-braces!", () => {
    expect(
      validateUrl("https://de.wikipedia.org/wiki/Gruppe_(Mathematik)")
    ).toBe(true);
  });
  // it("should not validate a link that is just https://", () => {
  //   expect(validateUrl("https://")).toBe(false);
  // })
});