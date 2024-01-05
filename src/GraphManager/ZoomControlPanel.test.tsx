import { Controller } from "./GraphEdit";
import { makeMockController } from "./GraphEdit.testingutil";
import { makeZoomControl } from "./ZoomControlPanel";
jest.mock("./Zoom", () => ({
  zoomStep: jest.fn(),
  ZoomDirection: { In: "In", Out: "Out" },
}));

describe("makeZoomControl", () => {
  let ctrl: Controller;

  beforeEach(() => {
    // @ts-ignore
    ctrl = makeMockController();
  });

  it("should handle onZoomIn correctly", () => {
    const zoomCtrl = makeZoomControl(ctrl);
    ctrl.zoom.zoomStepStack.push(2);
    zoomCtrl.onZoomIn();
    expect(ctrl.zoom.setZoomStepStack).toHaveBeenCalledWith(
      ctrl.zoom.zoomStepStack,
    );
    expect(ctrl.zoom.setZoomState).toHaveBeenCalledWith(expect.any(Object));
    expect(ctrl.zoom.setZoomLevel).toHaveBeenCalledWith(
      ctrl.zoom.zoomLevel + 1,
    );
    expect(ctrl.forceGraphRef.current?.d3ReheatSimulation).toHaveBeenCalled();
    const zoomState = {
      zoomSteps: ctrl.zoom.zoomState.zoomSteps,
      graphData: ctrl.graph.current,
    };
    expect(require("./Zoom").zoomStep).toHaveBeenCalledWith(
      { direction: "In", steps: 1 },
      zoomState,
    );
  });

  it("should handle onZoomOut correctly", () => {
    // @ts-ignore
    ctrl.graph.current = { nodes: [{ id: "a" }, { id: "b" }], links: [] };
    const zoomCtrl = makeZoomControl(ctrl);
    zoomCtrl.onZoomOut();
    expect(ctrl.zoom.setZoomStepStack).toHaveBeenCalledWith(
      ctrl.zoom.zoomStepStack,
    );
    expect(ctrl.zoom.setZoomState).toHaveBeenCalledWith(expect.any(Object));
    expect(ctrl.zoom.setZoomLevel).toHaveBeenCalledWith(
      ctrl.zoom.zoomLevel - 1,
    );
    expect(ctrl.forceGraphRef.current?.d3ReheatSimulation).toHaveBeenCalled();
    const zoomState = {
      zoomSteps: ctrl.zoom.zoomState.zoomSteps,
      graphData: ctrl.graph.current,
    };
    expect(require("./Zoom").zoomStep).toHaveBeenCalledWith(
      { direction: "Out", steps: 1 },
      zoomState,
    );
  });
});
