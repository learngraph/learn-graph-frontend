import { useGraphDataContext } from "src/GraphDataContext";
import { DataSetType } from "src/GraphManager/types";
import { EditTab } from "./EditTab";

export type EditTabContainerProps = {
  currentGraphDataset: DataSetType;
  updateDisplayedGraph: (value: DataSetType) => void;
};

export const EditTabContainer = (props: EditTabContainerProps) => {
  const { createNode, createLink, updateNode } = useGraphDataContext();
  return (
    <EditTab
      {...props}
      createNode={createNode}
      createEdge={createLink}
      updateNode={updateNode}
    />
  );
};
