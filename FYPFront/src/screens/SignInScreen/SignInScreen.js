import React, {useState, useEffect} from "react";
import { Text, View , Image, useWindowDimensions,  BackHandler, Alert } from "react-native";
import { Checkbox } from 'react-native-paper';

import axios from 'axios';

import Logo from '../../assets/images/OuvatekLogo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import {useNavigation} from '@react-navigation/native';

const SignInScreen =() =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);

    const [loginStatus, setLoginStatus] = useState(null);

    const {height} = useWindowDimensions();

    const navigation = useNavigation();

const loginUser = async () => {
  try {
    const response = await axios.post('https://ouvatek.herokuapp.com/api/login', {email, password, checked},
        {
            headers: {'Content-Type': 'application/json'},
        },
    );
    if(response.status===200 && !checked){
        navigation.navigate("Patient");
    }
   else if(response.status===200 && checked){
    navigation.navigate("Doctor");
   }
  } catch (error) {
    setLoginStatus(error.response.data.message);
  }
};

    const onSignInPressed = () => {
        loginUser();
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate("ForgotPassword");
    };

    const onSignUpPressed = () =>{
        navigation.navigate("SignUp"); 
    };

useEffect(() => {
    const handleBackPress = () => {
      // Check if the user is on the sign-in screen
      if (navigation.isFocused()) {
        // Show a confirmation dialog when the user presses the back button
        Alert.alert(
          'Are you sure you want to exit?',
          '',
          [
            { text: 'Cancel', onPress: () => false, style: 'cancel' },
            { text: 'OK', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );

        // Prevent going back to the previous screen
        return true;
      }

      // Allow going back to the previous screen
      return false;
    };

    // Add the event listener
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Remove the event listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [navigation]);

    return(
        <View style={styles.root}>
            <Image 
            source={Logo} 
            style={[styles.logo, {height:height*0.3}]} 
            resizeMode='contain'
            />

            <Text style={styles.error}>{loginStatus}</Text>
            
            <CustomInput
                label="Email"
                IconName="account-outline"
                placeholder="Enter Your Email"
                value={email}
                setValue={setEmail}
            />

            <CustomInput
                label="Password"
                IconName="lock-outline"
                placeholder="Enter Your Password"
                value={password}
                setValue={setPassword}
                secureTextEntry
            />

            <View style={styles.checkbox}>
        <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => { setChecked(!checked); }}
            color='#651B70'
        />
    <Text> Sign in as a doctor </Text>
      </View>

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



