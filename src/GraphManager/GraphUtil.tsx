import { NodeType, LinkType, DataSetType, GraphData } from "./types";

export const sanitizeGraphDataset = function (
  dataset: DataSetType
): DataSetType {
  return {
    dataSetName: dataset.dataSetName,
    data: sanitizeGraphData(dataset.data).data,
  };
};

export const sanitizeGraphData = function (data: GraphData): DataSetType {
  let nodes: NodeType[] = [];
  if (data?.nodes?.length > 0) {
    nodes = data.nodes.map((node) => {
      return { ...node };
    });
  }
  let links: LinkType[] = [];
  if (data?.links?.length > 0) {
    links = data.links.map((link) => {
      if (typeof link.source !== "string" || typeof link.target !== "string") {
        throw new Error("invalid type detected"); // FIXME(skep): should remove this check, exists just for debugging
      }
      return { ...link };
    });
  }
  return {
    dataSetName: "graph from backend",
    data: { nodes: nodes, links: links },
  };
};
