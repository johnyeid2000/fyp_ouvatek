import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';


const CheckHRandBPScreen = ({ route }) => {

    const { pat_id } = route.params;
    const [values, setValues] = useState([]);
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [valueHR, setValueHR] = useState([]);
    const [valueSys, setValueSys] = useState([]);
    const [valueDias, setValueDias] = useState([]);
    const [error, setError] = useState([]);
    const navigation = useNavigation();

    const getHRValues = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/heartratevalueasdoctor', { pat_id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const dates = [];
            const times = [];
            const valuesHR = [];
            const valuesSys = [];
            const valuesDias = [];
            if (response.status === 200) {
                setValues(response.data.data);
                response.data.data.forEach((d) => {
                    dates.push(d.hr_date);
                    times.push(d.hr_time);
                    valuesHR.push(d.HR_val);
                    valuesSys.push(d.Sys_val);
                    valuesDias.push(d.Dias_val);
                });
                setDate(dates);
                setTime(times);
                setValueHR(valuesHR);
                setValueSys(valuesSys);
                setValueDias(valuesDias);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getHRValues();
    }, []);

    const onSeeHRGraphPressed = () => {
        if (valueHR.length > 0) {
            navigation.navigate('Graph', { date: date, time: time, value: valueHR });
        } else {
            setError("There are no heart rate values to show in the graph");
        }
    };

    const onSeeBPGraphPressed = () => {
        if (valueSys.length > 0) {
            navigation.navigate('Graph', { date: date, time: time, value: valueSys, value2: valueDias });
        } else {
            setError("There are no blood pressure values to show in the graph");
        }
    };


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.error}>{error}</Text>

            <View style={styles.header}>
                <Text style={styles.cellHeader}>Heart Rate (BPM)</Text>
                <Text style={styles.cellHeader}>Sys/Dias (mmHg)</Text>
                <Text style={styles.cellHeader}>Date and time</Text>
            </View>
            {values.map((value) => (
                <View style={styles.row} key={value.hr_id}>
                    <Text style={styles.cell}>{value.HR_val}</Text>
                    <Text style={styles.cell}>{`${value.Sys_val} / ${value.Dias_val}`}</Text>
                    <Text style={styles.cell}>{`${value.hr_date} ${value.hr_time}`}</Text>
                </View>
            ))}

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
        </ScrollView>
    );
};

export default CheckHRandBPScreen;
