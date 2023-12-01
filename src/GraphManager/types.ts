import {
  GraphData as FGGraphData,
  NodeObject as FGNodeObject,
  LinkObject as FGLinkObject,
} from "react-force-graph-2d";

// BackendGraphData describes a complete graph sent by the backend.
export interface BackendGraphData {
  nodes: NodeType[];
  links: LinkType[];
}

// LinkType is the raw link data, coming from the backend.
export interface LinkType {
  source: string;
  target: string;
  value: number;
  note?: string;
  id: string;
}

// NodeType is the raw node data, coming from the backend.
export interface NodeType {
  id: string;
  description: string;
  group?: number;
}

// LinkTypeAddition is an extension to the force-graph's LinkObject with
// additional properties.
//
// Note: these properties potentially override force-graph link type
// definitions, that are already present in the LinkObject type.
interface LinkTypeAddition {
  value: number;
  note?: string;
  id: string;
}

// NodeTypeAddition is an extension to force-graph's NodeObject with additional
// properties.
//
// Note: these properties potentially override force-graph node type
// definitions, that are already present in the NodeObject type.
type NodeTypeAddition = NodeType;

export interface DataSetType {
  dataSetName: string;
  data: BackendGraphData;
}

export type ForceGraphNodeObject = FGNodeObject<NodeTypeAddition>;
export type ForceGraphLinkObject = FGLinkObject<
  NodeTypeAddition,
  LinkTypeAddition
>;
export type ForceGraphGraphData = FGGraphData<
  ForceGraphNodeObject,
  ForceGraphLinkObject
>;
