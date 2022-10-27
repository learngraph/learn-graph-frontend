// XXX(skep): should this not be the same data type?
// import { GraphData } from "react-force-graph-2d";

export interface GraphData {
  nodes: NodeType[];
  links: LinkType[];
}
export interface LinkType {
  source: string;
  target: string;
  value: number;
  note?: string;
  id?: string; // TODO: make it mandatory (it is..)
}

export interface NodeType {
  id: string;
  description: string;
  group: number;
}

export interface DataSetType {
  dataSetName: string;
  data: GraphData;
}
