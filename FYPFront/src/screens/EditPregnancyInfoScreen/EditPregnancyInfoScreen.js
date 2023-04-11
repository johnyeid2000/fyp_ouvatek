import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from "react-native";
import { Checkbox } from 'react-native-paper';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const EditPregnancyInfoScreen = () => {
    const [birthDate, setBirthDate] = useState('');
    const [firstPregnancyDay, setFirstPregnancyDay] = useState('');
    const [Medication, setMedication] = useState([]);
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [checkDiabetes, setCheckDiabetes] = useState(false);
    const [checkHypertension, setCheckHypertension] = useState(false);
    const [checkPrevPreg, setCheckPrevPreg] = useState(false);
    const [Surgeries, setSurgeries] = useState([]);
    const [selectedSurgeries, setSelectedSurgeries] = useState(null);

    const [editStatus, setEditStatus] = useState(null);

    const [specificData, setSpecificData] = useState('');
    const navigation = useNavigation();


    useEffect(() => {
        axios.get('https://ouvatek.herokuapp.com/api/medication')
            .then(response => {
                setMedication(response.data.rows);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get('https://ouvatek.herokuapp.com/api/surgeries')
            .then(response => {
                setSurgeries(response.data.rows);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const getProfileData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://ouvatek.herokuapp.com/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSpecificData(response.data.specificData);
            setBirthDate(response.data.specificData.birthDate);
            setFirstPregnancyDay(response.data.specificData.first_pregnant_day);
            setSelectedMedication(response.data.specificData.medication_taken);
            setCheckDiabetes(response.data.specificData.diabetes);
            setCheckHypertension(response.data.specificData.hypertension);
            setCheckPrevPreg(response.data.specificData.previous_pregnancies);
            setSelectedSurgeries(response.data.specificData.previous_surgeries);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);


    const editUser = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/editpatient',
                { birthDate, firstPregnancyDay, selectedMedication, checkDiabetes, checkHypertension, checkPrevPreg, selectedSurgeries },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                },
            );
            if (response.status === 200) {
                navigation.navigate('EditPatient');
            }
        } catch (error) {
            setEditStatus(error.response.data.message);
        }
    };

    const onSubmitPressed = () => {
        editUser();
    };

    return (
        <ScrollView>
            <View style={styles.root}>
                <Text style={styles.title}>Edit Your Pregnancy information</Text>

                <Text style={styles.error}>{editStatus}</Text>

                <CustomDatePicker
                    label="Birth Date"
                    IconName="calendar"
                    value={birthDate}
                    onChange={setBirthDate}
                    isMaxDateDisabled={true}
                />

                <CustomDatePicker
                    label="First Pregnancy Day"
                    IconName="calendar-heart"
                    value={firstPregnancyDay}
                    onChange={setFirstPregnancyDay}
                    isMaxDateDisabled={true}
                    isMinDateDisabled={true}
                />

                <CustomPicker
                    label="Medication"
                    IconName="medical-bag"
                    selOption={selectedMedication}
                    setSelOption={setSelectedMedication}
                    opt={Medication.map(medication => ({ label: medication.medication_name, value: medication.medication_id }))}
                />

                <Text style={styles.txt}>Check the box next to your corresponding case(s):</Text>

                <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox}>
                        <Checkbox
                            status={checkDiabetes ? 'checked' : 'unchecked'}
                            onPress={() => { setCheckDiabetes(!checkDiabetes); }}
                            color='#651B70'
                        />
                        <Text>Diabetes </Text>
                    </View>

                    <View style={styles.checkbox}>
                        <Checkbox
                            status={checkHypertension ? 'checked' : 'unchecked'}
                            onPress={() => { setCheckHypertension(!checkHypertension); }}
                            color='#651B70'
                        />
                        <Text>Hypertension </Text>
                    </View>

                    <View style={styles.checkbox}>
                        <Checkbox
                            status={checkPrevPreg ? 'checked' : 'unchecked'}
                            onPress={() => { setCheckPrevPreg(!checkPrevPreg); }}
                            color='#651B70'
                        />
                        <Text>Previous Pregnancies </Text>
                    </View>

                </View>

                <CustomPicker
                    label="Previous surgeries"
                    IconName="scissors-cutting"
                    selOption={selectedSurgeries}
                    setSelOption={setSelectedSurgeries}
                    opt={Surgeries.map(surgery => ({ label: surgery.surgeries_name, value: surgery.surgeries_id }))}
                />

                <CustomButton
                    text="Submit"
                    onPress={onSubmitPressed}
                />


            </View>
        </ScrollView>

    );
};

export default EditPregnancyInfoScreen;

