import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';


const CheckSPO2Screen = ({ route }) => {

    const { pat_id } = route.params;
    const [values, setValues] = useState([]);

    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [valueSPO2, setValueSPO2] = useState([]);
    const [error, setError] = useState([]);
    const navigation = useNavigation();

    const getSPO2Values = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/spo2valueasdoctor', { pat_id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const dates = [];
            const times = [];
            const valuesSPO2 = [];
            if (response.status === 200) {
                setValues(response.data.data);
                response.data.data.forEach((d) => {
                    dates.push(d.spo2_date);
                    times.push(d.spo2_time);
                    valuesSPO2.push(d.spo2_val);
                });
                setDate(dates);
                setTime(times);
                setValueSPO2(valuesSPO2);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getSPO2Values();
    }, []);

    const onSeeGraphPressed = () => {
        if (valueSPO2.length > 0) {
            navigation.navigate('Graph', { date: date, time: time, value: valueSPO2 });
        } else {
            setError("There are no spo2 values to show in the graph");
        }
    };


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.error}>{error}</Text>

            <View style={styles.header}>
                <Text style={styles.cellHeader}>SPO2 (%)</Text>
                <Text style={styles.cellHeader}>Date and time</Text>
            </View>
            {values.map((value) => (
                <View style={styles.row} key={value.spo2_id}>
                    <Text style={styles.cell}>{value.spo2_val}</Text>
                    <Text style={styles.cell}>{`${value.spo2_date} ${value.spo2_time}`}</Text>
                </View>
            ))}

            <CustomButton
                text="Check SPO2 Graph"
                onPress={onSeeGraphPressed}
            />
        </ScrollView>
    );
};

export default CheckSPO2Screen;
