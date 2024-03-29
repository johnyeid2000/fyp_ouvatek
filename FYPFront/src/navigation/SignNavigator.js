import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ChangeEmailScreen from '../screens/ChangeEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import ConfirmEmailPasswordScreen from '../screens/ConfirmEmailPasswordScreen';
import PatientNavigator from './PatientNavigator';
import PatientInformationScreen from '../screens/PatientInformationScreen';
import DoctorNavigator from './DoctorNavigator';
import DoctorInformationScreen from '../screens/DoctorInformationScreen';
import DoctorClinic from '../screens/DoctorClinic';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const SignNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Splash'
                component={SplashScreen}
            />

            <Stack.Screen
                name='SignIn'
                component={SignInScreen}
            />

            <Stack.Screen
                name='SignUp'
                component={SignUpScreen}
            />

            <Stack.Screen
                name='ConfirmEmail'
                component={ConfirmEmailScreen}
            />

            <Stack.Screen
                name='ChangeEmail'
                component={ChangeEmailScreen}
            />

            <Stack.Screen
                name='ForgotPassword'
                component={ForgotPasswordScreen}
            />

            <Stack.Screen
                name='ConfirmEmailPassword'
                component={ConfirmEmailPasswordScreen}
            />

            <Stack.Screen
                name='NewPassword'
                component={NewPasswordScreen}
            />

            <Stack.Screen
                name='Patient'
                component={PatientNavigator}
            />

            <Stack.Screen
                name='PatientInfo'
                component={PatientInformationScreen}
            />

            <Stack.Screen
                name='Doctor'
                component={DoctorNavigator}
            />

            <Stack.Screen
                name='DoctorInfo'
                component={DoctorInformationScreen}
            />

            <Stack.Screen
                name='DoctorClinic'
                component={DoctorClinic}
            />
        </Stack.Navigator>
    )
}

export default SignNavigator