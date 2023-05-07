import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const CheckTemperatureScreen = ({ route }) => {

    const { pat_id } = route.params;
    const [values, setValues] = useState([]);
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [valueTemp, setValueTemp] = useState([]);
    const [error, setError] = useState([]);
    const navigation = useNavigation();

    const getTemperatureValues = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/temperaturevalueasdoctor', { pat_id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const dates = [];
            const times = [];
            const valuesTemp = [];
            if (response.status === 200) {
                setValues(response.data.data);
                response.data.data.forEach((d) => {
                    dates.push(d.temp_date);
                    times.push(d.temp_time);
                    valuesTemp.push(d.temp_val);
                });
                setDate(dates);
                setTime(times);
                setValueTemp(valuesTemp);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTemperatureValues();
    }, []);

    const onSeeGraphPressed = () => {
        if (valueTemp.length > 0) {
            navigation.navigate('Graph', { date: date, time: time, value: valueTemp, suffix: " °C" });
        } else {
            setError("There are no temperature values to show in the graph");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.error}>{error}</Text>

            <View style={styles.header}>
                <Text style={styles.cellHeader}>Temperature (°C)</Text>
                <Text style={styles.cellHeader}>Date and time</Text>
            </View>
            {values.map((value) => (
                <View style={styles.row} key={value.temp_id}>
                    <Text style={styles.cell}>{value.temp_val}</Text>
                    <Text style={styles.cell}>{`${value.temp_date} ${value.temp_time}`}</Text>
                </View>
            ))}

            <CustomButton
                text="Check Temperature Graph"
                onPress={onSeeGraphPressed}
            />
        </ScrollView>
    );
};

export default CheckTemperatureScreen;
