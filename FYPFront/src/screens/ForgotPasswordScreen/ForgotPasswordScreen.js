import React, { useState } from "react";
import { Text, View } from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [forgotPassStatus, setForgotPassStatus] = useState(null);
    const [isPressed, setIsPressed] = useState(false);

    const navigation = useNavigation();

    const onSendPressed = async () => {
        setIsPressed(true);
        try {
            const response = await axios.post('https://ouvatek.herokuapp.com/api/forgotpassmail',
                { email },
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            );
            const id = response.data.userId;
            if (response.status === 200) {
                navigation.navigate("ConfirmEmailPassword", { id: id, email: email });
            }
        } catch (error) {
            setForgotPassStatus(error.response.data.message);
        } finally {
            setIsPressed(false);
        }
    };

    return (
        <View style={styles.root}>
            <Text style={styles.title}>Please enter your email</Text>
            <Text style={styles.error}>{forgotPassStatus}</Text>


            <CustomInput
                label="Email"
                IconName='email-outline'
                placeholder="Enter Your Email"
                value={email}
                setValue={setEmail}
            />

            <CustomButton
                text={isPressed ? 'Sending...' : 'Send'}
                onPress={onSendPressed}
            />

        </View>
    );
};


export default ForgotPasswordScreen

