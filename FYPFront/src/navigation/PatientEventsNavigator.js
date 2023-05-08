import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PatientEventsScreen from '../screens/PatientEventsScreen';
import AddAppointmentScreen from '../screens/AddAppointmentScreen';
const Stack = createStackNavigator();

const PatientEventsNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="PatientEvents"
                component={PatientEventsScreen}
            />
            <Stack.Screen
                name="AddAppointment"
                component={AddAppointmentScreen}
            />

        </Stack.Navigator>
    );
};

export default PatientEventsNavigator;
