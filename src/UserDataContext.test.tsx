import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserDataContextProvider, useUserDataContext } from "./UserDataContext";

describe("UserDataContext", () => {
  let mockStore: Record<string, string> = {};
  const localStorageMock = {
    getItem: (key: string) => mockStore[key],
    setItem: (key: string, value: string) =>
      (mockStore[key] = value.toString()),
    removeItem: (key: string) => delete mockStore[key],
    clear: () => (mockStore = {}),
  };
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
  beforeEach(() => {
    localStorageMock.clear();
  });
  it("should store user data in localStorage, once all user data is available", async () => {
    const Test = () => {
      const ctx = useUserDataContext();
      return (
        <div>
          <button
            data-testid="setUserID"
            onClick={() => ctx.setUserID("123")}
          />
          <button
            data-testid="setUserName"
            onClick={() => ctx.setUserName("asdf")}
          />
          <button
            data-testid="setUserToken"
            onClick={() => ctx.setAuthenticationToken("AAA")}
          />
        </div>
      );
    };
    render(
      <UserDataContextProvider>
        <Test />
      </UserDataContextProvider>
    );
    const user = userEvent.setup();
    const setUserIDButton = screen.getByTestId("setUserID");
    await user.click(setUserIDButton);
    expect(mockStore).toEqual({});
    const setUserNameButton = screen.getByTestId("setUserName");
    await user.click(setUserNameButton);
    expect(mockStore).toEqual({});
    const setUserTokenButton = screen.getByTestId("setUserToken");
    await user.click(setUserTokenButton);
    expect(mockStore).toEqual({
      authenticationToken: '"AAA"',
      userID: '"123"',
      userName: '"asdf"',
    });
  });
  it("should retrieve user data from localStorage and apply it to the context", async () => {
    mockStore = {
      authenticationToken: '"AAA"',
      userID: '"123"',
      userName: '"asdf"',
    };
    const Test = () => {
      const ctx = useUserDataContext();
      return (
        <div>
          <div data-testid="userID">{ctx.userID}</div>
          <div data-testid="userName">{ctx.userName}</div>
          <div data-testid="userToken">{ctx.authenticationToken}</div>
        </div>
      );
    };
    render(
      <UserDataContextProvider>
        <Test />
      </UserDataContextProvider>
    );
    expect(screen.getByTestId("userID")).toHaveTextContent("123");
    expect(screen.getByTestId("userName")).toHaveTextContent("asdf");
    expect(screen.getByTestId("userToken")).toHaveTextContent("AAA");
  });
  it("should not add incomplete userinfo from localstorage", async () => {
    mockStore = {
      authenticationToken: '"AAA"',
      userID: '"123"',
    };
    const Test = () => {
      const ctx = useUserDataContext();
      return (
        <div>
          <div data-testid="userID">{ctx.userID}</div>
          <div data-testid="userName">{ctx.userName}</div>
          <div data-testid="userToken">{ctx.authenticationToken}</div>
          <button
            data-testid="setUserName"
            onClick={() => ctx.setUserName("qwerty")}
          />
        </div>
      );
    };
    render(
      <UserDataContextProvider>
        <Test />
      </UserDataContextProvider>
    );
    expect(screen.getByTestId("userID")).toHaveTextContent("");
    expect(screen.getByTestId("userName")).toHaveTextContent("");
    expect(screen.getByTestId("userToken")).toHaveTextContent("");
    // FIXME: doesn't work
    //const user = userEvent.setup();
    //const setUserNameButton = screen.getByTestId("setUserName");
    //await user.click(setUserNameButton);
    //expect(screen.getByTestId("userID")).toHaveTextContent("123")
    //expect(screen.getByTestId("userName")).toHaveTextContent("asdf")
    //expect(screen.getByTestId("userToken")).toHaveTextContent("AAA")
  });
});
