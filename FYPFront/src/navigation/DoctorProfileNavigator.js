import React from 'react';

import DoctorProfileScreen from '../screens/DoctorProfileScreen';
import EditDoctorScreen from '../screens/EditDoctorScreen';
import EditGeneralInfoScreen from '../screens/EditGeneralInfoScreen';
import EditDoctorInfoScreen from '../screens/EditDoctorInfoScreen';
import EditDoctorLocationScreen from '../screens/EditDoctorLocationScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const DoctorProfileNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name='DoctorProfile'
                component={DoctorProfileScreen}
            />

            <Stack.Screen
                name='EditDoctor'
                component={EditDoctorScreen}
            />

            <Stack.Screen
                name='EditGeneral'
                component={EditGeneralInfoScreen}
            />

            <Stack.Screen
                name='EditDoctorInfo'
                component={EditDoctorInfoScreen}
            />

            <Stack.Screen
                name='EditLocation'
                component={EditDoctorLocationScreen}
            />
        </Stack.Navigator>
    )
}

export default DoctorProfileNavigator