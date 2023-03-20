import React, {useState} from "react";
import { Text, View } from "react-native";

import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import {useNavigation} from '@react-navigation/native';

const DoctorInformationScreen =() =>{
    const [speciality, setSpeciality] = useState('');
    const [gender, setGender] = useState('Select your gender');
    const [oop, setOop] = useState('');

    const [doctorInfoStatus, setDoctorInfoStatus] = useState("");

    const optionsGender = [
        { label: 'Select your gender', value:''},
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' }
    ];

    const navigation = useNavigation();

    // const postDataUsingAsyncAwait = async () => {
    //     try {
    //       await axios.post(
    //         '127.0.0.1:3000/login', JSON.stringify({'email': email, 'password': password, 'checked':checked})
    //       )
    //       .then(function (response){

    //         if(response.data.message){
    //             setDoctorInfoStatus(response.data.message);
    //         }
    //         else{
    //             navigation.navigate("SignIn");
    //         }
    //       })
    //     } catch (error) {
    //       // handle error
    //       //alert(error.message);
    //       alert("test test");
    //     }
    //   };

    const onSubmitPressed = () => {
        //postDataUsingAsyncAwait()
        navigation.navigate("DoctorClinic");
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
                value={oop}
                setValue={setOop}
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

