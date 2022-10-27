import React, { useRef } from "react";
import { DataSetType } from "../../../types";
import Button from "@mui/material/Button";
import GetAppIcon from "@mui/icons-material/GetApp";
import PublishIcon from "@mui/icons-material/Publish";
import Typography from "@mui/material/Typography";

type ImportExportTabProps = {
  updateDisplayedGraph: (value: DataSetType) => void;
  currentGraphDataset: DataSetType;
};

export const ImportExportTab = ({
  updateDisplayedGraph,
  currentGraphDataset,
}: ImportExportTabProps): JSX.Element => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleExportButtonClick = (): void => {
    const { dataSetName, data } = currentGraphDataset;
    // filter out the properties that got added by the graph framework and are only relevant for internal processing
    data.nodes = data?.nodes?.map(({ id, description, group }) => ({
      id,
      description,
      group,
    }));
    const dataString = JSON.stringify(data);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataString);

    const exportFileDefaultName = `${dataSetName}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleImportButtonClick = (): void => {
    inputFileRef?.current?.click();
  };

  const handleImportFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.stopPropagation();
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const files = target.files;
    const file = files?.[0];
    if (!file) {
      throw new Error("Didnt find a file in the file upload");
    }
    console.log(file);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (): void => {
      const result = String(reader.result);

      const newGraph = JSON.parse(result);
      const fileName = file.name;
      updateDisplayedGraph({ dataSetName: fileName, data: newGraph });
    };
  };

  return (
    <>
      <Typography variant="h3">Import/Export Files</Typography>
      <div>
        <Button
          aria-label="Export Graph Data"
          color="primary"
          onClick={handleExportButtonClick}
          endIcon={<GetAppIcon />}
        >
          <Typography variant="body1">Export</Typography>
        </Button>
      </div>
      <div>
        <input
          type="file"
          id="import file"
          ref={inputFileRef}
          style={{ display: "none" }}
          onChange={handleImportFileChange}
        />
        <Button
          aria-label="Import Graph Data"
          color="primary"
          onClick={handleImportButtonClick}
          endIcon={<PublishIcon />}
        >
          <Typography variant="body1">Import</Typography>
        </Button>
      </div>
    </>
  );
};
