import React from 'react';
import ChatNavigator from './ChatNavigator';
import DevicesScreen from '../screens/DevicesScreen';
import PatientEventsNavigator from './PatientEventsNavigator';
import PatientProfileNavigator from './PatientProfileNavigator';
import MeasurementNavigator from './MeasurementNavigator';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const PatientNavigator = (props) => {

    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#651B70', tabBarHideOnKeyboard: true }}>
            <Tab.Screen
                name='Measurements'
                component={MeasurementNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="ruler" size={25} color={color} />
                    )
                }}
            />


            <Tab.Screen
                name='Chats'
                component={ChatNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="message-processing-outline" size={25} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name='Events'
                component={PatientEventsNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="calendar-blank-multiple" size={25} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name='Devices'
                component={DevicesScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="devices" size={25} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name='Profile'
                component={PatientProfileNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="account-outline" size={25} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default PatientNavigator;
