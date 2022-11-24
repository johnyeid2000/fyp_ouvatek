import React, {useState} from "react";
import { Text, View , Image, useWindowDimensions} from "react-native";
import Logo from '../../assets/images/OuvatekLogo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import {useNavigation} from '@react-navigation/native';

const SignInScreen =() =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();

    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('Home');
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate("ForgotPassword");
    };

    const onSignUpPressed = () =>{
        navigation.navigate("SignUp"); 
    }

    return(
        <View style={styles.root}>
            <Image 
            source={Logo} 
            style={[styles.logo, {height:height*0.3}]} 
            resizeMode='contain'
            />

            <CustomInput
                label="Username"
                IconName="account-outline"
                placeholder="Enter Your Username"
                value={username}
                setValue={setUsername}
            />

            <CustomInput
                label="Password"
                IconName="lock-outline"
                placeholder="Enter Your Password"
                value={password}
                setValue={setPassword}
                secureTextEntry
            />

            <CustomButton
                text="Sign In"
                onPress={onSignInPressed}
            />

            <CustomButton
                text="Forgot Password?"
                onPress={onForgotPasswordPressed}
                type='Teritiary'
            />

            <CustomButton
                text="Don't have an account? Create one"
                onPress={onSignUpPressed}
                type='Teritiary'
            />
        </View>
    );
};



export default SignInScreen 

