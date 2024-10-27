import { MutableRefObject } from "react";
import {
  GraphData as FGGraphData,
  NodeObject as FGNodeObject,
  LinkObject as FGLinkObject,
  ForceGraphMethods,
} from "react-force-graph-2d";
import { ForceGraphMethods as ForceGraphMethods3D } from "react-force-graph-2d";

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

// TODO(skep): remove this type and remove the old menu using it
type NodeType = NodeTypeAddition;

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

interface LinkTypeMandatoryNodes {
  // After starting the force graph, there will always be objects in
  // source/target properties => ensure typescript understands.
  source: ForceGraphNodeObject;
  target: ForceGraphNodeObject;
}

export interface Vector {
  x: number;
  y: number;
  z: number;
}

// NodeTypeAddition is an extension to force-graph's NodeObject with additional
// properties.
//
// Note: these properties potentially override force-graph node type
// definitions, that are already present in the NodeObject type.
export interface NodeTypeAddition {
  id: string;
  description: string;
  resources?: string;
  position?: Vector;
}

export interface DataSetType {
  dataSetName: string;
  data: BackendGraphData;
}

export type ForceGraphNodeObject = FGNodeObject<NodeTypeAddition>;
export type ForceGraphLinkObject = FGLinkObject<
  NodeTypeAddition,
  LinkTypeAddition & LinkTypeMandatoryNodes
>;
// ForceGraphLinkObjectInitial is the initial link object passed to the force
// graph, that does not contain object references, but string IDs that
// reference the nodes.
export type ForceGraphLinkObjectInitial = FGLinkObject<
  NodeTypeAddition,
  LinkTypeAddition
>;
export type ForceGraphGraphData = FGGraphData<
  NodeTypeAddition,
  LinkTypeAddition & LinkTypeMandatoryNodes
>;

export type LocalForceGraphMethods =
  | ForceGraphMethods<ForceGraphNodeObject, ForceGraphLinkObject>
  | ForceGraphMethods3D<ForceGraphNodeObject, ForceGraphLinkObject>
  | undefined;
export type ForceGraphRef = MutableRefObject<LocalForceGraphMethods>;

// Graphology compatible interface for nodes and edges based on https://sim51.github.io/react-sigma/docs/example/external_state
export interface GraphologyNodeType 
  { x: number; y: number; label: string; size: number }


export interface GraphologyEdgeType {
  size?: number
}
