import React from 'react';
import DoctorChatNavigator from './DoctorChatNavigator';
import DoctorEventsScreen from '../screens/DoctorEventsScreen';
import DoctorAvailabilityNavigator from './DoctorAvailabilityNavigator';
import DoctorProfileNavigator from './DoctorProfileNavigator';
import CheckMeasurementNavigator from './CheckMeasurementNavigator';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const DoctorNavigator = (props) => {

    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#651B70', tabBarHideOnKeyboard: true }}>
            <Tab.Screen
                name='Check Patient'
                component={CheckMeasurementNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="ruler" size={25} color={color} />
                    )
                }}
            />


            <Tab.Screen
                name='Contact Patient'
                component={DoctorChatNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="message-processing-outline" size={25} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name='Events'
                component={DoctorEventsScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="calendar-blank-multiple" size={25} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name='Availability'
                component={DoctorAvailabilityNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="calendar-clock-outline" size={25} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name='Profile'
                component={DoctorProfileNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="account-outline" size={25} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default DoctorNavigator;
