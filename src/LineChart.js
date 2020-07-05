import React from 'react';
import { VictoryLine } from 'victory-native';
import ChartWrapper, { dateFormatter } from './ChartWrapper';

const LineChart = ({ data }) => (
  <ChartWrapper>
    <VictoryLine
      data={data.chartPivot()}
      x={dateFormatter}
      labels={null}
      y={data.seriesNames()[0].key}
      style={{
        data: { stroke: "#6a6ee5" },
        parent: { border: "1px solid #ccc"}
      }}
    />
  </ChartWrapper>
);

export default LineChart;
