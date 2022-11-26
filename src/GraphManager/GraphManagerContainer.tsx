import { DataSetType } from "./types";
import crypto1 from "../graphdata/crypto-1";
import crypto1b from "../graphdata/crypto-1b";
import crypto2 from "../graphdata/crypto-2";
import math1 from "../graphdata/math-1";
import startup from "../graphdata/startup";
import { useGraphData } from "./hooks";
import { GraphManager } from "./GraphManager";

const datasets: DataSetType[] = [
  { dataSetName: "crypto1", data: crypto1 },
  { dataSetName: "crypto1b", data: crypto1b },
  { dataSetName: "crypto2", data: crypto2 },
  { dataSetName: "math1", data: math1 },
  { dataSetName: "startup", data: startup }
];

export const GraphManagerContainer = (): JSX.Element => {
  const { data: queryData, queryResponse } = useGraphData();

  return (
    <GraphManager
      datasets={datasets}
      fetchedGraph={queryData?.graph}
      queryResponse={queryResponse}
    />
  );
};
