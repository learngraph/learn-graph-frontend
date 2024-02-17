import { Controller } from "./GraphEdit/GraphEdit";
import { makeMockController } from "./GraphEdit/GraphEdit.testingutil";
import {
  makeOnZoomAndPanListenerNoDebounce,
  makeZoomControl,
  MIN_ZOOM_PERCENTAGE_DIFFERENCE,
  ZOOM_LEVEL_MAX,
  ZOOM_LEVEL_MIN,
  ZOOM_LEVEL_STEP,
} from "./ZoomControlPanel";
jest.mock("./Zoom", () => ({
  zoomStep: jest.fn(),
  ZoomDirection: { In: "In", Out: "Out" },
}));
import { zoomStep } from "./Zoom";

describe("makeZoomControl", () => {
  let ctrl: Controller;
  let zoomCtrl: ReturnType<typeof makeZoomControl>;

  beforeEach(() => {
    // @ts-ignore
    ctrl = makeMockController();
    // @ts-ignore
    ctrl.graph.current = { nodes: [{ id: "a" }, { id: "b" }], links: [] };
    zoomCtrl = makeZoomControl(ctrl);
  });

  it("should handle onZoomIn correctly", () => {
    ctrl.zoom.zoomStepStack.push(2);
    zoomCtrl.onZoomIn();
    expect(ctrl.zoom.setZoomStepStack).toHaveBeenCalledTimes(1);
    expect(ctrl.zoom.setZoomStepStack).toHaveBeenNthCalledWith(
      1,
      ctrl.zoom.zoomStepStack,
    );
    const zoomState = {
      zoomSteps: ctrl.zoom.zoomState.zoomSteps,
      graphData: ctrl.graph.current,
    };
    expect(ctrl.zoom.setZoomState).toHaveBeenCalledTimes(1);
    expect(ctrl.zoom.setZoomState).toHaveBeenNthCalledWith(1, zoomState);
    expect(ctrl.zoom.setZoomLevel).toHaveBeenCalledTimes(1);
    expect(ctrl.zoom.setZoomLevel).toHaveBeenNthCalledWith(
      1,
      ctrl.zoom.zoomLevel + 1,
    );
    expect(
      ctrl.forceGraphRef.current?.d3ReheatSimulation,
    ).toHaveBeenCalledTimes(1);
    expect(zoomStep).toHaveBeenLastCalledWith(
      { direction: "In", steps: 1 },
      zoomState,
    );
  });

  it("should handle onZoomOut correctly", () => {
    zoomCtrl.onZoomOut();
    expect(ctrl.zoom.setZoomStepStack).toHaveBeenCalledTimes(1);
    expect(ctrl.zoom.setZoomStepStack).toHaveBeenNthCalledWith(
      1,
      ctrl.zoom.zoomStepStack,
    );
    const zoomState = {
      zoomSteps: ctrl.zoom.zoomState.zoomSteps,
      graphData: ctrl.graph.current,
    };
    expect(ctrl.zoom.setZoomState).toHaveBeenCalledTimes(1);
    expect(ctrl.zoom.setZoomState).toHaveBeenNthCalledWith(1, zoomState);
    expect(ctrl.zoom.setZoomLevel).toHaveBeenCalledTimes(1);
    expect(ctrl.zoom.setZoomLevel).toHaveBeenNthCalledWith(
      1,
      ctrl.zoom.zoomLevel - 1,
    );
    expect(ctrl.forceGraphRef.current?.d3ReheatSimulation).toHaveBeenCalled();
    expect(zoomStep).toHaveBeenLastCalledWith(
      { direction: "Out", steps: 1 },
      zoomState,
    );
  });

  it("should do nothing if zooming out while on min zoom level", () => {
    ctrl.zoom.zoomLevel = ZOOM_LEVEL_MIN;
    const zoomStepMock = zoomStep;
    // @ts-ignore
    const zoomStepMockPreviousCalls = zoomStepMock.mock.calls.length;
    zoomCtrl.onZoomOut();
    expect(ctrl.zoom.setZoomStepStack).not.toHaveBeenCalled();
    expect(ctrl.zoom.setZoomLevel).not.toHaveBeenCalled();
    expect(ctrl.zoom.setZoomState).not.toHaveBeenCalled();
    expect(zoomStepMock).toHaveBeenCalledTimes(zoomStepMockPreviousCalls); // i.e. no new calls
  });

  it("should do nothing if zooming in while on max zoom level", () => {
    ctrl.zoom.zoomLevel = ZOOM_LEVEL_MAX;
    const zoomStepMock = zoomStep;
    // @ts-ignore
    const zoomStepMockPreviousCalls = zoomStepMock.mock.calls.length;
    zoomCtrl.onZoomIn();
    expect(ctrl.zoom.setZoomStepStack).not.toHaveBeenCalled();
    expect(ctrl.zoom.setZoomLevel).not.toHaveBeenCalled();
    expect(ctrl.zoom.setZoomState).not.toHaveBeenCalled();
    expect(zoomStepMock).toHaveBeenCalledTimes(zoomStepMockPreviousCalls); // i.e. no new calls
  });

  describe("onZoomChange", () => {
    it("should zoom to the difference", () => {
      zoomCtrl.onZoomChange(ctrl.zoom.zoomLevel + 2);
      expect(ctrl.zoom.setZoomLevel).toHaveBeenCalledTimes(1);
      expect(ctrl.zoom.setZoomLevel).toHaveBeenNthCalledWith(
        1,
        ctrl.zoom.zoomLevel + 2,
      );
      expect(ctrl.zoom.setZoomStepStack).toHaveBeenCalledTimes(1);
    });
    it("should cap zoom at MAX", () => {
      zoomCtrl.onZoomChange(ZOOM_LEVEL_MAX + 1);
      expect(ctrl.zoom.setZoomLevel).toHaveBeenCalledTimes(1);
      expect(ctrl.zoom.setZoomLevel).toHaveBeenNthCalledWith(1, ZOOM_LEVEL_MAX);
    });
    it("should cap zoom at MIN", () => {
      zoomCtrl.onZoomChange(ZOOM_LEVEL_MIN - 1);
      expect(ctrl.zoom.setZoomLevel).toHaveBeenCalledTimes(1);
      expect(ctrl.zoom.setZoomLevel).toHaveBeenNthCalledWith(1, ZOOM_LEVEL_MIN);
    });
    it("should skip calls with invalid diff", () => {
      ctrl.zoom.zoomLevel = ZOOM_LEVEL_MAX;
      zoomCtrl.onZoomChange(ZOOM_LEVEL_MAX - 1);
      expect(ctrl.zoom.setZoomLevel).toHaveBeenCalledTimes(1);
      expect(ctrl.zoom.setZoomLevel).toHaveBeenNthCalledWith(
        1,
        ZOOM_LEVEL_MAX - 1,
      );
      expect(ctrl.zoom.zoomStepStack).toEqual([1]);
      // second call comes so quick, that zoomLevel did not change yet!
      ctrl.zoom.zoomLevel = ZOOM_LEVEL_MAX;
      zoomCtrl.onZoomChange(ZOOM_LEVEL_MAX - 2);
      expect(ctrl.zoom.setZoomLevel).toHaveBeenCalledTimes(2);
      expect(ctrl.zoom.setZoomLevel).toHaveBeenNthCalledWith(
        2,
        ZOOM_LEVEL_MAX - 2,
      );
      // should only push one value to the stack, even though diff between
      // zoomLevel and newZoomLevel = 2
      expect(ctrl.zoom.zoomStepStack).toEqual([1, 1]);
    });
    it("should override the last zoom level when lastZoomLevelOverride is passed", () => {
      ctrl.zoom.zoomLevel = ZOOM_LEVEL_MAX;
      zoomCtrl.onZoomChange(ZOOM_LEVEL_MAX - 2);
      expect(ctrl.zoom.setZoomLevel).toHaveBeenCalledTimes(1);
      expect(ctrl.zoom.setZoomLevel).toHaveBeenNthCalledWith(
        1,
        ZOOM_LEVEL_MAX - 2,
      );
      expect(ctrl.zoom.zoomStepStack).toEqual([1, 1]);
      ctrl.zoom.zoomLevel = ZOOM_LEVEL_MAX - 2; // usually set by the call to setZoomLevel, but it's a mock, so set it manually
      zoomCtrl.onZoomChange(ZOOM_LEVEL_MAX - 2, ZOOM_LEVEL_MAX);
      expect(ctrl.zoom.setZoomLevel).toHaveBeenCalledTimes(2);
      expect(ctrl.zoom.setZoomLevel).toHaveBeenNthCalledWith(
        2,
        ZOOM_LEVEL_MAX - 2,
      );
      expect(ctrl.zoom.zoomStepStack).toEqual([1, 1, 1, 1]);
      // XXX(skep): if user switches languages back and forth, the step stack
      // grows and grows, but only by 2 numbers per language-switch. ¯\_(ツ)_/¯
    });
  });
});

describe("makeOnZoomAndPanListenerNoDebounce", () => {
  let mockCtrl: ReturnType<typeof makeMockController>;
  let ctrl: Controller;
  beforeEach(() => {
    mockCtrl = makeMockController();
    // @ts-ignore
    ctrl = mockCtrl;
  });
  it("should call zoom function", () => {
    mockCtrl.forceGraphRef.current.zoom = jest.fn().mockReturnValue(1);
    mockCtrl.keys.shiftHeld = true;
    const zoomLevel = ctrl.zoom.zoomLevel;
    const zoom = makeOnZoomAndPanListenerNoDebounce(ctrl);
    zoom({ k: 2, x: 0, y: 0 });
    expect(ctrl.zoom.setUserZoomLevel).toHaveBeenCalledTimes(1);
    expect(ctrl.zoom.setUserZoomLevel).toHaveBeenNthCalledWith(
      1,
      zoomLevel + ZOOM_LEVEL_STEP,
    );
  });
  it("should do nothing when shift-key is not pressed", () => {
    mockCtrl.forceGraphRef.current.zoom = jest.fn().mockReturnValue(1);
    const zoom = makeOnZoomAndPanListenerNoDebounce(ctrl);
    zoom({ k: 2, x: 0, y: 0 });
    expect(ctrl.zoom.setUserZoomLevel).not.toHaveBeenCalled();
  });
  it("should do nothing when last zoom = 0", () => {
    mockCtrl.forceGraphRef.current.zoom = jest.fn().mockReturnValue(0);
    mockCtrl.keys.shiftHeld = true;
    const zoom = makeOnZoomAndPanListenerNoDebounce(ctrl);
    zoom({ k: 2, x: 0, y: 0 });
    expect(ctrl.zoom.setUserZoomLevel).not.toHaveBeenCalled();
  });
  it("should do nothing when diff percentage < MIN_ZOOM_PERCENTAGE_DIFFERENCE", () => {
    mockCtrl.forceGraphRef.current.zoom = jest
      .fn()
      .mockReturnValue(100 * (1 + MIN_ZOOM_PERCENTAGE_DIFFERENCE * 0.5));
    mockCtrl.keys.shiftHeld = true;
    const zoom = makeOnZoomAndPanListenerNoDebounce(ctrl);
    zoom({ k: 100, x: 0, y: 0 });
    expect(ctrl.zoom.setUserZoomLevel).not.toHaveBeenCalled();
  });
});
