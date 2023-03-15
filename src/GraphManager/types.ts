// XXX(skep): should this not be the same data type?
// import { GraphData } from "react-force-graph-2d";

// TODO: define interface for when and where we want translations (caching/where we fetch the data)
// and where we dont want translations for performance (rendering/inside framework)
// (Translations dont currently affect links, but they might in the future if we add notes etc)

export interface GraphData {
  nodes: NodeType[];
  links: LinkType[];
}
export interface LinkType {
  source: string;
  target: string;
  value: number;
  note?: string;
  id: string;
}

export interface NodeType {
  id: string;
  description: string;
  group?: number;
}

export interface DataSetType {
  dataSetName: string;
  data: GraphData;
}
