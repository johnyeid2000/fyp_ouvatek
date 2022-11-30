import React from 'react';

import DoctorProfileScreen from '../screens/DoctorProfileScreen';
import EditDoctorScreen from '../screens/EditDoctorScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const DoctorProfileNavigator=()=>{
    return(
            <Stack.Navigator screenOptions={{headerShown:false}}>

                <Stack.Screen
                    name='DoctorProfile'
                    component={DoctorProfileScreen}
                />

                <Stack.Screen
                    name='EditDoctor'
                    component={EditDoctorScreen}
                />
            </Stack.Navigator>
    )
}

export default DoctorProfileNavigator