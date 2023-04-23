import React from 'react';

//import CheckMeasurementScreen from '../screens/CheckMeasurementScreen';
import DoctorContactScreen from '../screens/DoctorContactScreen';
import EventsScreen from '../screens/EventsScreen';

import DoctorProfileNavigator from './DoctorProfileNavigator';
import CheckMeasurementNavigator from './CheckMeasurementNavigator';

import  Icon  from "react-native-vector-icons/MaterialCommunityIcons";


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab=createBottomTabNavigator();


const DoctorNavigator = (props) => {
    
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#651B70', tabBarHideOnKeyboard: true }}>
            <Tab.Screen
                name='Check Patient'
                component={CheckMeasurementNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                    <Icon name="ruler" size={25} color={color} />
                    )
                }}
            />

            
            <Tab.Screen
                name='Contact Patient'
                component={DoctorContactScreen}
                options={{
                    tabBarIcon: ({color}) => (
                    <Icon name="message-processing-outline" size={25} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name='Events'
                component={EventsScreen}
                options={{
                    tabBarIcon: ({color}) => (
                    <Icon name="calendar-blank-multiple" size={25} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name='Profile'
                component={DoctorProfileNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                    <Icon name="account-outline" size={25} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default DoctorNavigator;
