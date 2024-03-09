import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { makeMockController } from "@src/GraphManager/GraphEdit/GraphEdit.testingutil";
import HeaderBar from "./HeaderBar";

// FIXME(skep): this single test takes 50% of the whole test-suite of the application - WHY?!
describe("HeaderBar", () => {
  it("should call userInputCallback on input change", async () => {
    const userInputCallback = jest.fn();
    const ctrl = makeMockController();
    render(
      <HeaderBar
        search={{
          // @ts-ignore
          controllerRef: { current: ctrl },
          userInputCallback: userInputCallback,
        }}
      />,
    );
    expect(userInputCallback.mock.calls.length).toBe(0);
    const input = screen.getByLabelText("search bar");
    const user = userEvent.setup();
    await user.click(input);
    await user.keyboard("123");
    expect(userInputCallback.mock.calls.length).toBe(3);
    expect(userInputCallback.mock.calls[0][0]).toEqual("1");
    expect(userInputCallback.mock.calls[1][0]).toEqual("12");
    expect(userInputCallback.mock.calls[2][0]).toEqual("123");
  });
});
