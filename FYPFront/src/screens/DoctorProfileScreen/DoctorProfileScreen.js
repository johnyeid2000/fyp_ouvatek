import React from 'react';
import {View, SafeAreaView} from 'react-native';
import { Avatar, Title, Caption, Text } from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from "../../components/CustomButton/CustomButton";

import {useNavigation} from '@react-navigation/native';

const DoctorProfileScreen = () => {

    const navigation = useNavigation();

    const onEditAccountPressed = () =>{
        console.warn('edit profile pressed');
    }

    const onLogoutPressed = () =>{
        navigation.navigate('SignIn');
    }


    return (
        <SafeAreaView style={styles.container}>
    
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image 
                source={require('../../assets/images/2.jpeg')}
                size={80}
              />
              <View style={{marginLeft: 20}}>
                <Title style={[styles.title, {
                  marginTop:15,
                  marginBottom: 5,
                }]}>Doctor Name</Title>
                <Caption style={styles.caption}>Dr. </Caption>
              </View>
            </View>
          </View>

          <View style={styles.btn}>
            <CustomButton
                text="Edit Account"
                onPress={onEditAccountPressed}
            />
          </View>
    
          <View style={styles.userInfoSection}>
          <View style={styles.row}>
              <Icon name="hospital-building" color="#777777" size={20}/>
              <Text style={styles.txtRow}>Hospital Name</Text>
            </View>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={20}/>
              <Text style={styles.txtRow}>Location</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={20}/>
              <Text style={styles.txtRow}>+961-** *** ***</Text>
            </View>
            <View style={styles.row}>
              <Icon name="certificate-outline" color="#777777" size={20}/>
              <Text style={styles.txtRow}>Speciality </Text>
            </View>
            <View style={styles.row}>
              <Icon name="gender-male-female" color="#777777" size={20}/>
              <Text style={styles.txtRow}>Gender</Text>
            </View>
            <View style={styles.row}>
              <Icon name="timelapse" color="#777777" size={20}/>
              <Text style={styles.txtRow}>Years of experience</Text>
            </View>
          </View>

        <View style={[styles.btn, {marginTop:'10%'}]}>
            <CustomButton
                text="Logout"
                onPress={onLogoutPressed}
                type='Secondary'

            />
        </View>
        


        </SafeAreaView>
      );

  };

export default DoctorProfileScreen