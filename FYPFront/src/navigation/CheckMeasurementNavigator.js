import React from 'react';

import CheckMeasurementScreen from '../screens/CheckMeasurementScreen';
import NewRequestScreen from '../screens/NewRequestScreen';
import PatientMeasurementScreen from '../screens/PatientMeasurementScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const CheckMeasurementNavigator=()=>{
    return(
            <Stack.Navigator screenOptions={{headerShown:false}}>

                <Stack.Screen
                    name='CheckMeasurements'
                    component={CheckMeasurementScreen}
                />

                <Stack.Screen
                    name='NewRequest'
                    component={NewRequestScreen}
                />

                <Stack.Screen
                    name='PatientMeasurements'
                    component={PatientMeasurementScreen}
                />
            </Stack.Navigator>
    )
}

export default CheckMeasurementNavigator