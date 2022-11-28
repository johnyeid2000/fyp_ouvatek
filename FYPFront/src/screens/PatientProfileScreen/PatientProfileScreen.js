import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
} from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from "../../components/CustomButton/CustomButton";

import {useNavigation} from '@react-navigation/native';

const PatientProfileScreen = () => {

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
                source={require('../../assets/images/1.jpg')}
                size={80}
              />
              <View style={{marginLeft: 20}}>
                <Title style={[styles.title, {
                  marginTop:15,
                  marginBottom: 5,
                }]}>Patient Name</Title>
                <Caption style={styles.caption}>Age: nb</Caption>
                <Caption style={styles.caption}>Date Of Birth: dd/mm/yyyy</Caption>
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
              <Icon name="map-marker-radius" color="#777777" size={20}/>
              <Text style={styles.txtRow}>Beirut, Lebanon</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={20}/>
              <Text style={styles.txtRow}>+961-** *** ***</Text>
            </View>
            <View style={styles.row}>
              <Icon name="calendar" color="#777777" size={20}/>
              <Text style={styles.txtRow}>Week 20</Text>
            </View>
            <View style={styles.row}>
              <Icon name="human-pregnant" color="#777777" size={20}/>
              <Text style={styles.txtRow}>2nd trimester</Text>
            </View>
            <View style={styles.row}>
              <Icon name="diabetes" color="#777777" size={20}/>
              <Text style={styles.txtRow}>Not diabetic</Text>
            </View>
            <View style={styles.row}>
              <Icon name="water" color="#777777" size={20}/>
              <Text style={styles.txtRow}>Hypertensive</Text>
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

export default PatientProfileScreen;