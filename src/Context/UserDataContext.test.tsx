import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  handleGraphQLErrors,
  translateLocaleToLanguageTag,
  UserDataContextProvider,
  useUserDataContext,
} from "./UserDataContext";
//import "@testing-library/jest-dom";

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
      </UserDataContextProvider>,
    );
    const user = userEvent.setup();
    const setUserIDButton = screen.getByTestId("setUserID");
    await user.click(setUserIDButton);
    expect(mockStore).toEqual({ language: '"en"', theme: '"light"' });
    const setUserNameButton = screen.getByTestId("setUserName");
    await user.click(setUserNameButton);
    expect(mockStore).toEqual({ language: '"en"', theme: '"light"' });
    const setUserTokenButton = screen.getByTestId("setUserToken");
    await user.click(setUserTokenButton);
    expect(mockStore).toEqual({
      language: '"en"',
      theme: '"light"',
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
      </UserDataContextProvider>,
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
      </UserDataContextProvider>,
    );
    expect(screen.getByTestId("userID")).toHaveTextContent("");
    expect(screen.getByTestId("userName")).toHaveTextContent("");
    expect(screen.getByTestId("userToken")).toHaveTextContent("");
  });
});

describe("translateLocaleToLanguageTag", () => {
  it.each([
    ["en_US", "en"],
    ["en_AU", "en"],
    ["en_CA", "en"],
    ["en_JM", "en"],
    ["de_DE", "de"],
    ["zh_TW", "zh"],
    ["de", "de"],
    ["en", "en"],
    ["zh", "zh"],
  ])(
    "should translate '%p' to '%p'",
    (locale: string, expectedLanguage: string) => {
      expect(translateLocaleToLanguageTag(locale)).toEqual(expectedLanguage);
    },
  );
});

describe("handleGraphQLErrors", () => {
  it("should do nothing if no error message is present", () => {
    const msg = jest.fn();
    const ctx = {};
    // @ts-ignore
    handleGraphQLErrors(ctx, msg, []);
    expect(msg).not.toHaveBeenCalled();
  });
  it("should do nothing if no error message matches", () => {
    const msg = jest.fn();
    const ctx = {};
    // @ts-ignore
    handleGraphQLErrors(ctx, msg, [{ message: "unknown" }]);
    expect(msg).not.toHaveBeenCalled();
  });
  it("should warn the user about not being logged in", () => {
    const msg = jest.fn();
    const ctx = {
      setUserID: jest.fn(),
      setUserName: jest.fn(),
      setAuthenticationToken: jest.fn(),
    };
    // @ts-ignore
    handleGraphQLErrors(ctx, msg, [
      { message: "only logged in user may create graph data" },
    ]);
    expect(msg).toHaveBeenCalledTimes(1);
    expect(msg).toHaveBeenCalledWith("Session expired, please login again!");
    expect(ctx.setUserID).toHaveBeenCalledTimes(1);
    expect(ctx.setUserID).toHaveBeenCalledWith("");
  });
});
