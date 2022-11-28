import React from 'react';

import CheckMeasurementScreen from '../screens/CheckMeasurementScreen';
import DoctorContactScreen from '../screens/DoctorContactScreen';
import DoctorProfileScreen from '../screens/DoctorProfileScreen';
import EventsScreen from '../screens/EventsScreen';


import  Icon  from "react-native-vector-icons/MaterialCommunityIcons";


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab=createBottomTabNavigator();


const DoctorNavigator = (props) => {
    
    return (
        <Tab.Navigator screenOptions={{headerShown:false, tabBarActiveTintColor:'#651B70'}}>
            <Tab.Screen
                name='Check Patient'
                component={CheckMeasurementScreen}
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
                component={DoctorProfileScreen}
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