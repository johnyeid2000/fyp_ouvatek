import React from 'react';
import { View, Text, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';

const NewRequestScreen =()=>{

    const navigation = useNavigation();

    const acceptPressed = () => {
        console.warn('patient accepted');
    }

    const declinePressed = () => {
        console.warn('patient decline');
    }

    const patientPressed = () => {
        navigation.navigate('PatientMeasurements');
    }

    return(
        <View style={styles.container}>
            <View style={styles.newReq}>
            <Pressable  style={{width:'70%'}} onPress={patientPressed}>
            <Text style={{color:'black'}}><Text style={{fontWeight:'bold'}}>Alice Jane</Text> has requested to follow up with you </Text>
            </Pressable>
                <Pressable onPress={acceptPressed}>
                <Icon
                    name='check'
                    style={styles.iconAccept}
                />
                </Pressable>

                <Pressable onPress={declinePressed}>
                <Icon
                    name='close'
                    style={styles.iconDecline}
                />
                </Pressable>
            </View>

            <View style={styles.newReq}>
            <Pressable  style={{width:'70%'}} onPress={patientPressed}>
                <Text style={{color:'black'}}><Text style={{fontWeight:'bold'}}>Betty Carter</Text> has requested to follow up with you </Text>
                </Pressable>
                <Pressable onPress={acceptPressed}>
                <Icon
                    name='check'
                    style={styles.iconAccept}
                />
                </Pressable>

                <Pressable onPress={declinePressed}>
                <Icon
                    name='close'
                    style={styles.iconDecline}
                />
                </Pressable>
            </View>

            <View style={styles.newReq}>
            <Pressable  style={{width:'70%'}} onPress={patientPressed}>
                <Text style={{color:'black'}}><Text style={{fontWeight:'bold'}}>Kate Griffin</Text> has requested to follow up with you </Text>
                </Pressable>
                <Pressable onPress={acceptPressed}>
                <Icon
                    name='check'
                    style={styles.iconAccept}
                />
                </Pressable>

                <Pressable onPress={declinePressed}>
                <Icon
                    name='close'
                    style={styles.iconDecline}
                />
                </Pressable>
            </View>
        </View>
    );
};

export default NewRequestScreen;