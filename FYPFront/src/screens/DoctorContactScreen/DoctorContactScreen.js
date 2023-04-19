import React from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

const Messages = [
    {
        id: 1,
        userName: 'Jane Doe',
        userImg: { uri: 'https://dub01pap003files.storage.live.com/y4mUTpdeE5ber7ncC37Eb1aFtmem0QJ7FPaX-4RhvcDCtq0gyAQCUcaNHeG1psURhZUG77mTce3aqnaZSsidUYQO3lMUaPeWn9-2_QntNdXcokuy1VL6XmWX9ueKhDCRpzXRYYw8BaLJs9m5FU3Uq_4mp8kIX6a2S7E42T0_uls2nHaPP9iZx2gL2FCaz-9Zsvq?width=600&height=900&cropmode=none' },
        //userImg: require('../../assets/images/1.jpg'),
        messageTime: '4 mins ago',
        messageText: 'Hey there I am your patient',
    },
    {
        id: 2,
        userName: 'Linda Johnson',
        userImg: { uri: 'https://dub01pap003files.storage.live.com/y4mTvIhdBEQzE64l6Q-GFs74G1_J-xoEnQgq2aACR9L29gpcDkhCTOEJ139dD4UWf_zwLbcHicd3s9vdlieBxTq9i5LplIgGaG_azk5boywdRtz0BijKyMofeojFlQdZFm8HGRw_JflnvLuUYdR-sY9NN9rdRIY2tMDH3L6rbIcUgiQPTj4iiy6mygWpKRGe5Xy?width=600&height=900&cropmode=none' },
        //userImg: require('../../assets/images/p1.jpeg'),
        messageTime: '10 mins ago',
        messageText: 'Hey there I am your patient',
    },
    {
        id: 3,
        userName: 'Jennifer Williams',
        userImg: { uri: 'https://dub01pap003files.storage.live.com/y4mL16X0DqXLAw9QvrC17EmcCHvlpHTrK4e7qoy8AJoPz36CrElyjU-ESUbT73WyiteFo8iqiYn65AVvPxEjx3yt_HH_Bo1F0mdJjnmDkdh7iswBxJA2mB-ASHRG71ymLAdty7MqxENQzIoLL6sq5_naPU1xncTEYfC-SuVi7MzyygN54m7VDvqtHTmfKslrOLQ?width=600&height=900&cropmode=none' },
        //userImg: require('../../assets/images/p2.jpeg'),
        messageTime: '1 day ago',
        messageText: 'Hey there I am your patient',
    },
    {
        id: 4,
        userName: 'Maria Miller',
        userImg: { uri: 'https://dub01pap003files.storage.live.com/y4mYlaDRVpV0hQMD1xeG2GCytav7xteB8-B3wH1dnIOZ0AWkXgxcHMDM7TG_BRfTwP8ECGV1hiMBrDX8r90Y8DSuNHgCXmelOVjm0U0Qm116iB5vUtLdUPXxo5JVUSVNjZTuFgjcMBkYYHQZL_GdUbGF9fsr3H-18J58qHMkHsWBloALOtgKG2qxeSGs4C0zFCW?width=600&height=900&cropmode=none' },
        //userImg: require('../../assets/images/p3.webp'),
        messageTime: '2 day ago',
        messageText: 'Hey there I am your patient',
    },
    {
        id: 5,
        userName: 'Carol White',
        userImg: { uri: 'https://dub01pap003files.storage.live.com/y4mdTl-M1YtLxlSkmNUFegVvgOAEOa2TGSse4maH18sW-oNYj8qqYbQLnijueIKmZ-DF6YYSaXIfxTXnUvaPDrboJlTmkVNtSeuZcktO9stodSTrPmHex1PoQPKJLIFujfXpcefebb3nWmc-Om2v2ayZNL1mCOGrnQv7kwjjIdmiLamFQraRjV4U6jdDB-755Pm?width=600&height=400&cropmode=none' },
        //userImg: require('../../assets/images/p4.webp'),
        messageTime: '1 hour ago',
        messageText: 'Hey there I am your patient',
    },
]


const DoctorContactScreen = () => {

    return (
        <View style={styles.container}>
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

export default DoctorContactScreen