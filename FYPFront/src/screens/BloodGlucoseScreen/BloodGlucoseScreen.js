import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Checkbox } from 'react-native-paper';
import CustomButton from "../../components/CustomButton/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './styles';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const BloodGlucoseScreen = () => {

    const navigation = useNavigation();
    const [glucose, setGlucose] = useState('');
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(null);

    // const addBloodGlucose = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('token');
    //         const response = await axios.post('https://ouvatek.herokuapp.com/api/...',
    //             {checked,  glucose },
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 },
    //             },
    //         );
    //         if (response.status === 200 && checked == true) {
    //             navigation.navigate('BloodGlucose');
    //         }
    //         else if (response.status === 200 && checked == false) {
    //             navigation.navigate('Measurement');
    //         }
    //     } catch (error) {
    //         setError(error.response.data.message);
    //     }
    // };

    const onCheckValuePressed = () => {
        setChecked(true);
        navigation.navigate('BloodGlucose');
        //addBloodGlucose();
    };

    const onSubmitPressed = () => {
        setChecked(false);
        navigation.navigate('Measurement');
        //addBloodGlucose();
    };

    const onSeeGraphPressed = () => {
        navigation.navigate('Graph');
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon
                    name="diabetes"
                    style={styles.icon}
                />
                <Text style={styles.error}>{error}</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.txtTitle}>Please Enter Your Blood Glucose Value</Text>
                <Icon
                    name='help-circle-outline'
                    style={styles.helpIcon}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={setGlucose}
                    value={glucose}
                    placeholder="100"
                    keyboardType="numeric"
                    style={styles.input}
                />
                <Text style={styles.txt}>mg/dL</Text>
            </View>

            <View style={styles.btnContainer}>
                <CustomButton
                    text="Check Values"
                    onPress={onCheckValuePressed}
                    type='Teritiary'
                />
            </View>

            <View style={styles.btnContainer}>
                <CustomButton
                    text="See Graph"
                    onPress={onSeeGraphPressed}
                    type='Secondary'
                />
            </View>
            <CustomButton
                text="Submit"
                onPress={onSubmitPressed}
            />


        </View>
    );
};

export default BloodGlucoseScreen;
