import React, { useState } from 'react';
import { View, Text, Dimensions, Pressable } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const GraphScreen = ({ route }) => {

  const { date, time, value, value2, suffix } = route.params;
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
      data: value2,
      color: () => 'rgb(171,70,160)'
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
      <Pressable onPress={() => setSelectedPoint(null)}>
        <LineChart
          data={{
            labels: labels,
            datasets: chartData
          }}
          width={chartWidth} // from react-native
          height={chartHeight}
          yAxisSuffix={suffix}
          chartConfig={{
            decimalPlaces: 0, // optional, defaults to 2dp
            backgroundColor: "#FFFFFF",
            backgroundGradientFrom: "#D3D3D3",
            backgroundGradientTo: "#D3D3D3",
            color: () => `rgb(101, 27, 112)`,
            labelColor: (opacity = 1) => `rgba(101, 27, 112, ${opacity})`,
            propsForDots: {
              r: 6,
              stroke: "#651B70",
            },
            propsForVerticalLabels: {
              fontWeight: 'bold',
            },
            propsForHorizontalLabels: {
              fontWeight: 'bold',
            },
            strokeWidth: 2,
            style: {
              borderRadius: 10,
            },
          }}
          bezier
          xLabelsOffset={-15} // offset x-axis labels to left
          horizontalLabelRotation={-40}
          verticalLabelRotation={65}
          style={{
            borderRadius: 10,
          }}
          onDataPointClick={handleDataPointClick}
          onChartSelect={handleChartSelect}
        />

        {selectedPoint && (
          <View style={{ position: 'absolute', top: selectedPoint.y, left: selectedPoint.x > chartWidth / 2 ? selectedPoint.x - 100 : selectedPoint.x + 10, backgroundColor: '#fff', padding: 10, borderRadius: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>
              {value[selectedPoint.index]}
              {value2 && ` / ${value2[selectedPoint.index]}`}
              {suffix}
            </Text>
            <Text style={{ fontWeight: 'bold' }}>{labels[selectedPoint.index]}</Text>
          </View>
        )}
        {
          value && value2 && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                  width: 15,
                  height: 15,
                  borderRadius: 25, // half of width and height to make it circular
                  backgroundColor: '#651B70' // your desired color
                }} />
                <Text style={{ fontSize: 16 }}> Systolic</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                  width: 15,
                  height: 15,
                  borderRadius: 25, // half of width and height to make it circular
                  backgroundColor: '#AB46A0' // your desired color
                }} />
                <Text style={{ fontSize: 16 }}> Diastolic</Text>
              </View>
            </View>
          )
        }

      </Pressable>
    </View>

  );
};

export default GraphScreen;
