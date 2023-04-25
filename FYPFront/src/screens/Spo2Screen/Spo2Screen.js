import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import CustomButton from "../../components/CustomButton/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './styles';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const Spo2Screen = () => {

    const navigation = useNavigation();
    const [spo2, setSpo2] = useState('');
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [value, setValue] = useState([]);
    const [isPressed, setIsPressed] = useState(false);
    const [isPressedCheckVal, setIsPressedCheckVal] = useState(false);
    const [error, setError] = useState(null);

    const addSPO2 = async (isChecked) => {
        isChecked ? setIsPressedCheckVal(true) : setIsPressed(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/spo2',
                { checked: isChecked, spo2 },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                },
            );
            if (response.status === 200) {
                isChecked ? navigation.navigate('Spo2') : navigation.navigate('Measurement');
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            isChecked ? setIsPressedCheckVal(false) : setIsPressed(false);
        }
    };

    const onCheckValuePressed = () => {
        addSPO2(true);
    };

    const onSubmitPressed = () => {
        addSPO2(false);
    };

    const getProfileData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://ouvatek.herokuapp.com/api/spo2value', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const dates = [];
            const times = [];
            const values = [];
            response.data.data.forEach((d) => {
                dates.push(d.spo2_date);
                times.push(d.spo2_time);
                values.push(d.spo2_val);
            });
            setDate(dates);
            setTime(times);
            setValue(values);
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

    const onSeeGraphPressed = () => {
        navigation.navigate('Graph', { date: date, time: time, value: value });
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon
                    name="percent-outline"
                    style={styles.icon}
                />
                <Text style={styles.error}>{error}</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.txtTitle}>Please Enter Your SPO2 value</Text>
                <Icon
                    name='help-circle-outline'
                    style={styles.helpIcon}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={setSpo2}
                    value={spo2}
                    placeholder="95"
                    keyboardType="numeric"
                    style={styles.input}
                />
                <Text style={styles.txt}>%</Text>
            </View>

            <View style={styles.btnContainer}>
                <CustomButton
                    text={isPressedCheckVal ? "Checking values" : "Check Values"}
                    onPress={onCheckValuePressed}
                    type='Teritiary'
                />
            </View>

            <View style={styles.btnContainer}>
                <CustomButton
                    text="See Graph"
                    onPress={onSeeGraphPressed}
                    type='Secondary'
                />
            </View>
            <CustomButton
                text={isPressed ? 'Submitting...' : 'Submit'}
                onPress={onSubmitPressed}
            />
            <CustomButton
                text="Go back"
                onPress={() => navigation.goBack()}
                type='Teritiary'
            />

        </View>
    );
};

export default Spo2Screen;
