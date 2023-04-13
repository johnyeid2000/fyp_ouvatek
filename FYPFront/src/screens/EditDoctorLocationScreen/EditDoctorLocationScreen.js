import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, Alert } from 'react-native';
import styles from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from "../../components/CustomButton/CustomButton";

import { useNavigation } from '@react-navigation/native';


const EditDoctorLocationScreen = () => {

    const [specificData, setSpecificData] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [editStatus, setEditStatus] = useState('');
    const navigation = useNavigation();

    const getProfileData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://ouvatek.herokuapp.com/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSpecificData(response.data.specificData);
            setClinics(response.data.address);
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

    const deletePressed = (clinic) => {
        Alert.alert(
            'Are you sure you want to Delete this clinic?',
            '',
            [
                { text: 'NO', onPress: () => false, style: 'cancel' },
                { text: 'YES', onPress: () => deletePressedSure(clinic) },
            ],
            { cancelable: false }
        );
    };

    const deletePressedSure = async (clinic) => {
        try {
            const locationId = clinic.clinic_id;
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/deletelocation',
                { locationId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                },
            );
            if (response.status === 200) {
                setEditStatus(response.data.message);
                getProfileData();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addAddClinicPressed = () => {
        setEditStatus('');
        const doctorId = specificData.dr_id;
        navigation.navigate('AddClinic', { doctorId: doctorId });
    };

    const clinicPressed = (clinic) => {
        setEditStatus('');
        navigation.navigate('EditClinic', { locationId: clinic.clinic_id });
    };

    return (
        <View style={styles.userInfoSection}>
            <Text>You can press the name of the clinic in order to update its information and
                press the delete button if you want to remove a clinic</Text>
            <Text style={styles.error}>{editStatus}</Text>
            {
                clinics.map((clinic, index) => (
                    <View key={index} style={styles.newReq}>
                        <Pressable style={{ width: '70%', height: 40 }} onPress={() => clinicPressed(clinic)}>
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>{clinic.country} clinic </Text>
                        </Pressable>

                        <Pressable style={{ width: '28%', alignItems: 'center' }} onPress={() => deletePressed(clinic)}>
                            <Text style={styles.iconDecline}>Delete Clinic</Text>
                        </Pressable>
                    </View>
                ))
            }

            <View style={{ marginTop: 30 }}>
                <CustomButton
                    text="Add Another Clinic"
                    type='Secondary'
                    onPress={addAddClinicPressed}
                />
            </View>
        </View>

    );
};

export default EditDoctorLocationScreen;

