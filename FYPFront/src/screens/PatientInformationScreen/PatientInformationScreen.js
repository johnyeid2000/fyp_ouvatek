import React, {useState} from "react";
import { Text, View, ScrollView } from "react-native";

import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import {useNavigation} from '@react-navigation/native';

const PatientInformationScreen =() =>{
    const [BDay, setBDay] = useState('');
    const [BloodType, setBloodType] = useState('');
    const [PregDay, setPregDay] = useState('');
    const [Medication, setMedication] = useState('');
    const [Diabetes, setDiabetes] = useState('');
    const [Hypertension, setHypertension] = useState('');
    const [Surgeries, setSurgeries] = useState('');
    const [PrevPreg, setPrevPreg] = useState('');

    const navigation = useNavigation();

    const onSubmitPressed = () => {
        navigation.navigate("SignIn");
    };

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Please fill all the information to complete your file</Text>
            <CustomInput
                label="Birth Date"
                IconName="calendar"
                placeholder="Enter Your Birth Date"
                value={BDay}
                setValue={setBDay}
            />

            <CustomInput
                label="Blood Type"
                IconName="blood-bag"
                placeholder="Enter your blood type"
                value={BloodType}
                setValue={setBloodType}
            />
            
            <CustomInput
                label="First Pregnancy Day"
                IconName="calendar-heart"
                placeholder="Enter Your first day of pregnancy"
                value={PregDay}
                setValue={setPregDay}
            />

            <CustomInput
                label="Medication"
                IconName="medical-bag"
                placeholder="Enter Your medication"
                value={Medication}
                setValue={setMedication}
            />

            <CustomInput
                label="Diabetes"
                IconName="diabetes"
                placeholder="Are you diabetic?"
                value={Diabetes}
                setValue={setDiabetes}
            />

            <CustomInput
                label="Hypertension"
                IconName="water"
                placeholder="Are you hypertensive?"
                value={Hypertension}
                setValue={setHypertension}
            />

            <CustomInput
                label="Previous surgeries"
                IconName="scissors-cutting"
                placeholder="Do you have previous surgeries?"
                value={Surgeries}
                setValue={setSurgeries}
            />

            <CustomInput
                label="Previous Pregnancies"
                IconName="human-pregnant"
                placeholder="Do you have previous pregnancies?"
                value={PrevPreg}
                setValue={setPrevPreg}
            />

            <CustomButton
                text="Submit"
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



export default PatientInformationScreen 

