import React from 'react';
import CheckMeasurementScreen from '../screens/CheckMeasurementScreen';
import PatientMeasurementScreen from '../screens/PatientMeasurementScreen';
import CheckHRandBPScreen from '../screens/CheckHRandBPScreen';
import CheckTemperatureScreen from '../screens/CheckTemperatureScreen';
import CheckBloodGlucoseScreen from '../screens/CheckBloodGlucoseScreen';
import CheckSPO2Screen from '../screens/CheckSPO2Screen';
import CheckWeightScreen from '../screens/CheckWeightScreen';
import GraphScreen from '../screens/GraphScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const CheckMeasurementNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name='CheckMeasurements'
                component={CheckMeasurementScreen}
            />

            <Stack.Screen
                name='PatientMeasurements'
                component={PatientMeasurementScreen}
            />

            <Stack.Screen
                name='CheckHRandBP'
                component={CheckHRandBPScreen}
            />

            <Stack.Screen
                name='CheckTemperature'
                component={CheckTemperatureScreen}
            />

            <Stack.Screen
                name='CheckBloodGlucose'
                component={CheckBloodGlucoseScreen}
            />

            <Stack.Screen
                name='CheckSPO2'
                component={CheckSPO2Screen}
            />

            <Stack.Screen
                name='CheckWeight'
                component={CheckWeightScreen}
            />

            <Stack.Screen
                name='Graph'
                component={GraphScreen}
            />
        </Stack.Navigator>
    )
}

export default CheckMeasurementNavigator