import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Pressable } from "react-native";
import { Checkbox } from 'react-native-paper';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomInput from '../../components/CustomInput';
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const EditPregnancyInfoScreen = () => {
    const [birthDate, setBirthDate] = useState('');
    const [firstPregnancyDay, setFirstPregnancyDay] = useState('');
    const [height, setHeight] = useState('');
    const [Medication, setMedication] = useState([]);
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [checkDiabetes, setCheckDiabetes] = useState(false);
    const [checkHypertension, setCheckHypertension] = useState(false);
    const [checkPrevPreg, setCheckPrevPreg] = useState(false);
    const [Surgeries, setSurgeries] = useState([]);
    const [selectedSurgeries, setSelectedSurgeries] = useState(null);
    const [editStatus, setEditStatus] = useState(null);
    const [isPressed, setIsPressed] = useState(false);
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
            setHeight(response.data.specificData.height);
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
        setIsPressed(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/editpatient',
                { birthDate, height, firstPregnancyDay, selectedMedication, checkDiabetes, checkHypertension, checkPrevPreg, selectedSurgeries },
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
        } finally {
            setIsPressed(false);
        }
    };

    const onSubmitPressed = () => {
        editUser();
    };

    return (
        <ScrollView keyboardShouldPersistTaps='handled'>
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

                <CustomInput
                    label="Height"
                    IconName="human-male-height"
                    placeholder="Enter Your height in meters"
                    value={height.toString()}
                    setValue={setHeight}
                    keyType="numeric"
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

                <Text>Check the box next to your corresponding case(s):</Text>

                <View style={styles.checkboxContainer}>
                    <Pressable style={styles.checkbox} onPress={() => { setCheckDiabetes(!checkDiabetes); }}>
                        <Checkbox
                            status={checkDiabetes ? 'checked' : 'unchecked'}
                            color='#651B70'
                        />
                        <Text>Diabetes </Text>
                    </Pressable>

                    <Pressable style={styles.checkbox} onPress={() => { setCheckHypertension(!checkHypertension); }}>
                        <Checkbox
                            status={checkHypertension ? 'checked' : 'unchecked'}
                            color='#651B70'
                        />
                        <Text>Hypertension </Text>
                    </Pressable>

                    <Pressable style={styles.checkbox} onPress={() => { setCheckPrevPreg(!checkPrevPreg); }}>
                        <Checkbox
                            status={checkPrevPreg ? 'checked' : 'unchecked'}
                            color='#651B70'
                        />
                        <Text>Previous Pregnancies </Text>
                    </Pressable>

                </View>

                <CustomPicker
                    label="Previous surgeries"
                    IconName="scissors-cutting"
                    selOption={selectedSurgeries}
                    setSelOption={setSelectedSurgeries}
                    opt={Surgeries.map(surgery => ({ label: surgery.surgeries_name, value: surgery.surgeries_id }))}
                />

                <CustomButton
                    text={isPressed ? 'Submitting...' : 'Submit'}
                    onPress={onSubmitPressed}
                />


            </View>
        </ScrollView>

    );
};

export default EditPregnancyInfoScreen;

