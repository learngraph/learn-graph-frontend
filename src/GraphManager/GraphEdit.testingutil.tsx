import { ForceGraphMethods } from "react-force-graph-2d";
import { GraphState } from "./GraphEdit";
import { SpecialNodes } from "./GraphRenderer";
import { ForceGraphLinkObject, ForceGraphNodeObject } from "./types";
import { ZOOM_LEVEL_MIN } from "./ZoomControlPanel";

// Note: these methods are used by GraphRenderer tests as well, they must not
// be imported from a .test-file, otherwise jest will execute those tests
// twice.

export const makeMockController = () => {
  // @ts-ignore: typescript does not understand jest.mock
  const forceGraphMethods: ForceGraphMethods = jest.mock<ForceGraphMethods>(
    "react-force-graph-2d",
  );
  forceGraphMethods.centerAt = jest.fn().mockName("forceGraphRef.centerAt");
  forceGraphMethods.screen2GraphCoords = jest
    .fn()
    .mockName("forceGraphRef.screen2GraphCoords");
  forceGraphMethods.d3ReheatSimulation = jest
    .fn()
    .mockName("forceGraphRef.d3ReheatSimulation");
  forceGraphMethods.zoomToFit = jest.fn().mockName("forceGraphRef.zoomToFit");
  forceGraphMethods.zoom = jest.fn().mockName("forceGraphRef.zoom");
  const specialNodes: SpecialNodes = {};
  const graphState = makeGraphState();
  const ctrl = {
    backend: {
      createNode: jest.fn().mockName("backend.createNode"),
      updateNode: jest.fn().mockName("backend.updateNode"),
      createLink: jest.fn().mockName("backend.createLink"),
      submitVote: jest.fn().mockName("backend.submitVote"),
      deleteNode: jest.fn().mockName("backend.deleteNode"),
      deleteLink: jest.fn().mockName("backend.deleteLink"),
    },
    graph: graphState,
    popUp: {
      state: {
        isOpen: false,
        title: "",
        details: "",
        nodeEdit: {
          onFormSubmit: jest.fn().mockName("popUp.state.nodeEdit.onFormSubmit"),
        },
        linkEdit: {
          onFormSubmit: jest.fn().mockName("popUp.state.linkEdit.onFormSubmit"),
          onNonSubmitClose: jest
            .fn()
            .mockName("popUp.state.nodeEdit.onNonSubmitClose"),
        },
      },
      setState: jest.fn().mockName("popUp.setState"),
    },
    // @ts-ignore
    forceGraphRef: {
      current: forceGraphMethods,
    },
    setCooldownTicks: jest.fn().mockName("setCooldownTicks"),
    nodeDrag: {
      setState: jest.fn(),
      state: {},
    },
    language: "en",
    search: {
      isResultShown: false,
      setIsResultShown: jest.fn(),
      highlightNodes: new Set<ForceGraphNodeObject>(),
      setHighlightNodes: jest.fn(),
    },
    specialNodes,
    zoom: {
      zoomState: { zoomSteps: 1, graphData: graphState.current },
      setZoomState: jest.fn(),
      zoomLevel: ZOOM_LEVEL_MIN + 1, // can zoom in both directions from here
      setZoomLevel: jest.fn(),
      zoomStepStack: [],
      setZoomStepStack: jest.fn(),
      setUserZoomLevel: jest.fn(),
    },
    keys: {
      shiftHeld: false,
      setShiftHeld: jest.fn(),
    },
    mode: {
      isEditMode: false,
      setIsEditMode: jest.fn(),
    },
  };
  return ctrl;
};

export const makeGraphState = () => {
  const emptyGraph: {
    nodes: ForceGraphNodeObject[];
    links: ForceGraphLinkObject[];
  } = { nodes: [], links: [] };
  const g: GraphState = {
    current: emptyGraph,
    performInitialZoom: { current: true },
    setGraph: jest.fn().mockName("graph.setGraph"),
    addNode: jest.fn().mockName("graph.addNode"),
    addLink: jest.fn().mockName("graph.addLink"),
    removeLink: jest.fn().mockName("graph.removeLink"),
    removeNode: jest.fn().mockName("graph.removeNode"),
    updateLink: jest.fn().mockName("graph.updateLink"),
    updateNode: jest.fn().mockName("graph.updateNode"),
  };
  return g;
};
