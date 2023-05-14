import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const DoctorAvailabilityScreen = () => {

    const [schedule, setSchedule] = useState([]);
    const navigation = useNavigation();

    const getSchedule = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://ouvatek.herokuapp.com/api/showschedule', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setSchedule(response.data.schedule);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getSchedule();
        });
        return unsubscribe;
    }, [navigation]);

    const onAddAvailabilityPressed = () => {
        navigation.navigate("AddAvailability");
    };

    const onDeleteTimePressed = async (slot) => {
        try {
            Alert.alert(
                'Delete Availability Slot',
                `Are you sure you want to delete the availability slot from ${slot.start_time} to ${slot.end_time}?`,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: async () => {
                            try {
                                const token = await AsyncStorage.getItem('token');
                                const response = await axios.post('https://ouvatek.herokuapp.com/api/deletetime', {
                                    timeChosen: slot.avail_id
                                }, {
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                });
                                if (response.status === 200) {
                                    getSchedule();
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        }
                    }
                ]
            );
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <ScrollView style={{ padding: 10 }}>
            <Pressable style={styles.pressableContainer} onPress={onAddAvailabilityPressed} >
                <Icon name='calendar-plus' style={styles.icon} />
                <Text >Press to add to your availability schedule</Text>
                <Icon name='clock-plus' style={styles.icon} />
            </Pressable>

            {schedule.length > 0 ? (
                <>
                    <Text style={styles.title}>Your availability schedule is shown below</Text>
                    <View style={{ marginTop: 10 }}>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                            const slots = schedule.filter(slot => slot.day_of_week === day);
                            return (
                                <View key={index} style={styles.daysContainer}>
                                    <Text style={styles.days}>{day}</Text>
                                    {slots.length > 0 ? (
                                        slots.sort((slot1, slot2) => slot1.start_time.localeCompare(slot2.start_time))
                                            .map((slot, index) => (
                                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={styles.timeTxt}>{`From ${slot.start_time}- To ${slot.end_time}`}</Text>
                                                    <Pressable onPress={() => onDeleteTimePressed(slot)}>
                                                        {/* <Text style={{ marginLeft: '66%', marginTop: 10, fontSize: 18 }} >x</Text> */}
                                                        <Icon name='delete' style={{ marginLeft: '5%', marginTop: 20 }} size={20} />
                                                    </Pressable>
                                                </View>
                                            ))
                                    ) : (
                                        <Text style={styles.timeTxt}>No available time</Text>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </>
            ) : (
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Your availability schedule is empty</Text>
            )}


        </ScrollView>
    );
};

export default DoctorAvailabilityScreen;
