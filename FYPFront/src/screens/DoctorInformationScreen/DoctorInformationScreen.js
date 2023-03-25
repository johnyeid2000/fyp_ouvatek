import React, {useState} from "react";
import { Text, View } from "react-native";
import axios from "axios";

import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import {useNavigation} from '@react-navigation/native';

const DoctorInformationScreen =({route}) =>{
    const [speciality, setSpeciality] = useState('');
    const [gender, setGender] = useState(null);
    const [oopnum, setOopnum] = useState('');

    const [doctorInfoStatus, setDoctorInfoStatus] = useState(null);
    const { id } = route.params;

    const optionsGender = [
        { label: 'Select your gender', value:''},
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' }
    ];

    const navigation = useNavigation();

    const signUpDoctor = async () => {
  try {
    const response = await axios.post('https://ouvatek.herokuapp.com/api/doctorsignup', 
    {id, speciality, oopnum, gender},
        {
            headers: {'Content-Type': 'application/json'},
        },
    );
    const doctorId= response.data.doctorId;
    if(response.status===200 ){
        navigation.navigate("DoctorClinic",{doctorId:doctorId, id:id});
    }
  } catch (error) {
    setDoctorInfoStatus(error.response.data.message);
  }
};

    const onSubmitPressed = () => {
        signUpDoctor();
    };

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    return(
        <View style={styles.root}>
            <Text style={styles.title}>Please fill all the information to complete your file</Text>
            <Text style={styles.error}>{doctorInfoStatus}</Text>
            
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

