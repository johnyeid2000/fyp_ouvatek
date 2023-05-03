import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';


const CheckWeightScreen = ({ route }) => {

    const { pat_id } = route.params;
    const [values, setValues] = useState([]);

    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [valueWeight, setValueWeight] = useState([]);
    const [error, setError] = useState([]);
    const navigation = useNavigation();

    const getWeightValues = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/weightvalueasdoctor', { pat_id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const dates = [];
            const times = [];
            const valuesWeight = [];
            if (response.status === 200) {
                setValues(response.data.data);
                response.data.data.forEach((d) => {
                    dates.push(d.weight_date);
                    times.push(d.weight_time);
                    valuesWeight.push(d.weight_value);
                });
                setDate(dates);
                setTime(times);
                setValueWeight(valuesWeight);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getWeightValues();
    }, []);

    const onSeeGraphPressed = () => {
        if (valueWeight.length > 0) {
            navigation.navigate('Graph', { date: date, time: time, value: valueWeight });
        } else {
            setError("There are no Weight values to show in the graph");
        }
    };


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.error}>{error}</Text>

            <View style={styles.header}>
                <Text style={styles.cellHeader}>Weight (Kg)</Text>
                <Text style={styles.cellHeader}>Date and time</Text>
            </View>
            {values.map((value) => (
                <View style={styles.row} key={value.weight_id}>
                    <Text style={styles.cell}>{value.weight_value}</Text>
                    <Text style={styles.cell}>{`${value.weight_date} ${value.weight_time}`}</Text>
                </View>
            ))}

            <CustomButton
                text="Check Weight Graph"
                onPress={onSeeGraphPressed}
            />

        </ScrollView>
    );
};

export default CheckWeightScreen;
