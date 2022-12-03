import React from 'react';

import MeasurementScreen from '../screens/MeasurementScreen';
import HeartRateScreen from '../screens/HeartRateScreen';
import GraphScreen from '../screens/GraphScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MeasurementNavigator=()=>{
    return(
            <Stack.Navigator screenOptions={{headerShown:false}}>

                <Stack.Screen
                    name='MeasurementS'
                    component={MeasurementScreen}
                />

                <Stack.Screen
                    name='HeartRate'
                    component={HeartRateScreen}
                />

                <Stack.Screen
                    name='Graph'
                    component={GraphScreen}
                />
            </Stack.Navigator>
    )
}

export default MeasurementNavigator