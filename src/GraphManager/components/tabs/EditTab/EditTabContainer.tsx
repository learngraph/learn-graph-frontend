import { useCreateEdge } from "src/GraphManager/hooks/useCreateEdge";
import { useCreateNode } from "src/GraphManager/hooks/useCreateNode";
import { DataSetType } from "src/GraphManager/types";
import { EditTab } from "./EditTab";

export type EditTabContainerProps = {
  currentGraphDataset: DataSetType;
  updateDisplayedGraph: (value: DataSetType) => void;
};

export const EditTabContainer = (props: EditTabContainerProps) => {
  const { createNode } = useCreateNode();
  const { createEdge } = useCreateEdge();
  return <EditTab {...props} createNode={createNode} createEdge={createEdge} />;
};
