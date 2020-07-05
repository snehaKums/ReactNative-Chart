import React from 'react';
import { VictoryBar, VictoryStack, VictoryLegend } from 'victory-native';
import ChartWrapper, { colors, dateFormatter } from './ChartWrapper';

const BarChart = ({ data }) => (
  <ChartWrapper>
    <VictoryStack colorScale={colors}>
      { console.log(data.seriesNames()) && '' }
      { console.log(data.chartPivot()) && '' }
      {data.seriesNames().map((series, i) => (
        <VictoryBar
          key={i}
          x={dateFormatter}
          y={series.key.replace(":", ", ")}
          data={data.chartPivot()}
          labels={null}
          style={{
            parent: { border: "1px solid #ccc"}
          }}
        />
      ))}
    </VictoryStack>
    <VictoryLegend x={40} y={280}
      orientation="horizontal"
      colorScale={colors}
      data={data.seriesNames().map(({ title }) => ({ name: title.substring(0, 3) }))}
    />
  </ChartWrapper>
);

export default BarChart;
