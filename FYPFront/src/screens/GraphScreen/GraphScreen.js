import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import { LineChart } from "react-native-chart-kit";

import styles from './styles';

const GraphScreen = ({ route }) => {

  const { date, time, value, value2 } = route.params;

  const labels = date.map((d, i) => `${d} ${time[i]}`);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const chartWidth = screenWidth * 0.98;
  const chartHeight = screenHeight * 0.85;

  const chartData = value2 ? [
    {
      data: value
    },
    {
      data: value2
    }
  ] : [
    {
      data: value
    }
  ];

  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <LineChart
        data={{
          labels: labels,
          datasets: chartData
        }}
        width={chartWidth} // from react-native
        height={chartHeight}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#651B70",
          backgroundGradientFrom: "#810CA8",
          backgroundGradientTo: "#C147E9",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            stroke: "#E5B8F4"
          },
        }}
        bezier
        xLabelsOffset={-15} // offset x-axis labels to left
        yLabelsOffset={40}
        verticalLabelRotation={65}
        style={{
          borderRadius: 10,
        }}
      />
    </View>

  );
};

export default GraphScreen;
