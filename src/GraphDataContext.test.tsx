import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  useGraphDataContext,
  GraphDataContextProvider,
} from "./GraphDataContext";
jest.mock("./GraphManager/hooks/useCreateNode");
jest.mock("./GraphManager/hooks/useCreateEdge");

/**
 * A custom render to setup providers. Extends regular
 * render options with `providerProps` to allow injecting
 * different scenarios to test with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
const customRender = (ui: any) => {
  // XXX(skep): unused additional arguments commented out, ok? @j
  // { providerProps, ...renderOptions }: { providerProps?: any } = {}
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
        to: String(Date.now()), // XXX(skep): @j: why randomness in tests?!
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
    customRender(<TestConsumer />);
    // byTestId should be the last choice when testing real components,
    // here we built the component only for the test so its fine
    const button = screen.getByTestId("triggerNodeCreation");
    expect(screen.queryByTestId("hasRequests")).toBeNull();
    fireEvent.click(button);
    // => queues request first, then returns and provides the node through the graph export
    expect(screen.getByTestId("hasRequests")).not.toBeNull();
  });

  it("should not queue a link creation to a node that isnt completed yet", async () => {
    customRender(<TestConsumer />);
    const nodeButton = await screen.findByTestId("triggerNodeCreation");
    const edgeButton = await screen.findByTestId("triggerEdgeCreation");
    fireEvent.click(nodeButton);
    expect(screen.getByTestId("hasRequests")).not.toBeNull();
    fireEvent.click(edgeButton);

    const error = await screen.findByTestId("error");
    expect(error).not.toBeNull();
  });

  describe("assign graph data edit function", () => {
    it("should find assign the passed function inside GraphDataCtx & use it for node creation", async () => {
      const TestAssignGraphDataEditFunction = () => {
        const { setLocalGraphDataEditor, createNode } = useGraphDataContext();
        const onNodeCreation = () =>
          createNode({
            description: {
              translations: [
                {
                  language: "en",
                  content: "1",
                },
              ],
            },
          });
        let testvalue = 0;
        setLocalGraphDataEditor({
          setSelectedGraphDataset: () => {
            testvalue = 1;
          },
        });
        return (
          <div>
            <div data-testid="testvalue">testvalue={testvalue}</div>;
            <button data-testid="triggerNodeCreation" onClick={onNodeCreation}>
              click me!
            </button>
          </div>
        );
      };
      customRender(<TestAssignGraphDataEditFunction />);
      expect(screen.queryByTestId("testvalue")?.textContent).toEqual(
        "testvalue=0"
      );
      // TODO(skep): enable once createNode uses the localGraphDataEditor
      //const nodeButton = await screen.findByTestId("triggerNodeCreation");
      //fireEvent.click(nodeButton);
      //expect(screen.queryByTestId("testvalue")?.textContent).toEqual(
      //  "testvalue=1"
      //);
    });
  });
});

describe("makeRequestReducer", () => {
  it("should do something", () => {
    // pendingReducer({state,});
    // TODO(j): clarify what it should do by writing tests
  });
});
