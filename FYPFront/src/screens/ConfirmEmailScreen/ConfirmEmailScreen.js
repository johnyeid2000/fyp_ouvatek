import React, {useState} from "react";
import { Text, View } from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import {useNavigation} from '@react-navigation/native';

const ConfirmEmailScreen =() =>{
    const [code, setCode] = useState('');

    const navigation = useNavigation();

    const onConfirmPressed = () => {
        navigation.navigate("DoctorInfo");
        //navigation.navigate("Patient");
        //navigation.navigate("Doctor");
    };

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    const onResendPressed = () => {
        console.warn("Resend ");
    };

    return(
        <View style={styles.root}>
            <Text style={styles.title}>Confirm your account</Text>

            <CustomInput
                label="Confirmation Code"
                IconName="key-outline"
                placeholder="Enter Confirmation Code"
                value={code}
                setValue={setCode}
            />

            <CustomButton
                text="Confirm"
                onPress={onConfirmPressed}
            />

            <CustomButton
                text="Resend Code"
                onPress={onResendPressed}
                type='Secondary'
            />

            <CustomButton
                text="Back to Sign In"
                onPress={onSignInPressed}
                type='Teritiary'
            />
        </View>
    );
};



export default ConfirmEmailScreen 

