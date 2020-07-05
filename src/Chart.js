import React from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { ActivityIndicator, Text } from 'react-native';

import LineChart from './LineChart';
import BarChart from './BarChart';

const cubejsApi = cubejs('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTQ5MTMxMjl9.oKd3AwfR07P8wLltpUYoVHvUbzM0_HG8dhCBbiHYB7g', {
  apiUrl: 'https://rjto0er4a5.execute-api.us-east-1.amazonaws.com/dev/cubejs-api/v1'
});

const queries = {
  line: {
    measures: ["Logs.errorRate"],
    timeDimensions: [
      {
        dimension: "Logs.createdAt",
        dateRange: ["2019-04-01", "2019-04-09"],
        granularity: "day"
      }
    ]
  },
  bar: {
    measures: ["Logs.count"],
    dimensions: ["Logs.status"],
    filters: [
      {
        dimension: `Logs.isError`,
        operator: `equals`,
        values: ["Yes"]
      }
    ],
    timeDimensions: [
      {
        dimension: "Logs.createdAt",
        dateRange: ["2019-04-01", "2019-04-09"],
        granularity: "day"
      }
    ]
  },
  pie: {
    measures: ["Logs.count"],
    dimensions: ["Logs.status"],
    filters: [
      {
        dimension: `Logs.isError`,
        operator: `equals`,
        values: ["Yes"]
      }
    ],
    timeDimensions: [
      {
        dimension: `Logs.createdAt`,
        dateRange: ["2019-04-01", "2019-04-09"]
      }
    ],
  },
};

const Empty = () => <Text>No component for that yet</Text>;

const chartElement = (type, data) => {
  switch (type) {
    case 'line':
      return <LineChart data={data} />;
    case 'bar':
      return <BarChart data={data} />;
    default:
      return <Empty />;
  }
};

const Chart = ({ type }) => (
  <QueryRenderer
    query={queries[type]}
    cubejsApi={cubejsApi}
    render={({ resultSet }) => {
      if (!resultSet) {
        return <ActivityIndicator size="large" color="#0000ff" />;
      }

      return chartElement(type, resultSet);
    }}
  />
);

export default Chart;
