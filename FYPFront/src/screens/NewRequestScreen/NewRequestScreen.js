import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { Alert } from 'react-native';

const NewRequestScreen = () => {
    const [patients, setPatients] = useState([]);
    const navigation = useNavigation();

    const getPatients = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://ouvatek.herokuapp.com/api/showpatientrequests', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPatients(response.data.rows);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getPatients();
        });
        return unsubscribe;
    }, [navigation]);


    const onCheckPatientPressed = (patient) => {
        navigation.navigate("CheckPatientInfo", { id: patient.id });
    };


    const acceptPressed = async (patient) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/acceptlink', {
                dr_id: patient.dr_id, pat_id: patient.pat_id
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            getPatients();
        } catch (error) {
            console.error(error);
        }
    };

    const declinePressed = async (patient) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/denylinkdoctor', {
                dr_id: patient.dr_id, pat_id: patient.pat_id
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            getPatients();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.icon} onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 16 }}>X</Text>
            </Pressable>
            <ScrollView style={{ marginTop: 40 }}>
                {patients.map((patient, index) => (
                    <View key={index} style={styles.newReq}>
                        <Pressable style={styles.doctorInfoContainer} onPress={() => onCheckPatientPressed(patient)}>
                            <Image
                                source={{ uri: 'https://dub01pap003files.storage.live.com/y4m0SSC9fzPryBlevyPGjBpQlVmCD52-SGGPDA-Hk8H2ps-cfOXNJ_Jt_G7wR64SL0IwM9SyZz7ocmciHVwZ52Ij1OrTg1MS2IQogTINfsqc7KU2eFR2Z2zXB0BmAbDAE0_cmbOEtQfuA13NUuitrJ3KQr0YHT4hgjwqAUGU2iG5iNfenB95VV2l3JT6vKPQ-6u?width=200&height=200&cropmode=none' }}
                                style={styles.doctorImage}
                            />
                            <View>
                                <Text style={{ color: "black", fontWeight: "bold" }}>
                                    {patient.first_name} {patient.last_name}
                                </Text>
                                <Text>
                                    {patient.trimester_name}
                                </Text>
                            </View>
                        </Pressable>

                        <Pressable onPress={() => acceptPressed(patient)} style={styles.iconsPressable}>
                            <Icon
                                name='check'
                                style={styles.iconAccept}
                            />
                        </Pressable>

                        <Pressable onPress={() => declinePressed(patient)} style={styles.iconsPressable}>
                            <Icon
                                name='close'
                                style={styles.iconDecline}
                            />
                        </Pressable>
                    </View>
                ))}
            </ScrollView>

        </View>
    );
};

export default NewRequestScreen;