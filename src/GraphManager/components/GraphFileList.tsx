import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { DataSetType } from "../types";

interface GraphFileListProps {
  datasets: DataSetType[];
  onSelectDataSet: (value: DataSetType) => void;
}

export const GraphFileList = ({
  datasets,
  onSelectDataSet,
}: GraphFileListProps): JSX.Element => {
  return (
    <List component="nav">
      {datasets.map((dataSet) => {
        const { dataSetName } = dataSet;
        return (
          <ListItem
            button
            key={dataSetName}
            onClick={(): void => onSelectDataSet(dataSet)}
          >
            <ListItemText primary={dataSetName} />
          </ListItem>
        );
      })}
    </List>
  );
};
