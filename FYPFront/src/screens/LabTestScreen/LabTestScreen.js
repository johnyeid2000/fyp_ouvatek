import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Checkbox } from 'react-native-paper';


import CustomButton from "../../components/CustomButton/CustomButton";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from './styles';

import { useNavigation } from '@react-navigation/native';

const LabTestScreen = () => {

    const navigation = useNavigation();

    const onSubmitPressed = () => {
        console.warn('submit pressed');
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon
                    name="test-tube"
                    style={styles.icon}
                />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.txtTitle}>Please Enter Your Lab Test Picture</Text>
                <Icon
                    name='help-circle-outline'
                    style={styles.helpIcon}
                />
            </View>

            <CustomButton
                text="Submit"
                onPress={onSubmitPressed}
            />
            <CustomButton
                text="Go back"
                onPress={() => navigation.goBack()}
                type='Teritiary'
            />

        </View>
    );
};

export default LabTestScreen;
