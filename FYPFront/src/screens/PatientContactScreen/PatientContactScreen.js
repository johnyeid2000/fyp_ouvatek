import React from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

import { useNavigation } from '@react-navigation/native';

const Messages = [
    {
        id: 1,
        userName: 'Dr. Jack Ross',
        userImg: { uri: 'https://dub01pap003files.storage.live.com/y4mPsDASd_NsvIuHNrjzmKB_IJKiRsdEO8q3bKfRweMw0Cb6kwNVlmfihFcAzfuti79leq6S7Gw4i5uz2uqyzueHd3PK_Q5Lg2nRhn3Y5MGrhgaVDlesKIYR_p7uBM4B67yPyh-GXRXL_oclB360naCRSjflFHOEli7bL-2BIsnW8Bgz2pF-OxSodlcGsxLGsqJ?width=432&height=407&cropmode=none' },
        //userImg: require('../../assets/images/2.jpeg'),
        messageTime: '4 mins ago',
        messageText: 'Hey there I am your doctor',
    },
    {
        id: 2,
        userName: 'Dr. Grace Smith',
        userImg: { uri: 'https://dub01pap003files.storage.live.com/y4maIqiwQPq8-E4dJlAnm2g1BmdMSE-xRXaANtPdkNC7z0uCccV8cZNYPAPeGGB_16llt3DXYR5naQSw4SU_l6Q8jsJu8xLdvKs-OHOwRZLEVfGmxi90fYe1TNUeEIBPJvuoYyoxq-JPVaAKNHUEnA7fhfkXChdY9zgdApDd8n-gdyG9L36tdtKtCdc-IdL5DUj?width=4000&height=6000&cropmode=none' },
        //userImg: require('../../assets/images/3.jpg'),
        messageTime: '10 mins ago',
        messageText: 'Hey there I am your doctor',
    },
    {
        id: 3,
        userName: 'Dr. Taylor Clark',
        userImg: { uri: 'https://dub01pap003files.storage.live.com/y4m43m6XoKoxWX3N4cg-leGaknrE5bhnkb2vsT2LRBusrIx0Yrly5Cgp1uypTME28YCVj0ER8_8Dg-v3GZ4SbQQNjOoDZc2gq9UJEVSa6NziP3KgIG5YqOjUecpFQallG3jee__WqYFSWdQwrpm3kH9uqS61khSSpBUfE626jgGXDxAkj1whW7VxB7I58XFKPtc?width=6720&height=4480&cropmode=none' },
        //userImg: require('../../assets/images/4.jpg'),
        messageTime: '1 day ago',
        messageText: 'Hey there I am your doctor',
    },
]

const PatientContactScreen = () => {

    const navigation = useNavigation();

    const onAddDoctorPressed = () => {
        navigation.navigate("AddDoctor");
    }
    return (
        <View style={styles.container}>
            <Pressable onPress={onAddDoctorPressed} >
                <Icon name='square-edit-outline' style={styles.icon} />
            </Pressable>
            <FlatList
                data={Messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.userInfo}>
                        <View style={styles.userImgWrapper}>
                            <Image source={item.userImg} style={styles.img} />
                        </View>
                        <View style={styles.txtSection}>
                            <View style={styles.userInfoTxt}>
                                <Text style={styles.nameTxt}>{item.userName}</Text>
                                <Text style={styles.userInfoTime}>{item.messageTime}</Text>
                            </View>
                            <View>
                                <Text style={styles.msgTxt}>{item.messageText}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default PatientContactScreen