import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./styles";

const CheckDoctorInformationScreen = ({ route }) => {

    const { id } = route.params;
    const [userData, setUserData] = useState('');
    const [clinics, setClinics] = useState([]);

    const getDoctorData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/getdoctor', { id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setUserData(response.data.specificData);
                setClinics(response.data.address);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDoctorData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="account" color="#651B70" size={20} />
                    <Text style={[styles.txtRow]}><Text style={{ fontWeight: 'bold' }}>{userData.first_name} {userData.last_name}</Text></Text>
                </View>

                {clinics.map((clinic, index) => (
                    <View key={index} style={styles.row}>
                        <Icon name="hospital-building" color="#651B70" size={20} />
                        <Text style={styles.txtRow}><Text style={{ fontWeight: 'bold' }}>Clinic {index + 1}:</Text> {clinic.country} - {clinic.city} -
                            Street {clinic.street} - Building {clinic.building} -
                            Floor {clinic.floor} -  <Icon name="phone-classic" color="#d1a4eb" size={20} />
                            {clinic.number}</Text>
                    </View>
                ))}

                <View style={styles.row}>
                    <Icon name="doctor" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>{userData.oop_number}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="certificate-outline" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>{userData.speciality}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="gender-male-female" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>{userData.gender}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="timelapse" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>{userData.exp_years}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="book-outline" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>{userData.biography}</Text>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default CheckDoctorInformationScreen;
