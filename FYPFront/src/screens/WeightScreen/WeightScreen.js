import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Checkbox } from 'react-native-paper';
import CustomButton from "../../components/CustomButton/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './styles';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const WeightScreen = () => {

    const navigation = useNavigation();
    const [weight, setWeight] = useState('');
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(null);

    // const addWeight = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('token');
    //         const response = await axios.post('https://ouvatek.herokuapp.com/api/...',
    //             {checked,  weight },
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 },
    //             },
    //         );
    //         if (response.status === 200 && checked == true) {
    //             navigation.navigate('Weight');
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
        navigation.navigate('Weight');
        //addWeight();
    };

    const onSubmitPressed = () => {
        setChecked(false);
        navigation.navigate('Measurement');
        //addWeight();
    };

    const onSeeGraphPressed = () => {
        navigation.navigate('Graph');
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon
                    name="scale-bathroom"
                    style={styles.icon}
                />
                <Text style={styles.error}>{error}</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.txtTitle}>Please Enter Your Weight</Text>
                <Icon
                    name='help-circle-outline'
                    style={styles.helpIcon}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="70"
                    keyboardType="numeric"
                    style={styles.input}
                />
                <Text style={styles.txt}>kg</Text>
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

export default WeightScreen;
