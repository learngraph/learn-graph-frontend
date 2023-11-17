import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  useGraphDataContext,
  GraphDataContextProvider,
  pendingReducer,
  RequestData,
  pendingActionTypes,
} from "./GraphDataContext";

jest.mock("./GraphManager/hooks/useCreateNode");
jest.mock("./GraphManager/hooks/useCreateEdge");
jest.mock("./GraphManager/hooks/useUpdateNode");
jest.mock("./GraphManager/hooks/useSubmitVote");
jest.mock("./GraphManager/hooks/useCreateUser");
jest.mock("./GraphManager/hooks/useLoginUser");

/**
 * A custom render to setup providers. Extends regular
 * render options with `providerProps` to allow injecting
 * different scenarios to test with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
const renderGraphDataContextProvider = (ui: any) => {
  return render(<GraphDataContextProvider>{ui}</GraphDataContextProvider>);
};

const TestConsumer = () => {
  const { createNode, createLink, requests } = useGraphDataContext();
  const [error, setError] = useState<any>(null);
  const onNodeCreation = () =>
    createNode({
      description: {
        translations: [
          {
            language: "blub",
            content: "more blub",
          },
        ],
      },
    });

  const onLinkCreation = async () => {
    const { id } = requests[0];
    try {
      await createLink({
        from: id,
        to: "irrelevant",
        weight: 0.2,
      });
    } catch (e) {
      setError(e);
    }
  };
  return (
    <div>
      {requests.length && <div data-testid="hasRequests">got Requests!</div>}
      {error && <div data-testid="error">{error.message}</div>}
      <button data-testid="triggerNodeCreation" onClick={onNodeCreation}>
        click me!
      </button>
      <button data-testid="triggerEdgeCreation" onClick={onLinkCreation}>
        click me!
      </button>
    </div>
  );
};

describe("GraphDataContext", () => {
  it("should queue a node creation request, and toggle loading states when the request updates stuff", async () => {
    renderGraphDataContextProvider(<TestConsumer />);
    // byTestId should be the last choice when testing real components,
    // here we built the component only for the test so its fine
    const button = screen.getByTestId("triggerNodeCreation");
    expect(screen.queryByTestId("hasRequests")).toBeNull();
    fireEvent.click(button);
    // => queues request first, then returns and provides the node through the graph export
    expect(screen.getByTestId("hasRequests")).not.toBeNull();
  });

  it("should not queue a link creation to a node that isnt completed yet", async () => {
    renderGraphDataContextProvider(<TestConsumer />);
    const nodeButton = await screen.findByTestId("triggerNodeCreation");
    const edgeButton = await screen.findByTestId("triggerEdgeCreation");
    fireEvent.click(nodeButton);
    expect(screen.getByTestId("hasRequests")).not.toBeNull();
    fireEvent.click(edgeButton);

    const error = await screen.findByTestId("error");
    expect(error).not.toBeNull();
  });

  //----------------------------------------------------------------------------
  //// RFC(skep):
  //// Invalid test case: cannot use `useGraphDataContext` outside of function
  //// component, but that is necessary here to test it.
  //// We also cannot test the hook with https://react-hooks-testing-library.com/,
  //// since there is no logic inside the context itself.
  //----------------------------------------------------------------------------
  //it("should forward useCreateUser calls", async () => {
  //  const userinfo = { username: "me", email: "me@ok.com", password: "1234" };
  //  const ButtonCallsCreateUserWithEMail = () => {
  //    const { createUserWithEMail: createUserWithEMailCtx } = useGraphDataContext();
  //    return (
  //      <button data-testid="button" onClick={() => { createUserWithEMailCtx(userinfo); }}>
  //        click me!
  //      </button>
  //    );
  //  };
  //  renderGraphDataContextProvider(<ButtonCallsCreateUserWithEMail />);
  //  const { createUserWithEMail } = useGraphDataContext();
  //  // @ts-ignore
  //  const mock = createUserWithEMail.mock;
  //  expect(mock.calls.length).toBe(0);
  //  var button = await screen.findByTestId("button");
  //  await act(async () => {
  //    const user = userEvent.setup();
  //    await user.click(button);
  //  });
  //  expect(mock.calls.length).toBe(1);
  //  expect(mock.calls[0][0]).toEqual(userinfo);
  //});
});

describe("pendingReducer", () => {
  let initialState: RequestData[];

  beforeEach(() => {
    initialState = [];
  });

  it("should add a request into the queue on CREATE_NODE_WITH_TEMP_ID", () => {
    const action = {
      type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID,
      data: { name: "Node 1" },
      id: "temp-123",
    };

    const expectedState = [
      {
        type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID,
        data: { name: "Node 1" },
        id: "temp-123",
      },
    ];
    expect(pendingReducer(initialState, action)).toEqual(expectedState);
  });

  it("should add a request into the queue on UPDATE_NODE", () => {
    const action = {
      type: pendingActionTypes.UPDATE_NODE,
      data: { name: "Node 1" },
      id: "temp-123",
    };

    const expectedState = [
      {
        type: pendingActionTypes.UPDATE_NODE,
        data: { name: "Node 1" },
        id: "temp-123",
      },
    ];
    expect(pendingReducer(initialState, action)).toEqual(expectedState);
  });

  it("should add a request into the queue on CREATE_LINK_WITH_TEMP_ID", () => {
    const action = {
      type: pendingActionTypes.CREATE_LINK_WITH_TEMP_ID,
      data: { source: "temp-123", target: "temp-456" },
      id: "temp-789",
    };

    const expectedState = [
      {
        type: pendingActionTypes.CREATE_LINK_WITH_TEMP_ID,
        data: { source: "temp-123", target: "temp-456" },
        id: "temp-789",
      },
    ];
    expect(pendingReducer(initialState, action)).toEqual(expectedState);
  });

  it("should clear a request out of the queue on CLEAR_REQUEST", () => {
    initialState = [
      {
        type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID,
        data: { name: "Node 1" },
        id: "temp-123",
      },
      {
        type: pendingActionTypes.CREATE_LINK_WITH_TEMP_ID,
        data: { source: "temp-123", target: "temp-456" },
        id: "temp-789",
      },
      {
        type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID,
        data: { name: "Node 2" },
        id: "temp-abc",
      },
    ];

    const action = {
      type: pendingActionTypes.CLEAR_REQUEST,
      id: "temp-789",
    };

    const expectedState = [
      {
        type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID,
        data: { name: "Node 1" },
        id: "temp-123",
      },
      {
        type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID,
        data: { name: "Node 2" },
        id: "temp-abc",
      },
    ];

    expect(pendingReducer(initialState, action)).toEqual(expectedState);
  });
});
