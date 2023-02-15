import React, {useState} from "react";
import { Text, View } from "react-native";

import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import {useNavigation} from '@react-navigation/native';

const DoctorInformationScreen =() =>{
    const [hospital, setHospital] = useState('');
    const [country, setCountry] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [gender, setGender] = useState('');

    const navigation = useNavigation();

    const onSubmitPressed = () => {
        navigation.navigate("SignIn");
    };

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    return(
        <View style={styles.root}>
            <Text style={styles.title}>Please fill all the information to complete your file</Text>
            <CustomInput
                label="Country"
                IconName="map-marker-radius"
                placeholder="Enter Your City-Country"
                value={country}
                setValue={setCountry}
            />

            <CustomInput
                label="Hospital"
                IconName="hospital-building"
                placeholder="Enter the hospital your are working in"
                value={hospital}
                setValue={setHospital}
            />
            
            <CustomInput
                label="Speciality"
                IconName="certificate-outline"
                placeholder="Enter Your Speciality"
                value={speciality}
                setValue={setSpeciality}
            />

            <CustomInput
                label="Gender"
                IconName="gender-male-female"
                placeholder="Enter Your Gender"
                value={gender}
                setValue={setGender}
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
    );
};



export default DoctorInformationScreen 

