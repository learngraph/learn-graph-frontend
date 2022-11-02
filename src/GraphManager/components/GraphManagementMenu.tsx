import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { DataSetType } from "../types";

import { ImportExportTab } from "./tabs";
import { EditTabContainer } from "./tabs/EditTab/EditTabContainer";

type GraphManagementMenuProps = {
  updateDisplayedGraph: (value: DataSetType) => void;
  currentGraphDataset: DataSetType;
};

const tabNames = ["Edit", "Import/Export"];

export const GraphManagementMenu = ({
  ...props
}: GraphManagementMenuProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabSwitch = (
    _: React.ChangeEvent<{}>,
    newValue: number
  ): void => {
    setSelectedTab(newValue);
  };

  const renderTabs = (): JSX.Element => {
    if (selectedTab === 0) {
      return <EditTabContainer {...props} />;
    } else {
      return <ImportExportTab {...props} />;
    }
  };

  const displayTabs = tabNames.map((label) => (
    <Tab key={label} label={label} />
  ));
  return (
    <>
      <Tabs value={selectedTab} onChange={handleTabSwitch}>
        {displayTabs}
      </Tabs>
      <div>{renderTabs()}</div>
    </>
  );
};
