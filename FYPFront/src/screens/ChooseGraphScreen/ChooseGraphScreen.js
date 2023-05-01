import React, { useState, useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';


const ChooseGraphScreen = () => {
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [valueHR, setValueHR] = useState([]);
    const [valueSys, setValueSys] = useState([]);
    const [valueDias, setValueDias] = useState([]);
    const [error, setError] = useState([]);
    const navigation = useNavigation();

    const getProfileData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://ouvatek.herokuapp.com/api/heartratevalue', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const dates = [];
            const times = [];
            const valuesHR = [];
            const valuesSys = [];
            const valuesDias = [];
            // console.log(response.data.data);
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
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getProfileData();
        });
        return unsubscribe;
    }, [navigation]);

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
        <View style={styles.container}>

            <Text style={styles.txt}>Choose which graph you want to check</Text>
            <Text style={styles.error}>{error}</Text>
            <CustomButton
                text="Check Heart Rate Graph"
                onPress={onSeeHRGraphPressed}
            />

            <CustomButton
                text="Check Blood Pressure Graph"
                onPress={onSeeBPGraphPressed}
            />
        </View>
    );
};

export default ChooseGraphScreen;

