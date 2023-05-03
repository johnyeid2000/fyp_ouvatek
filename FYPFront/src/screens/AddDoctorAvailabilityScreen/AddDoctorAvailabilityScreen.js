import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomPicker from '../../components/CustomPicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const AddDoctorAvailabilityScreen = () => {
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedStartTime, setSelectedStartTime] = useState('');
    const [selectedEndTime, setSelectedEndTime] = useState('');
    const [StartTimes, setStartTimes] = useState([]);
    const [EndTimes, setEndTimes] = useState([]);
    const [isPressed, setIsPressed] = useState(false);
    const [error, setError] = useState(null);

    const navigation = useNavigation();

    const DaySelected = async (dayOfWeek) => {
        setSelectedDay(dayOfWeek);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/checkavailablestarttime', { dayOfWeek }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setStartTimes(response.data.startTimes);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const StartTimeSelected = async (startTime) => {
        setSelectedStartTime(startTime);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/checkavailableendtime', { dayOfWeek: selectedDay, start: startTime }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setEndTimes(response.data.endTimes);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const onSaveAvailabilityPressed = async () => {
        setIsPressed(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/addavailability',
                { dayOfWeek: selectedDay, start: selectedStartTime, end: selectedEndTime }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                navigation.navigate('DoctorAvailability');
            }
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setIsPressed(false);
        }
    };

    const optionsDays = [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" }
    ];

    return (
        <View style={{ padding: 10 }}>
            <Pressable style={styles.icon} onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 16 }}>X</Text>
            </Pressable>
            <Text style={styles.title}>Add your availability</Text>
            <Text style={styles.error}>{error}</Text>
            <CustomPicker
                label="Day"
                IconName="calendar-today"
                selOption={selectedDay}
                setSelOption={(dayOfWeek) => DaySelected(dayOfWeek)}
                opt={optionsDays}
            />

            {selectedDay !== '' && (
                <>
                    <CustomPicker
                        label="Start Time"
                        IconName="timetable"
                        selOption={selectedStartTime}
                        setSelOption={(startTime) => StartTimeSelected(startTime)}
                        opt={StartTimes.map(startTime => ({ label: startTime, value: startTime }))}
                    />

                    {selectedStartTime !== '' && (
                        <>
                            <CustomPicker
                                label="End Time"
                                IconName="timetable"
                                selOption={selectedEndTime}
                                setSelOption={(endTime) => setSelectedEndTime(endTime)}
                                opt={EndTimes.map(endTime => ({ label: endTime, value: endTime }))}
                            />

                            <CustomButton
                                text={isPressed ? 'Saving Availability...' : 'Save Availability'}
                                onPress={onSaveAvailabilityPressed}
                            />
                        </>
                    )}
                </>
            )}

        </View>
    );
};

export default AddDoctorAvailabilityScreen;
