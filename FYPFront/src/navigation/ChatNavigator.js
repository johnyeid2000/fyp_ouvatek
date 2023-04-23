import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PatientContactScreen from '../screens/PatientContactScreen';
import AddDoctorScreen from '../screens/AddDoctorScreen';
import CheckDoctorInformationScreen from '../screens/CheckDoctorInformationScreen';

const Stack = createStackNavigator();

const ChatNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="ChatsP"
                component={PatientContactScreen}
            />
            <Stack.Screen
                name="AddDoctor"
                component={AddDoctorScreen}
            />

            <Stack.Screen
                name="CheckDoctorInfo"
                component={CheckDoctorInformationScreen}
            />
        </Stack.Navigator>
    );
};

export default ChatNavigator;
