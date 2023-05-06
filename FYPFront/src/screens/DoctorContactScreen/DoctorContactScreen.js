import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const DoctorContactScreen = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const navigation = useNavigation();

    const getMyPatients = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://ouvatek.herokuapp.com/api/showmypatients', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPatients(response.data.rows);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getMyPatients();
            setSelectedPatient(null);
        });
        return unsubscribe;
    }, [navigation]);

    const onDeleteConnectionPressed = async (item) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/endlinkdoctor', {
                pat_id: item.pat_id,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            getMyPatients();
        } catch (error) {
            console.error(error);
        }
    };

    const renderPatientOptions = (item) => {
        if (selectedPatient === item) {
            return (
                <View style={styles.renderOptions}>
                    <TouchableOpacity style={{ margin: 1 }} onPress={() => onDeleteConnectionPressed(item)}>
                        <Text >End Connection</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 1 }} onPress={() => navigation.navigate("CheckPatientInfo", { id: item.id })}>
                        <Text >Check Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 1 }} onPress={() => setSelectedPatient(null)}>
                        <Text >Close</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

    const newRequestPressed = () => {
        navigation.navigate('NewRequest');
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={newRequestPressed} style={styles.newReq}>
                <Icon name='account-outline' style={{ fontSize: 20, marginRight: 10 }} />
                <Text style={styles.txtNewReq}>New Requests</Text>
            </Pressable>
            {patients.length === 0 ? (
                <View>
                    <Text style={{ marginTop: 30 }}>You have no linked Patients.</Text>
                </View>
            ) : (
                <FlatList
                    data={patients}
                    keyExtractor={item => item.pat_id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.userInfo}>
                            <View style={styles.userImgWrapper}>
                                <Image
                                    source={{ uri: 'https://dub01pap003files.storage.live.com/y4m0SSC9fzPryBlevyPGjBpQlVmCD52-SGGPDA-Hk8H2ps-cfOXNJ_Jt_G7wR64SL0IwM9SyZz7ocmciHVwZ52Ij1OrTg1MS2IQogTINfsqc7KU2eFR2Z2zXB0BmAbDAE0_cmbOEtQfuA13NUuitrJ3KQr0YHT4hgjwqAUGU2iG5iNfenB95VV2l3JT6vKPQ-6u?width=200&height=200&cropmode=none' }}
                                    style={styles.img}
                                />
                            </View>
                            <View style={styles.txtSection}>
                                <View style={styles.userInfoTxt}>
                                    <Text style={styles.nameTxt}>{item.first_name} {item.last_name}</Text>
                                    {!selectedPatient || selectedPatient.pat_id !== item.pat_id ? (
                                        <TouchableOpacity style={{ marginRight: 10, paddingHorizontal: 10, paddingVertical: 2 }} onPress={() => setSelectedPatient(item)}>
                                            <Icon size={20} name='dots-horizontal' />
                                        </TouchableOpacity>
                                    ) : null}
                                    {renderPatientOptions(item)}
                                </View>
                                <View>
                                    <Text style={styles.msgTxt}>Hey there I am your patient</Text>
                                    <Text style={styles.msgTxt}>Last seen: 10 min ago</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    )
}

export default DoctorContactScreen