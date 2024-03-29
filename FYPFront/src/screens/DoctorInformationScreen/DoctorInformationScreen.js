import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, BackHandler } from "react-native";
import axios from "axios";
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const DoctorInformationScreen = ({ route }) => {
    const [speciality, setSpeciality] = useState('');
    const [gender, setGender] = useState(null);
    const [oopnum, setOopnum] = useState('');
    const [exp, setExp] = useState([]);
    const [experience, setExperience] = useState(null);
    const [biography, setBiography] = useState('');
    const [isPressed, setIsPressed] = useState(false);
    const [doctorInfoStatus, setDoctorInfoStatus] = useState(null);
    const { id } = route.params;
    const navigation = useNavigation();

    const optionsGender = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Prefer not to say', value: 'Prefer not to say' }
    ];

    const optionsSpeciality = [
        { label: 'Gynecologist', value: 'Gynecologist' },
        { label: 'Midwife', value: 'Midwife' },
        { label: 'Psychologist', value: 'Psychologist' },
        { label: 'Psychotherapist', value: 'Psychotherapist' },
        { label: 'Physical education', value: 'Physical education' },
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

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            backHandler.remove();
        };
    }, []);

    const handleBackPress = () => {
        // Return true to prevent default back navigation
        return true;
    };

    const signUpDoctor = async () => {
        setIsPressed(true);
        try {
            const response = await axios.post('https://ouvatek.herokuapp.com/api/doctorsignup',
                { id, speciality, oopnum, gender, experience, biography },
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            );
            const doctorId = response.data.doctorId;
            if (response.status === 200) {
                navigation.navigate("DoctorClinic", { doctorId: doctorId, id: id });
            }
        } catch (error) {
            setDoctorInfoStatus(error.response.data.message);
        } finally {
            setIsPressed(false);
        }
    };

    const onSubmitPressed = () => {
        signUpDoctor();
    };

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    return (
        <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.root}>
                <Text style={styles.title}>Please fill all the information to complete your file</Text>
                <Text style={styles.error}>{doctorInfoStatus}</Text>
                <CustomPicker
                    label="Speciality"
                    IconName="certificate-outline"
                    selOption={speciality}
                    setSelOption={setSpeciality}
                    opt={optionsSpeciality}
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
                    multiline={true}
                />


                <CustomButton
                    text={isPressed ? 'Submitting...' : 'Submit'}
                    onPress={onSubmitPressed}
                />

                <CustomButton
                    text="Have an account? Sign In"
                    onPress={onSignInPressed}
                    type='Teritiary'
                />
            </View>
        </ScrollView>
    );
};



export default DoctorInformationScreen

