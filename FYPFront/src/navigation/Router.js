import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignNavigator from './SignNavigator';
import PatientNavigator from './PatientNavigator';
import DoctorNavigator from './DoctorNavigator';

const Stack = createStackNavigator();

const Router = (props) => {
    
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{headerShown:false}}>

            <Stack.Screen
                    name='Sign'
                    component={SignNavigator}
                />

                <Stack.Screen
                name='Doctor'
                component={DoctorNavigator}
                />

                <Stack.Screen
                    name='Patient'
                    component={PatientNavigator}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Router;