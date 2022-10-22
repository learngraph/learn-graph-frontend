import "@testing-library/jest-dom";

//// mock the client, so that no RPC happens in the test, and no react state
//// change!
//jest.mock("@apollo/client", () => {
//  //const originalModule = jest.requireActual("@apollo/client");
//  //let useQueryMock = jest.fn();
//  //useQueryMock.mockReturnValue({
//  //  loading: "LOL",
//  //  data: "LOL",
//  //  error: "LOL",
//  //  networkStatu: "LOL",
//  //});
//  return {
//    __esModule: true,
//    ...originalModule,
//    useQuery: () => {
//      return {
//        loading: "LOL",
//        data: "LOL",
//        error: "LOL",
//        networkStatu: "LOL",
//      };
//    },
//    // FIXME: why does this not work? It should work, see tests below.
//    //useQuery: useQueryMock,
//  };
//});

describe("TODO", () => {
  it("is not yet done", () => {
    expect(1).toBe(1);
  });
});
