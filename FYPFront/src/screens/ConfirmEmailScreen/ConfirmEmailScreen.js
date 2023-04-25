import React, { useState, useEffect } from "react";
import { Text, View, BackHandler } from "react-native";
import axios from "axios";

import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";

import styles from './styles';

import { useNavigation } from '@react-navigation/native';

const ConfirmEmailScreen = ({ route }) => {
    const [code, setCode] = useState('');
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [confirmEmailStatus, setConfirmEmailStatus] = useState(null);
    const [isPressed, setIsPressed] = useState(false);

    const { id } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        // Call the sendconfirmation endpoint when the component is loaded
        axios.post('https://ouvatek.herokuapp.com/api/sendconfirmation', { id })
            .then((response) => {
                setIsResendDisabled(true);

                setTimeout(() => {
                    setIsResendDisabled(false);
                }, 180000);

            })
            .catch((error) => {
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


    const onConfirmPressed = async () => {
        setIsPressed(true);
        try {
            const response = await axios.post('https://ouvatek.herokuapp.com/api/sendcode', { id, code },
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            );
            if (response.status === 200) {
                navigation.navigate("SignIn");
            }
        } catch (error) {
            setConfirmEmailStatus(error.response.data.message);
        } finally {
            setIsPressed(false);
        }
    };

    const onResendPressed = () => {
        // Call the sendconfirmation endpoint again to resend the confirmation code
        axios.post('https://ouvatek.herokuapp.com/api/sendconfirmation', { id })
            .then((response) => {
                setIsResendDisabled(true);
                // Set the resend button as enabled after 3 minutes
                setTimeout(() => setIsResendDisabled(false), 180000);
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
                keyType="phone-pad"
            />

            <CustomButton
                text={isPressed ? 'Confirming...' : 'Confirm'}
                onPress={onConfirmPressed}
            />

            <CustomButton
                text="Resend Code"
                onPress={onResendPressed}
                type='Secondary'
                disabled={isResendDisabled}
            />

        </View>
    );
};

export default ConfirmEmailScreen;
