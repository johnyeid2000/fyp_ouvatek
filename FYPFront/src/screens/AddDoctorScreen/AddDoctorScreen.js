import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import axios from "axios";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';

const AddDoctorScreen = () => {
    const [doctors, setDoctors] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        axios
            .get("https://ouvatek.herokuapp.com/api/doctor")
            .then((response) => {
                setDoctors(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onCheckDoctorPressed = () => {
        navigation.navigate("CheckDoctorInfo");
    };

    const onConnectPressed = () => {

    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.icon} onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 16 }}>X</Text>
            </Pressable>
            <ScrollView style={{ marginTop: 40 }}>
                {doctors.map((doctor, index) => (
                    <View key={index} style={styles.newReq}>
                        <Pressable style={{ width: "70%", height: 40 }} onPress={onCheckDoctorPressed}>
                            <Text style={{ color: "black", fontWeight: "bold" }}>
                                {doctor.speciality}
                            </Text>
                        </Pressable>

                        <Pressable style={{ width: "28%", alignItems: "center" }} onPress={onConnectPressed}>
                            <Text style={styles.iconConnect}>Connect</Text>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default AddDoctorScreen;
