import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Checkbox } from 'react-native-paper';

import CustomButton from "../../components/CustomButton/CustomButton";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from './styles';

import { useNavigation } from '@react-navigation/native';

const TemperatureScreen = () => {

    const navigation = useNavigation();

    const onSeeGraphPressed = () => {
        navigation.navigate('Graph');
    };

    const onSubmitPressed = () => {
        console.warn('submit pressed');
    };

    const [temperature, setTemperature] = useState('');

    const [checked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon
                    name="thermometer"
                    style={styles.icon}
                />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.txtTitle}>Please Enter Your Temperature</Text>
                <Icon
                    name='help-circle-outline'
                    style={styles.helpIcon}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={setTemperature}
                    value={temperature}
                    placeholder="37"
                    keyboardType="numeric"
                    style={styles.input}
                />
                <Text style={styles.txt}>°C</Text>
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                        if (!temperature.trim()) {
                            Alert.alert('You need to enter the temperature value');
                            setChecked(false);
                        }
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

export default TemperatureScreen;
