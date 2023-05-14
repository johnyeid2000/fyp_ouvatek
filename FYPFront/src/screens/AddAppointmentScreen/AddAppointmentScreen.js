import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomPicker from '../../components/CustomPicker';
import CustomDatePicker from '../../components/CustomDatePicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const AddAppointmentScreen = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [appointmentTimes, setAppointmentTimes] = useState([]);
    const [selectedAppointmentTime, setSelectedAppointmentTime] = useState('');
    const [isPressed, setIsPressed] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const getMyDoctors = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://ouvatek.herokuapp.com/api/showmydoctors', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDoctors(response.data.rows);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getMyDoctors();
        });
        return unsubscribe;
    }, [navigation]);

    const getAppointmentRange = async (day, selectedDoctor) => {
        setSelectedDay(day);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(
                'https://ouvatek.herokuapp.com/api/showavailableappointment',
                { date: day, doctorId: selectedDoctor },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                if (
                    response.data.message === 'Doctor has No Availability.' ||
                    response.data.message === 'Doctor is Not Available this day.'
                ) {
                    setAppointmentTimes([]);
                } else {
                    setAppointmentTimes(response.data.possibleSchedule);
                }
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };


    const onTakeAppointmentPressed = async (selectedDoctor, selectedDay, selectedAppointmentTime) => {
        setIsPressed(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/takeappointment',
                { date: selectedDay, doctorId: selectedDoctor, chosenTime: selectedAppointmentTime }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                navigation.navigate("PatientEvents");
            }
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setIsPressed(false);
        }
    }

    return (
        <View style={{ padding: 10 }}>
            <Pressable style={styles.icon} onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 16 }}>X</Text>
            </Pressable>
            <Text style={styles.title}>Add a new appointment</Text>
            <Text style={styles.error}>{error}</Text>

            <CustomPicker
                label="Doctor"
                IconName="doctor"
                selOption={selectedDoctor}
                setSelOption={setSelectedDoctor}
                opt={doctors.map(doctor => ({ label: `${doctor.first_name} ${doctor.last_name}`, value: doctor.dr_id }))}
            />

            <CustomDatePicker
                label="Appointment Day"
                IconName="calendar"
                value={selectedDay}
                onChange={(day) => getAppointmentRange(day, selectedDoctor)}
                isMinDateDisabled={true}
                minDate={new Date()}
            />

            {selectedDay !== '' && (
                <>
                    <CustomPicker
                        label="Appointment Time"
                        IconName="timetable"
                        selOption={selectedAppointmentTime}
                        setSelOption={setSelectedAppointmentTime}
                        opt={appointmentTimes.map(appointmentTime => ({ label: appointmentTime, value: appointmentTime }))}
                    />

                    <CustomButton
                        text={isPressed ? 'Taking Appointment...' : 'Take Appointment'}
                        onPress={() => onTakeAppointmentPressed(selectedDoctor, selectedDay, selectedAppointmentTime)}
                    />
                </>
            )}

        </View>
    );
};

export default AddAppointmentScreen;
