import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import CustomButton from "../../components/CustomButton/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './styles';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const WeightScreen = () => {

    const navigation = useNavigation();
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [value, setValue] = useState([]);
    const [error, setError] = useState(null);

    const addWeight = async (isChecked) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/weight',
                { checked: isChecked, weight },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                },
            );
            if (response.status === 200) {
                setError(response.data.message);
                isChecked ? navigation.navigate('Weight') : navigation.navigate('Measurement');
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const onCheckValuePressed = () => {
        addWeight(true);
    };

    const onSubmitPressed = () => {
        addWeight(false);
    };

    const getProfileData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://ouvatek.herokuapp.com/api/weightvalue', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const dates = [];
            const times = [];
            const values = [];
            response.data.data.forEach((d) => {
                dates.push(d.weight_date);
                times.push(d.weight_time);
                values.push(d.weight_value);
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
                    name="scale-bathroom"
                    style={styles.icon}
                />
                <Text style={styles.error}>{error}</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.txtTitle}>Please Enter Your Weight</Text>
                <Icon
                    name='help-circle-outline'
                    style={styles.helpIcon}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="70"
                    keyboardType="numeric"
                    style={styles.input}
                />
                <Text style={styles.txt}>kg</Text>
            </View>

            <View style={styles.btnContainer}>
                <CustomButton
                    text="Check Values"
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
                text="Submit"
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

export default WeightScreen;
