import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import axios from "axios";

import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";

import styles from './styles';

import { useNavigation } from '@react-navigation/native';

const ConfirmEmailScreen = ({ route }) => {
    const [code, setCode] = useState('');
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [confirmEmailStatus, setConfirmEmailStatus] = useState(null);
    const { id } = route.params;
    console.log(id);
    const navigation = useNavigation();

    useEffect(() => {
        // Call the sendconfirmation endpoint when the component is loaded
        axios.post('https://ouvatek.herokuapp.com/api/sendconfirmation', { id })
            .then((response) => {
                // Set the resend button as enabled after 3 minutes
                setTimeout(() => setIsResendDisabled(false), 3 * 60 * 1000);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const onConfirmPressed = async () => {
        try {
            const response = await axios.post('https://ouvatek.herokuapp.com/api/sendcode', { id, code },
                {
                    headers: {'Content-Type': 'application/json'},
                },
            );
            if(response.status===200 ){
                navigation.navigate("SignIn");
            }
        }catch (error) {
            setConfirmEmailStatus(error.response.data.message);
        }
    };

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    const onResendPressed = () => {
        setIsResendDisabled(true);
        // Call the sendconfirmation endpoint again to resend the confirmation code
        axios.post('https://ouvatek.herokuapp.com/api/sendconfirmation', { id })
            .then((response) => {
                // Set the resend button as enabled after 3 minutes
                setTimeout(() => setIsResendDisabled(false), 3 * 60 * 1000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View style={styles.root}>
            <Text style={styles.title}>Confirm your account</Text>
            <Text style={styles.error}>{confirmEmailStatus}</Text>

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
                disabled={isResendDisabled}
            />

            <CustomButton
                text="Back to Sign In"
                onPress={onSignInPressed}
                type='Teritiary'
            />
        </View>
    );
};

export default ConfirmEmailScreen;
