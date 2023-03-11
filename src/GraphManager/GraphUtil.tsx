import { TranslatedGraphData } from "src/GraphDataContext";
import { NodeType, LinkType, DataSetType, GraphData } from "./types";
import { getTranslation } from "./utilities/getTranslation";

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
  let allNodes = new Set();
  if (data?.nodes?.length > 0) {
    nodes = data.nodes.map((node) => {
      allNodes.add(node.id);
      return { ...node };
    });
  }
  let links: LinkType[] = [];
  if (data?.links?.length > 0) {
    links = data.links.map((link) => {
      // we want to detect issues before passing the data to ForceGraph2D
      for (let id of [link.source, link.target]) {
        if (!allNodes.has(id)) {
          //console.dir(data);
          throw new Error(`missing node id for link: id=${id}`);
        }
      }
      return { ...link };
    });
  }
  return {
    dataSetName: "graph from backend",
    data: { nodes: nodes, links: links },
  };
};

export interface TransformFunctionInput {
  graph: TranslatedGraphData;
  language: string;
}

export const transformGraphDataForDisplay = ({
  graph,
  language,
}: TransformFunctionInput): GraphData => ({
  links: graph.links,
  nodes: graph.nodes.map(({ id, group, description }) => {
    return {
      id,
      group,
      description: getTranslation({
        translatedField: description,
        language,
      }),
    };
  }),
});
