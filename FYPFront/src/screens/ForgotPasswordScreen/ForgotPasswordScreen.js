import React, {useState} from "react";
import { Text, View } from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import {useNavigation} from '@react-navigation/native';

const ForgotPasswordScreen =() =>{
    const [email, setEmail] = useState('');

    const navigation = useNavigation();

    const onSendPressed = () => {
        navigation.navigate("NewPassword");
    };

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    return(
        <View style={styles.root}>
            <Text style={styles.title}>Reset your password</Text>

            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
            />

            <CustomButton
                text="Send"
                onPress={onSendPressed}
            />

            <CustomButton
                text="Back to Sign In"
                onPress={onSignInPressed}
                type='Teritiary'
            />
        </View>
    );
};


export default ForgotPasswordScreen 

