import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Checkbox } from 'react-native-paper';


import CustomButton from "../../components/CustomButton/CustomButton";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from './styles';

import { useNavigation } from '@react-navigation/native';

const Spo2Screen = () => {

    const navigation = useNavigation();

    const onSeeGraphPressed = () => {
        navigation.navigate('Graph');
    };

    const onSubmitPressed = () => {
        console.warn('submit pressed');
    };

    const [spo2, setSpo2] = useState('');

    const [checked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon
                    name="percent-outline"
                    style={styles.icon}
                />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.txtTitle}>Please Enter Your SPO2 value</Text>
                <Icon
                    name='help-circle-outline'
                    style={styles.helpIcon}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={setSpo2}
                    value={spo2}
                    placeholder="95"
                    keyboardType="numeric"
                    style={styles.input}
                />
                <Text style={styles.txt}>%</Text>
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                        // if (!spo2.trim()) {
                        //     Alert.alert('You need to enter the SPO2 value');
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

export default Spo2Screen;
