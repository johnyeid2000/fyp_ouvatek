import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Pressable } from "react-native";
import { Checkbox } from 'react-native-paper';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import CustomInput from '../../components/CustomInput';
import CustomButton from "../../components/CustomButton/CustomButton";
import styles from './styles';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [phoneNb, setPhoneNb] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [singnupStatus, setSignupStatus] = useState(null);
    const [isPressed, setIsPressed] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        axios.get('https://ouvatek.herokuapp.com/api/countries')
            .then(response => {
                setCountries(response.data.rows);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const navigation = useNavigation();

    const signUpUser = async () => {
        setIsPressed(true);
        try {
            const response = await axios.post('https://ouvatek.herokuapp.com/api/commonsignup',
                { fname, lname, email, selectedCountry, phoneNb, password, passwordRepeat, 'userType': checked },
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            );
            const id = response.data.userId;
            if (response.status === 200 && !checked) {
                navigation.navigate("PatientInfo", { id: id });
            }
            else if (response.status === 200 && checked) {
                navigation.navigate("DoctorInfo", { id: id });
            }
        } catch (error) {
            setSignupStatus(error.response.data.message);
        } finally {
            setIsPressed(false);
        }
    };

    const onRegisterPressed = () => {
        signUpUser();
    };

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    return (
        <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.root}>
                <Text style={styles.title}>Create an account</Text>

                <Text style={styles.error}>{singnupStatus}</Text>

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

                <CustomInput
                    label="Password"
                    IconName="lock-outline"
                    placeholder="Enter Your Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                    isPassword
                />

                <CustomInput
                    label="Confirm Password"
                    IconName="lock-outline"
                    placeholder="Re-enter Your Password"
                    value={passwordRepeat}
                    setValue={setPasswordRepeat}
                    secureTextEntry
                    isPassword
                />

                <Pressable onPress={() => { setChecked(!checked); }} style={styles.checkbox}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        color='#651B70'
                    />
                    <Text>Register as a doctor </Text>
                </Pressable>

                <CustomButton
                    text={isPressed ? 'Registering...' : 'Register'}
                    onPress={onRegisterPressed}
                />

                <Text style={styles.text}>By registering, you confirm that you accept
                    our Terms of Use and Privacy Policy</Text>

                <CustomButton
                    text="Have an account? Sign In"
                    onPress={onSignInPressed}
                    type='Teritiary'
                />
            </View>
        </ScrollView>
    );
};

export default SignUpScreen

