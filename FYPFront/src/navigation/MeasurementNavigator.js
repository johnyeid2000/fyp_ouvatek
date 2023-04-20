import React from 'react';

import MeasurementScreen from '../screens/MeasurementScreen';
import HeartRateScreen from '../screens/HeartRateScreen';
import TemperatureScreen from '../screens/TemperatureScreen';
import BloodGlucoseScreen from '../screens/BloodGlucoseScreen';
import LabTestScreen from '../screens/LabTestScreen';
import Spo2Screen from '../screens/Spo2Screen';
import FetusScreen from '../screens/FetusScreen';
import WeightScreen from '../screens/WeightScreen';
import GraphScreen from '../screens/GraphScreen';
import ChooseGraphScreen from '../screens/ChooseGraphScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MeasurementNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name='Measurement'
                component={MeasurementScreen}
            />

            <Stack.Screen
                name='HeartRate'
                component={HeartRateScreen}
            />

            <Stack.Screen
                name='Temperature'
                component={TemperatureScreen}
            />

            <Stack.Screen
                name='BloodGlucose'
                component={BloodGlucoseScreen}
            />

            <Stack.Screen
                name='LabTest'
                component={LabTestScreen}
            />

            <Stack.Screen
                name='Spo2'
                component={Spo2Screen}
            />

            <Stack.Screen
                name='Fetus'
                component={FetusScreen}
            />

            <Stack.Screen
                name='Weight'
                component={WeightScreen}
            />

            <Stack.Screen
                name='Graph'
                component={GraphScreen}
            />

            <Stack.Screen
                name='ChooseGraph'
                component={ChooseGraphScreen}
            />
        </Stack.Navigator>
    )
}

export default MeasurementNavigator