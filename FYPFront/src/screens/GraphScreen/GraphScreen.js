import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';

import { LineChart } from "react-native-chart-kit";

import styles from './styles';

const GraphScreen = ({ route }) => {

  const { date, time, value, value2 } = route.params;
  const [selectedPoint, setSelectedPoint] = useState(null);

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

  const handleDataPointClick = (data) => {
    setSelectedPoint(data);
  };

  const handleChartSelect = (event) => {
    if (!event.nativeEvent) {
      setSelectedPoint(null);
      return;
    }

    const { x, y } = event.nativeEvent;
    if (x && y) {
      setSelectedPoint({ x, y, index: Math.round((x / chartWidth) * (labels.length - 1)), value: chartData[0].data[Math.round((x / chartWidth) * (chartData[0].data.length - 1))] });
    } else {
      setSelectedPoint(null);
    }
  };

  let boxPosition = null;
  if (selectedPoint) {
    const boxWidth = 100;
    const boxHeight = 50;
    const boxLeft = selectedPoint.x - (boxWidth / 2);
    const boxRight = boxLeft + boxWidth;
    if (boxRight > screenWidth) {
      boxPosition = { left: selectedPoint.x - boxWidth, top: selectedPoint.y - boxHeight };
    } else {
      boxPosition = { left: selectedPoint.x, top: selectedPoint.y - boxHeight };
    }
  }

  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <LineChart
        data={{
          labels: labels,
          datasets: chartData
        }}
        width={chartWidth} // from react-native
        height={chartHeight}
        yAxisInterval={0.5}
        chartConfig={{
          decimalPlaces: 1, // optional, defaults to 2dp
          backgroundColor: "#651B70",
          backgroundGradientFrom: "#810CA8",
          backgroundGradientTo: "#C147E9",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            stroke: "#E5B8F4"
          },
        }}
        bezier
        xLabelsOffset={-15} // offset x-axis labels to left
        yLabelsOffset={20}
        verticalLabelRotation={65}
        style={{
          borderRadius: 10,
        }}
        onDataPointClick={handleDataPointClick}
        onChartSelect={handleChartSelect}
      />

      {selectedPoint && (
        <View style={{ position: 'absolute', top: selectedPoint.y, left: selectedPoint.x > chartWidth / 2 ? selectedPoint.x - 100 : selectedPoint.x + 10, backgroundColor: '#fff', padding: 10, borderRadius: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{selectedPoint.value} {value2 && `/ ` + value2[selectedPoint.index]}</Text >
          <Text style={{ fontWeight: 'bold' }}>{labels[selectedPoint.index]}</Text>
        </View>
      )}
    </View>

  );
};

export default GraphScreen;
