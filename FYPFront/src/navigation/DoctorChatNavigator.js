import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DoctorContactScreen from '../screens/DoctorContactScreen';
import NewRequestScreen from '../screens/NewRequestScreen';
import CheckPatientInformationScreen from '../screens/CheckPatientInformationScreen';
const Stack = createStackNavigator();

const DoctorChatNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="ChatsD"
                component={DoctorContactScreen}
            />
            <Stack.Screen
                name='NewRequest'
                component={NewRequestScreen}
            />

            <Stack.Screen
                name='CheckPatientInfo'
                component={CheckPatientInformationScreen}
            />
        </Stack.Navigator>
    );
};

export default DoctorChatNavigator;
