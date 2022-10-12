import { DataSetType } from "./types";

import crypto1 from "../graphdata/crypto-1";
import crypto1b from "../graphdata/crypto-1b";
import crypto2 from "../graphdata/crypto-2";
//import mathSimple from "../graphdata/math-simple;
import { useGraphData } from "./hooks";
import { GraphManager } from "./GraphManager";

const datasets: DataSetType[] = [
  { dataSetName: "crypto1", data: crypto1 },
  { dataSetName: "crypto1b", data: crypto1b },
  { dataSetName: "crypto2", data: crypto2 },
  //{ dataSetName: "mathSimple", data: mathSimple },
];

export const GraphManagerContainer = (): JSX.Element => {
  const { data, queryResponse } = useGraphData();

  const { graph: graphDataSet } = data ?? {};

  return (
    <GraphManager
      datasets={datasets}
      fetchedDataset={graphDataSet}
      queryResponse={queryResponse}
    />
  );
};
