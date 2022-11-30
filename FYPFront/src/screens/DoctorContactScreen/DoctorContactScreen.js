import React from 'react';
import {View, Text, FlatList, Image, Pressable} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

const Messages = [
    {
        id: 1,
        userName: 'Patient 1',
        userImg: require('../../assets/images/1.jpg'),
        messageTime:'4 mins ago',
        messageText:'Hey there I am your patient',
        },
        {
        id: 2,
        userName: 'Patient 2',
        userImg: require('../../assets/images/p1.jpeg'),
        messageTime:'10 mins ago',
        messageText:'Hey there I am your patient',
        },
        {
        id: 3,
        userName: 'Patient 3',
        userImg: require('../../assets/images/p2.jpeg'),
        messageTime:'1 day ago',
        messageText:'Hey there I am your patient',
        },
        {
        id: 4,
        userName: 'Patient 4',
        userImg: require('../../assets/images/p3.webp'),
        messageTime:'2 day ago',
        messageText:'Hey there I am your patient',
        },
        {
        id: 5,
        userName: 'Patient 5',
        userImg: require('../../assets/images/p4.webp'),
        messageTime:'1 hour ago',
        messageText:'Hey there I am your patient',
        },
]


const DoctorContactScreen =()=>{

    return(
        <View style={styles.container}>
            <FlatList
                data={Messages}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                        <View style={styles.userInfo}>
                        <View style={styles.userImgWrapper}>
                        <Image source={item.userImg} style={styles.img}/>
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

export default DoctorContactScreen