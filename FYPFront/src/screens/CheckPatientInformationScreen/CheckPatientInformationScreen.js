import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./styles";

const CheckPatientInformationScreen = ({ route }) => {
    const { id } = route.params;
    const [userData, setUserData] = useState('');

    const getPatientData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/getpatient', { id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setUserData(response.data.specificData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPatientData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="account" color="#651B70" size={20} />
                    <Text style={[styles.txtRow]}><Text style={{ fontWeight: 'bold' }}>{userData.first_name} {userData.last_name}</Text></Text>
                </View>

                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>{userData.country_name}</Text>
                </View>

                <View style={styles.row}>
                    <Icon name="calendar" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>{userData.birthDate}</Text>
                </View>

                <View style={styles.row}>
                    <Icon name="calendar-heart" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>Week: {userData.week}</Text>
                </View>

                <View style={styles.row}>
                    <Icon name="human-pregnant" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>{userData.trimester_name}</Text>
                </View>

                <View style={styles.row}>
                    <Icon name="blood-bag" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>{userData.type_name}</Text>
                </View>

                <View style={styles.row}>
                    <Icon name="human-male-height" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>{userData.height} m</Text>
                </View>

                <View style={styles.row}>
                    <Icon name="medical-bag" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>{userData.surgeries_name}</Text>
                </View>

                <View style={styles.row}>
                    <Icon name="scissors-cutting" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>{userData.medication_name}</Text>
                </View>

                <View style={styles.row}>
                    <Icon name="water" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>{userData.hypertensionValue}</Text>
                </View>

                <View style={styles.row}>
                    <Icon name="diabetes" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>{userData.diabetesValue}</Text>
                </View>

                <View style={styles.row}>
                    <Icon name="baby" color="#651B70" size={20} />
                    <Text style={styles.txtRow}>{userData.previous_pregnanciesValue}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CheckPatientInformationScreen;
