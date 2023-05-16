import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Calendar from 'react-native-calendars/src/calendar';
import { useNavigation } from '@react-navigation/native';

const DoctorEventsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const navigation = useNavigation();

  const getAppointments = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('https://ouvatek.herokuapp.com/api/showappointmentsdoctor', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data.appointments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAppointments();
    });
    return unsubscribe;
  }, [navigation]);

  const markedDates = {};
  const today = new Date().toISOString().split('T')[0];
  const filteredAppointments = appointments.filter((appointment) => {
    return appointment.appointment_date.slice(0, 7) === selectedMonth;
  });

  filteredAppointments.forEach((appointment) => {
    filteredAppointments.sort((a, b) => {
      const dateA = new Date(a.appointment_date);
      const dateB = new Date(b.appointment_date);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      const timeA = new Date(`1970-01-01T${a.appointment_start_time}`).getTime();
      const timeB = new Date(`1970-01-01T${b.appointment_start_time}`).getTime();
      return timeA - timeB;
    });
    markedDates[appointment.appointment_date] = {
      dotColor: '#651B70',
      marked: true,
      selected: appointment.appointment_date === today,
      selectedDayBackgroundColor: '#651B70',
      ...(appointment.appointment_date === today && { dotColor: '#ffffff' }),
    };
  });

  if (!markedDates[today]) {
    markedDates[today] = {
      selected: true,
      selectedDayBackgroundColor: '#651B70',
    };
  }

  const groupAppointmentsByDate = (filteredAppointments) => {
    return filteredAppointments.reduce((acc, appointment) => {
      const date = appointment.appointment_date;
      if (date.slice(0, 7) === selectedMonth) {
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(appointment);
      }
      return acc;
    }, {});
  };


  const dateGroups = Object.entries(groupAppointmentsByDate(filteredAppointments)).map(([date, filteredAppointments]) => {
    return {
      date,
      filteredAppointments
    };
  });

  const deleteAppointment = async (appointment) => {
    try {
      Alert.alert(
        'Delete Appointment ',
        `Are you sure you want to delete the appointment with ${appointment.first_name} ${appointment.last_name} on ${appointment.appointment_date} From ${appointment.appointment_start_time} - To ${appointment.appointment_end_time} ?`,
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
                const response = await axios.post('https://ouvatek.herokuapp.com/api/deleteappointment', {
                  appointmentId: appointment.appointment_id
                }, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
                if (response.status === 200) {
                  getAppointments();
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
    <View style={{ flex: 1 }}>
      <Calendar
        style={{ borderRadius: 10, elevation: 4, margin: 10 }}
        theme={{
          arrowColor: '#651B70',
          selectedDayTextColor: '#ffffff',
          selectedDayBackgroundColor: "#651B70"
        }}
        markedDates={markedDates}
        onMonthChange={(month) => setSelectedMonth(month.dateString.slice(0, 7))}

      />
      <FlatList
        data={dateGroups}
        style={{ marginRight: 20 }}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => {
          return (
            <>
              <View style={{ marginLeft: 20, marginTop: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{`\u2022 ${item.date}`}</Text>
              </View>
              {item.filteredAppointments.map((appointment) => {
                return (
                  <View key={appointment.appointment_id} style={{ marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, marginBottom: 5, marginLeft: 20 }}>
                      {`- Appointment with ${appointment.first_name} ${appointment.last_name}\n`}
                      <Text style={{ lineHeight: 20 }}>
                        {`From ${appointment.appointment_start_time} - To ${appointment.appointment_end_time}`}
                      </Text>
                    </Text>
                    <Pressable onPress={() => deleteAppointment(appointment)}>
                      <Icon
                        name='delete'
                        size={20}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </>
          );
        }}
      />
    </View>
  );
};

export default DoctorEventsScreen;
