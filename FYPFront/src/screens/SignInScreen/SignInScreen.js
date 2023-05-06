import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, Image, useWindowDimensions, BackHandler, Alert, Pressable } from "react-native";
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const loginUser = async () => {
    setIsPressed(true);
    try {
      const response = await axios.post('https://ouvatek.herokuapp.com/api/login', { email, password, checked },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (response.status === 200) {
        const token = response.data.token;
        await AsyncStorage.setItem('token', token);
        setEmail('');
        setPassword('');
        setChecked(false);
        setLoginStatus('');
        if (checked) {
          navigation.navigate('Doctor');
        } else {
          navigation.navigate('Patient');
        }
      }
    } catch (error) {
      setLoginStatus(error.response.data.message);
    } finally {
      setIsPressed(false);
    }
  };

  const onSignInPressed = () => {
    loginUser();
  };

  const onForgotPasswordPressed = () => {
    setEmail('');
    setPassword('');
    setChecked(false);
    setLoginStatus('');
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPressed = () => {
    setEmail('');
    setPassword('');
    setChecked(false);
    setLoginStatus('');
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

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={styles.root}>
        <Image
          source={{ uri: 'https://dub01pap003files.storage.live.com/y4msy5Pq6s7gnYTlXL9bRQaz6VL8RA5aQ8Dps8AoCYWQ0MWmnL27n1zvwfRruzURydk0j7dKWBoUBe_W4tqb0Dn7JA8CII5sllB16Hme4uG8DKYixDSbt-t57XlHgGbAVwnxYi2zwE19wuc0DSAbCg2TSkB2LyEWHGl7qrSAW0kIWlMFB1Bfm7LkdSQA3Kxgztk?width=736&height=438&cropmode=none' }}
          style={[styles.logo, { height: height * 0.3 }]}
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
          isPassword
        />

        <Pressable onPress={() => { setChecked(!checked); }} style={styles.checkbox}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            color='#651B70'
          />
          <Text> Sign in as a doctor </Text>
        </Pressable>


        <CustomButton
          text={isPressed ? 'Signing In...' : 'Sign In'}
          onPress={onSignInPressed}
        />

        <View style={styles.btnContainer}>
          <CustomButton
            text="Forgot Password?"
            onPress={onForgotPasswordPressed}
            type='Teritiary'
          />
        </View>

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
          type='Teritiary'
        />
      </View>
    </ScrollView>
  );
};

export default SignInScreen



