import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper'
import CustomButton from "../../components/CustomButton/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './styles';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const BloodGlucoseScreen = () => {

    const navigation = useNavigation();
    const [glucose, setGlucose] = useState('');
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [value, setValue] = useState([]);
    const [checkedTime, setCheckedTime] = useState('');
    const [isPressed, setIsPressed] = useState(false);
    const [isPressedCheckVal, setIsPressedCheckVal] = useState(false);
    const [error, setError] = useState(null);

    const addBloodGlucose = async (isChecked) => {
        isChecked ? setIsPressedCheckVal(true) : setIsPressed(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/glucose',
                { checked: isChecked, glucose, checkedTime },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                },
            );
            if (response.status === 200) {
                isChecked ? navigation.navigate('BloodGlucose') : navigation.navigate('Measurement');
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            isChecked ? setIsPressedCheckVal(false) : setIsPressed(false);
        }
    };

    const onCheckValuePressed = () => {
        if (checkedTime === '4') {
            setError('You need to choose a time');
        } else {
            addBloodGlucose(true);
        }
    };

    const onSubmitPressed = () => {
        addBloodGlucose(false);
    };

    const getProfileData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://ouvatek.herokuapp.com/api/glucosevalue', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const dates = [];
            const times = [];
            const values = [];
            // console.log(response.data.data);
            response.data.data.forEach((d) => {
                dates.push(d.gluc_date);
                times.push(d.gluc_time);
                values.push(d.glucose_val);
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
        if (value.length > 0) {
            setError('');
            navigation.navigate('Graph', { date: date, time: time, value: value, suffix: " mg/dL" });
        } else {
            setError("There are no Blood glucose values to show in the graph");
        }
    };

    return (
        <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Icon
                        name="diabetes"
                        style={styles.icon}
                    />
                    <Text style={styles.error}>{error}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.txtTitle}>Please Enter Your Blood Glucose Value</Text>
                    {/* <Icon
                        name='help-circle-outline'
                        style={styles.helpIcon}
                    /> */}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={setGlucose}
                        value={glucose}
                        placeholder="100"
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <Text style={styles.txt}>mg/dL</Text>
                </View>

                <Text style={styles.txtTitle}>To ensure accurate results, let us know about your recent food intake. Have you eaten today?</Text>

                <View style={{ marginLeft: -15, width: '110%' }}>
                    <RadioButton.Group
                        onValueChange={value => setCheckedTime(value)}
                        value={checkedTime}
                    >
                        <RadioButton.Item label="No" value="1" color='#651B70' labelStyle={{ color: 'grey' }} />
                        <RadioButton.Item label='Yes' value='4' color='#651B70' labelStyle={{ color: 'grey' }} />

                        {(checkedTime === '4' || checkedTime === '2' || checkedTime === '3') && (
                            <>
                                <RadioButton.Item label="One Hour" value="2" color='#651B70' labelStyle={{ color: 'grey' }} />
                                <RadioButton.Item label="Two or More Hours" value="3" color='#651B70' labelStyle={{ color: 'grey' }} />
                            </>
                        )}

                    </RadioButton.Group>
                </View>

                <View style={styles.btnContainer}>
                    <CustomButton
                        text={isPressedCheckVal ? "Checking values" : "Check Values"}
                        onPress={onCheckValuePressed}
                        type='Teritiary'
                    />
                </View>

                <View>
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

                <View style={{ marginTop: 10 }}>
                    <CustomButton
                        text="Go back"
                        onPress={() => navigation.goBack()}
                        type='Teritiary'
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default BloodGlucoseScreen;
