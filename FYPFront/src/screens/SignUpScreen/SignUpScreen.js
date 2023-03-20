import React, {useState} from "react";
import { Text, View, ScrollView } from "react-native";
import { Checkbox } from 'react-native-paper';

import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';
//import axios from 'axios';
import {useNavigation} from '@react-navigation/native';


const SignUpScreen =() =>{
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState(''); 
    const [email, setEmail] = useState('');
    // const [country, setCountry] = useState([]);
    const [country, setCountry] = useState('option1c');
    //const [optionsCountries, setOptionsCountries] = useState([]);
    const [phoneNb, setPhoneNb] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [singnupStatus, setSignupStatus] = useState("");
    const [checked, setChecked] = useState(false);

    const optionsCountry = [
        { label: 'Option 1', value: 'option1c' },
        { label: 'Option 2', value: 'option2c' },
        { label: 'Option 3', value: 'option3c' }
    ];

    // (async () => {
    // try {
    //     const response = await axios.get(
    //     'localhost:3000',
    //     );
    //     setOptionsCountries(response.data);
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // })();

    const navigation = useNavigation();

    // const postDataUsingAsyncAwait = async () => {
    //     try {
    //       await axios.post(
    //         '127.0.0.1:3000/login', JSON.stringify({'email': email, 'password': password, 'checked':checked})
    //       )
    //       .then(function (response){

    //         if(response.data.message){
    //             setSignupStatus(response.data.message);
    //         }
    //         else{
    //             navigation.navigate("ConfirmEmail");
    //         }
    //       })
    //     } catch (error) {
    //       // handle error
    //       //alert(error.message);
    //       alert("test test");
    //     }
    //   };

    const onRegisterPressed = () => {
        //postDataUsingAsyncAwait()
        //navigation.navigate("DoctorInfo");
        navigation.navigate("PatientInfo");
        //navigation.navigate("Patient");
        //navigation.navigate("Doctor");
        // navigation.navigate("ConfirmEmail");
    };

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Create an account</Text>

            <Text style={styles.error}>{singnupStatus}</Text>

            <CustomInput
                label="First name"
                IconName="account-outline"
                placeholder="Enter Your First name"
                value={fname}
                setValue={setFname}
            />
            <CustomInput
                label="Last name"
                IconName="account"
                placeholder="Enter Your Last name"
                value={lname}
                setValue={setLname}
            />

            <CustomInput
                label="Email"
                IconName="email-outline"
                placeholder="Enter Your Email"
                value={email}
                setValue={setEmail}
            />

            <CustomPicker
                label="Country"
                IconName="map-marker-radius"
                selOption={country}
                setSelOption={setCountry}
                //opt={optionsCountries}
                opt={optionsCountry}
            />

            <CustomInput
                label="Phone Number"
                IconName="phone-outline"
                placeholder="Enter Your phone number"
                value={phoneNb}
                setValue={setPhoneNb}
                keyType="phone-pad"
            />

            <CustomInput
                label="Password"
                IconName="lock-outline"
                placeholder="Enter Your Password"
                value={password}
                setValue={setPassword}
                secureTextEntry
            />

            <CustomInput
                label="Confirm Password"
                IconName="lock-outline"
                placeholder="Re-enter Your Password"
                value={passwordRepeat}
                setValue={setPasswordRepeat}
                secureTextEntry
            />

            <View style={styles.checkbox}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => { setChecked(!checked); }}
                    color='#651B70'
                />
                <Text> Sign up as a doctor </Text>
            </View>

            <CustomButton
                text="Register"
                onPress={onRegisterPressed}
            />

            <Text style={styles.text}>By registering, you confirm that you accept 
            our Terms of Use and Privacy Policy</Text>

            <CustomButton
                text="Have an account? Sign In"
                onPress={onSignInPressed}
                type='Teritiary'
            />
        </View>
        </ScrollView>
    );
};



export default SignUpScreen 

