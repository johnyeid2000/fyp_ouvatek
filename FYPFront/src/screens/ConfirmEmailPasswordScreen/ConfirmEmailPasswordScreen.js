import React, { useState, useEffect } from "react";
import { Text, View, BackHandler } from "react-native";
import axios from "axios";

import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";

import styles from './styles';

import { useNavigation } from '@react-navigation/native';

const ConfirmEmailPasswordScreen = ({ route }) => {
    const [code, setCode] = useState('');
    const [confirmEmailStatus, setConfirmEmailStatus] = useState(null);
    const { id } = route.params;
    const navigation = useNavigation();

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
        try {
            const response = await axios.post('https://ouvatek.herokuapp.com/api/sendcode', { id, code },
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            );
            if (response.status === 200) {
                navigation.navigate("NewPassword", { id: id });
            }
        } catch (error) {
            setConfirmEmailStatus(error.response.data.message);
        }
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
                text="Confirm"
                onPress={onConfirmPressed}
            />

        </View>
    );
};

export default ConfirmEmailPasswordScreen;
