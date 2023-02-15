import React, {useState} from "react";
import { Text, View , Image, useWindowDimensions} from "react-native";
import { Checkbox } from 'react-native-paper';

import Logo from '../../assets/images/OuvatekLogo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import {useNavigation} from '@react-navigation/native';

const SignInScreen =() =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [checked, setChecked] = useState(false);

    const {height} = useWindowDimensions();

    const navigation = useNavigation();
    
    const postDataUsingAsyncAwait = async () => {
        try {
          await axios.post(
            '127.0.0.1:3000/login', JSON.stringify({'email': email, 'password': password})
          )
          .then(function (response){
            console.log(response.status);                        
          })
        } catch (error) {
          // handle error
          alert(error.message);
        }
      };

    const onSignInPressed = () => {
        postDataUsingAsyncAwait()
        //navigation.navigate('Patient');
        //navigation.navigate("Doctor");
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

            <View style={{flexDirection:'row', alignItems:'center', marginTop:5, marginLeft:"-50%"}}>
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



