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
    //             { glucose },
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 },
    //             },
    //         );
    //         if (response.status === 200) {
    //             navigation.navigate('Measurement');
    //         }
    //     } catch (error) {
    //         setError(error.response.data.message);
    //     }
    // };

    const onSubmitPressed = () => {
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

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                        // if (!glucose.trim()) {
                        //     Alert.alert('You need to enter the Blood Glucose value');
                        //     setChecked(false);
                        // }
                    }}
                    color='#651B70'
                />
                <Text > Check Values</Text>
            </View>

            <View style={styles.btnContainer}>
                <CustomButton
                    text="See Graph"
                    onPress={onSeeGraphPressed}
                    type='Teritiary'
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
