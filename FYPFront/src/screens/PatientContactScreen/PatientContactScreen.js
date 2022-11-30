import React from 'react';
import {View, Text, FlatList, Image, Pressable} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

const Messages = [
    {
        id: 1,
        userName: 'Dr. 1',
        userImg: require('../../assets/images/2.jpeg'),
        messageTime:'4 mins ago',
        messageText:'Hey there I am your doctor',
        },
        {
        id: 2,
        userName: 'Dr. 2',
        userImg: require('../../assets/images/3.jpg'),
        messageTime:'10 mins ago',
        messageText:'Hey there I am your doctor',
        },
        {
        id: 3,
        userName: 'Dr. 3',
        userImg: require('../../assets/images/4.jpg'),
        messageTime:'1 day ago',
        messageText:'Hey there I am your doctor',
        },
]


const PatientContactScreen =()=>{

    const onAddDoctorPressed = () => {
        console.warn('add doctor pressed');
    }
    return(
        <View style={styles.container}>
        <Pressable onPress={onAddDoctorPressed} >
            <Icon name='square-edit-outline' style={styles.icon}/>
        </Pressable>
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

export default PatientContactScreen