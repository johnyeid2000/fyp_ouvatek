import React from 'react';
import PatientProfileScreen from '../screens/PatientProfileScreen';
import EditPatientScreen from '../screens/EditPatientScreen';
import EditGeneralInfoScreen from '../screens/EditGeneralInfoScreen';
import EditPregnancyInfoScreen from '../screens/EditPregnancyInfoScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const PatientProfileNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name='PatientProfile'
                component={PatientProfileScreen}
            />

            <Stack.Screen
                name='EditPatient'
                component={EditPatientScreen}
            />

            <Stack.Screen
                name='EditGeneral'
                component={EditGeneralInfoScreen}
            />

            <Stack.Screen
                name='EditPregnancy'
                component={EditPregnancyInfoScreen}
            />
        </Stack.Navigator>
    )
}

export default PatientProfileNavigator