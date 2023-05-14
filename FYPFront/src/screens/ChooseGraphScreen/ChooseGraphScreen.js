import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, Pressable } from 'react-native';
import CustomButton from '../../components/CustomButton';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';


const ChooseGraphScreen = ({ route }) => {
    const { labels, valueHR, valueDias, valueSys } = route.params;
    const [value, setValue] = useState([]);
    const [value2, setValue2] = useState([]);
    const [selectedGraph, setSelectedGraph] = useState(null);
    const navigation = useNavigation();
    const [selectedPoint, setSelectedPoint] = useState(null);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const chartWidth = screenWidth * 0.98;
    const [chartHeight, setChartHeight] = useState(screenHeight * 0.79);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSelectedGraph({
                labels: labels,
                datasets: [
                    {
                        data: valueHR,
                    },
                ],
            });
            setValue(valueHR);
            setValue2(null);
        });
        return unsubscribe;
    }, [navigation]);

    const onSeeHRGraphPressed = () => {
        setSelectedGraph({
            labels: labels,
            datasets: [
                {
                    data: valueHR,
                },
            ],
        });
        setValue(valueHR);
        setValue2(null);
        setSelectedPoint(null);
        setChartHeight(screenHeight * 0.79);
    };

    const onSeeBPGraphPressed = () => {
        setSelectedGraph({
            labels: labels,
            datasets: [
                {
                    data: valueSys,
                },
                {
                    data: valueDias,
                    color: () => 'rgb(171,70,160)'
                },
            ],
            // legend: ["Systolic", "Diastolic"]
        });
        setValue(valueSys);
        setValue2(valueDias);
        setSelectedPoint(null);
        setChartHeight(screenHeight * 0.75);
    };

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

    const yAxisSuffix = value2 ? " mmHg" : " BPM";

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
        <View style={styles.container}>
            <Pressable onPress={() => setSelectedPoint(null)}>

                {selectedGraph && (
                    <>
                        <LineChart
                            data={selectedGraph}
                            width={chartWidth} // from react-native
                            height={chartHeight}
                            yAxisSuffix={yAxisSuffix}
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
                                legendPosition: 'Bottom'
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
                    </>
                )}

                {selectedPoint && (
                    <View style={{ position: 'absolute', top: selectedPoint.y, left: selectedPoint.x > chartWidth / 2 ? selectedPoint.x - 100 : selectedPoint.x + 10, backgroundColor: '#fff', padding: 10, borderRadius: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>
                            {value[selectedPoint.index]}
                            {value2 && ` / ${value2[selectedPoint.index]}`}
                            {yAxisSuffix}
                        </Text>
                        <Text style={{ fontWeight: 'bold' }}>{labels[selectedPoint.index]}</Text>
                    </View>
                )}
            </Pressable>

            <View style={styles.btnContainer}>
                <View style={styles.btn}>
                    <CustomButton
                        text="Check Heart Rate Graph"
                        onPress={onSeeHRGraphPressed}
                    />
                </View>

                <View style={styles.btn}>
                    <CustomButton
                        text="Check Blood Pressure Graph"
                        onPress={onSeeBPGraphPressed}
                    />
                </View>
            </View>
        </View>
    );
};

export default ChooseGraphScreen;

