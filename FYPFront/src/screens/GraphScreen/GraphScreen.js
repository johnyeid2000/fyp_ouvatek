import React from 'react';
import {View, Text} from 'react-native';

import {LineChart} from "react-native-chart-kit";

import styles from './styles';

const GraphScreen = () => {

  return (
    <View style={{alignItems:'center', flex:1 ,justifyContent:'center'}}>
    <Text style={styles.title}>Heart Rate</Text>
    <LineChart
    data={{
      labels: ["10 MAR", "17 MAR", "23 MAR", "30 MAR", "07 APR", "14 APR"],
      datasets: [
        {
          data: [ 105, 100, 95, 80, 75]
        }
      ]
    }}
    width={350} // from react-native
    height={300}
    chartConfig={{
      backgroundColor: "#651B70",
      backgroundGradientFrom: "#810CA8",
      backgroundGradientTo: "#C147E9",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      propsForDots: {
        stroke: "#E5B8F4"
      }
    }}
    bezier
    style={{
      borderRadius: 16
    }}
  />
    </View>
  );
};

export default GraphScreen;
