import React, {useState} from "react";
import { Text, View } from "react-native";
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import {useNavigation} from '@react-navigation/native';


const SignUpScreen =() =>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const navigation = useNavigation();

    const onRegisterPressed = () => {
        navigation.navigate("ConfirmEmail");
    };

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    return(
        <View style={styles.root}>
            <Text style={styles.title}>Create an account</Text>

            <CustomInput
                placeholder="Username"
                value={username}
                setValue={setUsername}
            />

            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
            />

            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry
            />

            <CustomInput
                placeholder="Repeat Password"
                value={passwordRepeat}
                setValue={setPasswordRepeat}
                secureTextEntry
            />

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
    );
};



export default SignUpScreen 

