import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import axios from "axios";
import styles from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddDoctorScreen = () => {
    const [doctors, setDoctors] = useState([]);
    const [requestsSent, setRequestsSent] = useState([]);
    const [requestedDoctors, setRequestedDoctors] = useState([]);
    const navigation = useNavigation();

    const getDoctor = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://ouvatek.herokuapp.com/api/doctor', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDoctors(response.data.rows);
            setRequestedDoctors(response.data.requestedDoctors.map(doctor => doctor.dr_id));
            setRequestsSent(new Array(response.data.rows.length).fill(false));

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDoctor();
        });
        return unsubscribe;
    }, [navigation]);

    const onCheckDoctorPressed = (doctor) => {
        navigation.navigate("CheckDoctorInfo", { id: doctor.id });
    };

    const onConnectPressed = async (index, doctor) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/linktodoc', {
                doctor: doctor.dr_id,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const updatedRequestsSent = [...requestsSent];
            updatedRequestsSent[index] = true;
            setRequestsSent(updatedRequestsSent);
            // show success message or navigate to a success screen
        } catch (error) {
            console.error(error);
            // show error message or handle error
        }
    };

    const getAvatarUrl = (gender) => {
        let avatarUrl = 'https://dub01pap003files.storage.live.com/y4mMx07s_SWkpClEZrtYUCuO2jDtBi2Pnel1GavSyn1jCbU7P6KRZlEbmR3si4ZpJfEM8UOMbpqtquo3FY_VO4RtFPnnEZf4vn2Dk_NUtt6iqZh8gPDONgJ6OwsVIP1TWEOcr1aTtIx5sjaAuJmgRbOZqK9tY9NaGQlbdHGWuWzTRRpMic5i6win3FockxVWP8l?width=388&height=250&cropmode=none';
        if (gender === 'Male') {
            avatarUrl = 'https://dub01pap003files.storage.live.com/y4mrLDyxrRdKUEEsesJPIsPznb3KhEX29pEarP8PHNNzusTd_CJDqpVyMJC8u1mrbYUDyERoGdIC2JksAdaph1pHshiWaiJ9Ol9KPQNZrO1wx621FyVDarhhQ-1R7hl3BgaSWS1hbOuo1o48O5uGSJTfdpKylpWebM16Xf0wrpfip5Oz51yOQUyEAQiFclSlFtY?width=225&height=225&cropmode=none';
        } else if (gender === 'Female') {
            avatarUrl = 'https://dub01pap003files.storage.live.com/y4mcMjlOdY1IqkolZCpnZuU7_urbNqxsQ52MSSMNlF8UJmMI8eRKSEzxftp0JDL0jISfqZoRucHibO52EOiE3T5QQylWvzb7LuPtLW6hcfT6hzlM6ol65hzX-zWMa0OSt77eH5N1JuFry3Z3BZeTzd4g8Ek2VhVgHmCj-OYbIpHCqjbQ63MzhT4qk0WWH68Bg_E?width=225&height=225&cropmode=none';
        }
        return avatarUrl;
    };

    const onDisconnectPressed = async (index, doctor) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/denylinkpatient', {
                dr_id: doctor.dr_id,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const updatedRequestsSent = [...requestsSent];
            updatedRequestsSent[index] = false;
            setRequestsSent(updatedRequestsSent);
            getDoctor();
        } catch (error) {
            console.error(error);
        }
    };

    const renderConnectButton = (index, doctor) => {
        if (requestsSent[index]) {
            return (
                <Pressable style={{ width: "28%", alignItems: "center" }} onPress={() => onDisconnectPressed(index, doctor)}>
                    <Text style={styles.connectTextDisconnect}>Remove Request</Text>
                </Pressable>
            );
        } else if (requestedDoctors.includes(doctor.dr_id)) {
            return (
                <Pressable style={{ width: "28%", alignItems: "center" }} onPress={() => onDisconnectPressed(index, doctor)}>
                    <Text style={styles.connectTextDisconnect}>Remove Request</Text>
                </Pressable>
            );
        } else {
            return (
                <Pressable style={{ width: "28%", alignItems: "center" }} onPress={() => onConnectPressed(index, doctor)}>
                    <Text style={styles.connectTextConnect}>Connect</Text>
                </Pressable>
            );
        }
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.icon} onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 16 }}>X</Text>
            </Pressable>
            <ScrollView style={{ marginTop: 50 }}>
                {doctors.map((doctor, index) => (
                    <View key={index} style={styles.newReq}>
                        <Pressable style={styles.doctorInfoContainer} onPress={() => onCheckDoctorPressed(doctor)}>
                            <Image
                                source={{ uri: getAvatarUrl(doctor.gender) }}
                                style={styles.doctorImage}
                            />
                            <View>
                                <Text style={{ color: "black", fontWeight: "bold" }}>
                                    {doctor.speciality} {doctor.first_name} {doctor.last_name}
                                </Text>
                                <Text>
                                    {doctor.exp_years}
                                </Text>
                                <Text>
                                    {doctor.country_name}
                                </Text>
                            </View>
                        </Pressable>

                        {renderConnectButton(index, doctor)}

                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default AddDoctorScreen;
