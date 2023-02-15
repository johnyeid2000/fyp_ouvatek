import React, {useState} from "react";
import { Text, View, ScrollView } from "react-native";
import { RadioButton } from 'react-native-paper';

import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import {useNavigation} from '@react-navigation/native';


const SignUpScreen =() =>{
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNb, setPhoneNb] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [checked, setChecked] = useState('');

    const navigation = useNavigation();

    const onRegisterPressed = () => {
        navigation.navigate("ConfirmEmail");
    };

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Create an account</Text>

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

            <CustomInput
                label="Phone Number"
                IconName="phone-outline"
                placeholder="Enter Your phone number"
                value={phoneNb}
                setValue={setPhoneNb}
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
                placeholder="Confirm Your Password"
                value={passwordRepeat}
                setValue={setPasswordRepeat}
                secureTextEntry
            />

            <View style={{flexDirection:'row'}}>
                <RadioButton.Item 
                    label="Doctor" 
                    value="doctor" 
                    status={ checked === 'doctor' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('doctor')}
                    color='#651B70'
                    />
                <RadioButton.Item 
                    label="Patient" 
                    value="patient"
                    status={ checked === 'patient' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('patient')} 
                    color='#651B70'
                    />
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

