import { fireEvent, render, screen } from "@testing-library/react"
import { useGraphDataContext, GraphDataContextProvider } from "./GraphDataContext"
jest.mock('./GraphManager/hooks/useCreateNode');

/**
 * A custom render to setup providers. Extends regular
 * render options with `providerProps` to allow injecting
 * different scenarios to test with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
const customRender = (ui, { providerProps, ...renderOptions } = {}) => {
  return render(
    <GraphDataContextProvider {...providerProps}>{ui}</GraphDataContextProvider>,
    renderOptions,
  )
}

const TestConsumer = () => {
  const { createNode, requests } = useGraphDataContext()
  const onButtonClick = () => createNode({
    description: {
      translations: [
        {
          language: "blub",
          content: "more blub"
        }
      ]
    }
  })
  return (
    <div>
      {requests.length && <div data-testid="hasRequests">got Tests!</div>}
      <button data-testid="triggerAction" onClick={onButtonClick} >
        click me!
      </button>
    </div>
  )
}


describe('graphDataContext', () => {
  console.time('test')
  it('should queue a request, and toggle loading states when the request updates stuff', (done) => {
    customRender(<TestConsumer />)
    // byTestId should be the last choice when testing real components,
    // here we built the component only for the test so its fine
    const button = screen.getByTestId('triggerAction')
    console.timeLog('test')
    expect(screen.queryByTestId('hasRequests')).toBeNull()
    act(() => fireEvent.click(button))
    // => queues request first, then returns and provides the node through the graph export
    expect(screen.queryByTestId('hasRequests')).not.toBeNull()
    setTimeout(() => {
      try {
        console.timeLog('test')

        expect(screen.queryByTestId('hasRequests')).toBeNull()
      } catch (e) {
        done()
        throw e
      }
    }
      , 500)

  })
})