import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Pressable, Alert } from 'react-native';
import { Avatar, Title, Caption, Text } from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

const DoctorProfileScreen = () => {
  const [userData, setUserData] = useState('');
  const [specificData, setSpecificData] = useState('');
  const [clinics, setClinics] = useState([]);

  const navigation = useNavigation();

  const getProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('https://ouvatek.herokuapp.com/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserData(response.data.userData);
      setSpecificData(response.data.specificData);
      setClinics(response.data.address);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);


  const onEditAccountPressed = () => {
    navigation.navigate('EditDoctor');
  }

  const onLogoutPressed = () => {
    Alert.alert(
      'Are you sure you want to Logout?',
      '',
      [
        { text: 'NO', onPress: () => false, style: 'cancel' },
        { text: 'YES', onPress: () => navigation.navigate("SignIn") },
      ],
      { cancelable: false }
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.editLogoutContainer}>
        <Pressable onPress={onEditAccountPressed}>
          <Icon name='account-edit-outline' color="#651B70" size={25} style={{ marginLeft: '5%' }} />
        </Pressable>

        <Pressable onPress={onLogoutPressed}>
          <Icon name='logout' color="#777777" size={25} style={{ marginRight: '5%' }} />
        </Pressable>
      </View>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row' }}>
          <Avatar.Image
            source={require('../../assets/images/doctor.jpg')}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, {
              marginTop: 15,
              marginBottom: 5,
            }]}>{userData.first_name} {userData.last_name}</Title>
            <Caption style={styles.caption}>{userData.email}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        {clinics.map((clinic, index) => (
          <View key={index} style={styles.row}>
            <Icon name="hospital-building" color="#651B70" size={20} />
            <Text style={styles.txtRow}><Text style={{ fontWeight: 'bold' }}>Clinic {index + 1}:</Text> {clinic.country} - {clinic.city} -
              Street {clinic.street} - Building {clinic.building} -
              Floor {clinic.floor} -  <Icon name="phone-classic" color="#d1a4eb" size={20} />
              {clinic.number}</Text>
          </View>
        ))}

        <View style={styles.row}>
          <Icon name="phone" color="#651B70" size={20} />
          <Text style={styles.txtRow}>+961-{userData.phone_number}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="doctor" color="#651B70" size={20} />
          <Text style={styles.txtRow}>{specificData.oop_number}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="certificate-outline" color="#651B70" size={20} />
          <Text style={styles.txtRow}>{specificData.speciality}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="gender-male-female" color="#651B70" size={20} />
          <Text style={styles.txtRow}>{specificData.gender}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="timelapse" color="#651B70" size={20} />
          <Text style={styles.txtRow}>{specificData.exp_years}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="book-outline" color="#651B70" size={20} />
          <Text style={styles.txtRow}>{specificData.biography}</Text>
        </View>
      </View>

    </SafeAreaView>
  );

};

export default DoctorProfileScreen