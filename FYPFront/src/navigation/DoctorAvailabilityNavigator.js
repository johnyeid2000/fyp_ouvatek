import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DoctorAvailabilityScreen from '../screens/DoctorAvailabilityScreen';
import AddDoctorAvailabilityScreen from '../screens/AddDoctorAvailabilityScreen';
const Stack = createStackNavigator();

const DoctorAvailabilityNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="DoctorAvailability"
                component={DoctorAvailabilityScreen}
            />
            <Stack.Screen
                name='AddAvailability'
                component={AddDoctorAvailabilityScreen}
            />

        </Stack.Navigator>
    );
};

export default DoctorAvailabilityNavigator;
