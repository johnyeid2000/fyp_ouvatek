import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from "react-native";
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const EditDoctorInfoScreen = () => {

    const [speciality, setSpeciality] = useState('');
    const [gender, setGender] = useState(null);
    const [oopnum, setOopnum] = useState('');

    const [exp, setExp] = useState([]);
    const [experience, setExperience] = useState(null);

    const [biography, setBiography] = useState('');

    const [editStatus, setEditStatus] = useState(null);
    const [specificData, setSpecificData] = useState('');


    const optionsGender = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Prefer not to say', value: 'Prefer not to say' }
    ];

    useEffect(() => {
        axios.get('https://ouvatek.herokuapp.com/api/experience')
            .then(response => {
                setExp(response.data.rows);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

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
            setSpeciality(response.data.specificData.speciality);
            setOopnum(response.data.specificData.oop_number);
            setGender(response.data.specificData.gender);
            setExperience(response.data.specificData.exp_years);
            setBiography(response.data.specificData.biography);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);


    const editUser = async () => {
        try {
            const response = await axios.post('https://ouvatek.herokuapp.com/api/editdoctor',
                { token, speciality, oopnum, gender, experience, biography },
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            );
            if (response.status === 200) {
                navigation.navigate('EditDoctor');
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
                <Text style={styles.title}>Edit Your information</Text>

                <Text style={styles.error}>{editStatus}</Text>

                <CustomInput
                    label="Speciality"
                    IconName="certificate-outline"
                    placeholder="Enter Your Speciality"
                    value={speciality}
                    setValue={setSpeciality}
                />

                <CustomInput
                    label="OOP number"
                    IconName="doctor"
                    placeholder="Enter Your OOP number"
                    value={oopnum}
                    setValue={setOopnum}
                    keyType="phone-pad"
                />

                <CustomPicker
                    label="Gender"
                    IconName="gender-male-female"
                    selOption={gender}
                    setSelOption={setGender}
                    opt={optionsGender}
                />

                <CustomPicker
                    label="Years of experience"
                    IconName="timelapse"
                    selOption={experience}
                    setSelOption={setExperience}
                    opt={exp.map(e => ({ label: e.exp_years, value: e.exp_id }))}
                />

                <CustomInput
                    label="Biography"
                    IconName="book-outline"
                    placeholder="Enter Your Biography"
                    value={biography}
                    setValue={setBiography}
                    customStyle={{ height: 300, textAlignVertical: "top" }}
                    customStyleIcon={{ height: 300, textAlignVertical: "top", marginTop: 15 }}
                />


                <CustomButton
                    text="Submit"
                    onPress={onSubmitPressed}
                />
            </View>
        </ScrollView>
    );
};

export default EditDoctorInfoScreen;

