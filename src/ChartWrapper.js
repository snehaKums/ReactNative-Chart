import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { VictoryChart, VictoryZoomContainer, VictoryAxis } from 'victory-native';
import moment from 'moment';

const vStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});

const padding = {
    portrait: { left: 55, top: 40, right: 45, bottom: 50 },
    landscape: { left: 100, top: 40, right: 70, bottom: 50 }
};

const tickCount = {
  portrait: 4,
  landscape: 9
};

export const colors = [
  "#7DB3FF",
  "#49457B",
  "#FF7C78",
  "#FED3D0",
  "#6F76D9",
  "#9ADFB4",
  "#2E7987"
];

export const dateFormatter = ({ x }) => moment(x).format("MMM DD");

class ChartWrapper extends React.Component {
  constructor() {
    super();
    this.state = { orientation: 'portrait', ...Dimensions.get('window')};
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
  }

  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  updateDimensions() {
    const windowSize = Dimensions.get('window');
    const orientation = windowSize.width < windowSize.height ? 'portrait' : 'landscape';
    this.setState({ orientation, ...windowSize });
  }

  render() {
    return (
      <View style={vStyles.container} onLayout={this.updateDimensions}>
        <VictoryChart
          width={this.state.width}
          padding={padding[this.state.orientation]}
          domainPadding={{x: 10, y: 25}}
          colorScale={colors}
          tickCount={4}
          containerComponent={
            <VictoryZoomContainer responsive={true}
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          {this.props.children}
          {!this.props.hideAxis &&
            <VictoryAxis tickCount={tickCount[this.state.orientation]} />
          }
          {!this.props.hideAxis &&
            <VictoryAxis dependentAxis />
          }
        </VictoryChart>
      </View>
    );
  }
}

export default ChartWrapper;
