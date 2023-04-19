import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from "react-native";
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const EditGeneralInfoScreen = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [oldMail, setOldMail] = useState('');

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const [phoneNb, setPhoneNb] = useState('');
    const [editStatus, setEditStatus] = useState(null);

    const [userData, setUserData] = useState('');
    const navigation = useNavigation();


    useEffect(() => {
        axios.get('https://ouvatek.herokuapp.com/api/countries')
            .then(response => {
                setCountries(response.data.rows);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const getProfileData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://ouvatek.herokuapp.com/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserData(response.data.userData);
            setFname(response.data.userData.first_name);
            setLname(response.data.userData.last_name);
            setEmail(response.data.userData.email);
            setOldMail(response.data.userData.email);
            setSelectedCountry(response.data.userData.country);
            setPhoneNb(response.data.userData.phone_number);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);

    const editUser = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/editcommon',
                { oldMail, fname, lname, email, selectedCountry, phoneNb },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                },
            );
            if (response.status === 200 && userData.user_type === 0) {
                navigation.navigate('EditPatient');
            }
            else if (response.status === 200 && userData.user_type === 1) {
                navigation.navigate('EditDoctor');
            }
        } catch (error) {
            setEditStatus(error.response.data.message);
        }
    };

    const onSubmitPressed = () => {
        editUser();
    }

    return (
        <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.root}>
                <Text style={styles.title}>Edit Your account</Text>

                <Text style={styles.error}>{editStatus}</Text>

                <CustomInput
                    label="First name"
                    IconName="account-outline"
                    placeholder="Enter Your First name"
                    value={fname}
                    setValue={setFname}
                />
                <CustomInput
                    label="Last name"
                    IconName="account"
                    placeholder="Enter Your Last name"
                    value={lname}
                    setValue={setLname}
                />

                <CustomInput
                    label="Email"
                    IconName="email-outline"
                    placeholder="Enter Your Email"
                    value={email}
                    setValue={setEmail}
                />

                <CustomPicker
                    label="Country"
                    IconName="map-marker-radius"
                    selOption={selectedCountry}
                    setSelOption={setSelectedCountry}
                    opt={countries.map(country => ({ label: country.country_name, value: country.country_id }))}
                />

                <CustomInput
                    label="Phone Number"
                    IconName="phone-outline"
                    placeholder="Enter Your phone number"
                    value={phoneNb}
                    setValue={setPhoneNb}
                    keyType="phone-pad"
                />

                <CustomButton
                    text="Submit"
                    onPress={onSubmitPressed}
                />


            </View>
        </ScrollView>

    );
};

export default EditGeneralInfoScreen;

