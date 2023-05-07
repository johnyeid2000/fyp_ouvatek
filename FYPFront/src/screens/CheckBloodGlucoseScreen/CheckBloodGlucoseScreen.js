import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';


const CheckBloodGlucoseScreen = ({ route }) => {

    const { pat_id } = route.params;
    const [values, setValues] = useState([]);
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [valueBG, setValueBG] = useState([]);
    const [error, setError] = useState([]);
    const navigation = useNavigation();

    const getBGValues = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/glucosevalueasdoctor', { pat_id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const dates = [];
            const times = [];
            const valuesBG = [];
            if (response.status === 200) {
                setValues(response.data.data);
                response.data.data.forEach((d) => {
                    dates.push(d.gluc_date);
                    times.push(d.gluc_time);
                    valuesBG.push(d.glucose_val);
                });
                setDate(dates);
                setTime(times);
                setValueBG(valuesBG);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getBGValues();
    }, []);

    const onSeeGraphPressed = () => {
        if (valueBG.length > 0) {
            navigation.navigate('Graph', { date: date, time: time, value: valueBG, suffix: " mg/dL" });
        } else {
            setError("There are no Blood Glucose values to show in the graph");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.error}>{error}</Text>

            <View style={styles.header}>
                <Text style={styles.cellHeader}>Blood Glucose (mg/dL)</Text>
                <Text style={styles.cellHeader}>Date and time</Text>
            </View>
            {values.map((value) => (
                <View style={styles.row} key={value.glucose_id}>
                    <Text style={styles.cell}>{value.glucose_val}</Text>
                    <Text style={styles.cell}>{`${value.gluc_date} ${value.gluc_time}`}</Text>
                </View>
            ))}

            <CustomButton
                text="Check Blood Glucose Graph"
                onPress={onSeeGraphPressed}
            />
        </ScrollView>
    );
};

export default CheckBloodGlucoseScreen;
