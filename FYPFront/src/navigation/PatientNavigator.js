import React from 'react';

import MeasurementScreen from '../screens/MeasurementScreen';
import PatientContactScreen from '../screens/PatientContactScreen';
//import EditPatientScreen from '../screens/EditPatientScreen';
//import PatientProfileScreen from '../screens/PatientProfileScreen';
import DevicesScreen from '../screens/DevicesScreen';
import EventsScreen from '../screens/EventsScreen';

import PatientProfileNavigator from '../navigation/PatientProfileNavigator';

import  Icon  from "react-native-vector-icons/MaterialCommunityIcons";


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab=createBottomTabNavigator();


const PatientNavigator = (props) => {
    
    return (
        <Tab.Navigator screenOptions={{headerShown:false, tabBarActiveTintColor:'#651B70'}}>
            <Tab.Screen
                name='Measurement'
                component={MeasurementScreen}
                options={{
                    tabBarIcon: ({color}) => (
                    <Icon name="ruler" size={25} color={color} />
                    )
                }}
            />

            
            <Tab.Screen
                name='Contact Doctor'
                component={PatientContactScreen}
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
                name='Devices'
                component={DevicesScreen}
                options={{
                    tabBarIcon: ({color}) => (
                    <Icon name="devices" size={25} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name='Profile'
                component={PatientProfileNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                    <Icon name="account-outline" size={25} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default PatientNavigator;
