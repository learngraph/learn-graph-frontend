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
const customRender = (ui, { providerProps, ...renderOptions } = {}) => {
  return render(
    <GraphDataContextProvider {...providerProps}>
      {ui}
    </GraphDataContextProvider>,
    renderOptions
  );
};

const TestConsumer = () => {
  const { createNode, createLink, requests } = useGraphDataContext();
  const [error, setError] = useState(null);
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
        to: String(Date.now()),
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

describe("graphDataContext", () => {
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
});
