import React, { useState, useEffect } from "react";
import { Text, View, BackHandler } from "react-native";
import axios from "axios";
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const ChangeEmailScreen = ({ route }) => {
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState('');
    const [isPressed, setIsPressed] = useState(false);
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

    const onSendPressed = async () => {
        setIsPressed(true);
        try {
            const response = await axios.post('https://ouvatek.herokuapp.com/api/changemail', { id, newMail: newEmail },
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            );
            if (response.status === 200) {
                await axios.post('https://ouvatek.herokuapp.com/api/sendconfirmation', { id })
                navigation.navigate("ConfirmEmail", { id: id });
            }
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setIsPressed(false);
        }
    };

    return (
        <View style={styles.root}>
            <Text style={styles.title}>Change your email</Text>
            <Text style={styles.error}>{error}</Text>

            <CustomInput
                label="New Email"
                IconName="email-outline"
                placeholder="Enter Your New Email"
                value={newEmail}
                setValue={setNewEmail}
            />

            <CustomButton
                text={isPressed ? 'Sending...' : 'Send'}
                onPress={onSendPressed}
            />

        </View>
    );
};

export default ChangeEmailScreen;
