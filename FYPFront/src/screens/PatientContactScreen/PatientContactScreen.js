import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const PatientContactScreen = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const navigation = useNavigation();

    const getMyDoctors = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://ouvatek.herokuapp.com/api/showmydoctors', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDoctors(response.data.rows);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getMyDoctors();
            setSelectedDoctor(null);
        });
        return unsubscribe;
    }, [navigation]);

    const onAddDoctorPressed = () => {
        navigation.navigate("AddDoctor");
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

    const onDeleteConnectionPressed = async (item) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('https://ouvatek.herokuapp.com/api/endlinkpatient', {
                dr_id: item.dr_id,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            getMyDoctors();
        } catch (error) {
            console.error(error);
        }
    };

    const renderDoctorOptions = (item) => {
        if (selectedDoctor === item) {
            return (
                <View style={{ position: 'absolute', marginLeft: '65%' }}>
                    <TouchableOpacity onPress={() => onDeleteConnectionPressed(item)}>
                        <Text>End Connection</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("CheckDoctorInfo", { id: item.id })}>
                        <Text >Check Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedDoctor(null)}>
                        <Text >Close</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={onAddDoctorPressed} >
                <Icon name='plus' style={styles.icon} />
            </Pressable>
            {doctors.length === 0 ? (
                <View style={styles.noDoctorsContainer}>
                    <Text style={{ marginTop: 30 }}>You have no linked doctors.</Text>
                </View>
            ) : (
                <FlatList
                    data={doctors}
                    keyExtractor={item => item.dr_id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.userInfo}>
                            <View style={styles.userImgWrapper}>
                                <Image source={{ uri: getAvatarUrl(item.gender) }} style={styles.img} />
                            </View>
                            <View style={styles.txtSection}>
                                <View style={styles.userInfoTxt}>
                                    <Text style={styles.nameTxt}>{item.first_name} {item.last_name}</Text>
                                    {!selectedDoctor || selectedDoctor.dr_id !== item.dr_id ? (
                                        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => setSelectedDoctor(item)}>
                                            <Icon size={20} name='dots-horizontal' />
                                        </TouchableOpacity>
                                    ) : null}
                                    {renderDoctorOptions(item)}
                                </View>
                                <View>
                                    <Text style={styles.msgTxt}>Hey there I am your doctor</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    )
}
export default PatientContactScreen
