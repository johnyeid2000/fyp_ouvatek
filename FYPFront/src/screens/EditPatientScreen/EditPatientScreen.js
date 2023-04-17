import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';


const EditPatientScreen = () => {

    const [userData, setUserData] = useState('');
    const navigation = useNavigation();

    const onPatientInfoPressed = () => {
        navigation.navigate('EditGeneral');
    };

    const onPregnancyPressed = () => {
        navigation.navigate('EditPregnancy');
    };

    const deletePressed = () => {
        Alert.alert(
            'Are you sure you want to Delete your account?',
            '',
            [
                { text: 'NO', onPress: () => false, style: 'cancel' },
                { text: 'YES', onPress: () => deletePressedSure() },
            ],
            { cancelable: false }
        );
    };

    const getProfileData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://ouvatek.herokuapp.com/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserData(response.data.userData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getProfileData();
        });
        return unsubscribe;
    }, [navigation]);

    const deletePressedSure = async () => {
        try {
            const email = userData.email;
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/deleteuser',
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                },
            );
            if (response.status === 200) {
                Alert.alert(
                    'Alert',
                    'You deleted your account',
                    [
                        { text: 'OK' }
                    ]
                );

                setTimeout(() => {
                    navigation.navigate('SignIn');
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.txt}>Press on the corresponding button to edit the information needed</Text>

            <CustomButton
                text="Edit Patient Information"
                onPress={onPatientInfoPressed}
            />

            <CustomButton
                text="Edit Pregnancy Information"
                onPress={onPregnancyPressed}
            />

            <Pressable style={styles.delBtn} onPress={() => deletePressed()}>
                <Text style={{ color: 'red' }}>Delete Account</Text>
            </Pressable>

        </View>
    );
};

export default EditPatientScreen;

