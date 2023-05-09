import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Pressable, Alert, ScrollView } from 'react-native';
import { Avatar, Title, Caption, Text } from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PatientProfileScreen = () => {
  const [userData, setUserData] = useState('');
  const [specificData, setSpecificData] = useState('');
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfileData();
    });
    return unsubscribe;
  }, [navigation]);

  const onEditAccountPressed = () => {
    navigation.navigate('EditPatient');
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
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={{ uri: 'https://dub01pap003files.storage.live.com/y4m0SSC9fzPryBlevyPGjBpQlVmCD52-SGGPDA-Hk8H2ps-cfOXNJ_Jt_G7wR64SL0IwM9SyZz7ocmciHVwZ52Ij1OrTg1MS2IQogTINfsqc7KU2eFR2Z2zXB0BmAbDAE0_cmbOEtQfuA13NUuitrJ3KQr0YHT4hgjwqAUGU2iG5iNfenB95VV2l3JT6vKPQ-6u?width=200&height=200&cropmode=none' }}
            //source={require('../../assets/images/pregWoman.png')}
            size={80}
            style={{ backgroundColor: 'white' }}
          />
          <View style={{ marginLeft: 20, flexShrink: 1 }}>
            <Title style={styles.title}>{userData.first_name} {userData.last_name}</Title>
            <Caption style={styles.caption}>{userData.email}</Caption>
            <Caption style={styles.caption}>Date Of Birth: {specificData.birthDate}</Caption>
          </View>
        </View>
      </View>

      <ScrollView style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#651B70" size={20} />
          <Text style={styles.txtRow}>Living in: {userData.country_name}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="phone" color="#651B70" size={20} />
          <Text style={styles.txtRow}>+961-{userData.phone_number}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="calendar" color="#651B70" size={20} />
          <Text style={styles.txtRow}>Week: {specificData.week}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="human-pregnant" color="#651B70" size={20} />
          <Text style={styles.txtRow}>{specificData.trimester_name}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="calendar-heart" color="#651B70" size={20} />
          <Text style={styles.txtRow}>Expected date of delivery: </Text>
        </View>

        <View style={styles.row}>
          <Icon name="blood-bag" color="#651B70" size={20} />
          <Text style={styles.txtRow}>Blood type: {specificData.type_name}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="human-male-height" color="#651B70" size={20} />
          <Text style={styles.txtRow}>Height: {specificData.height} m</Text>
        </View>

        <View style={styles.row}>
          <Icon name="medical-bag" color="#651B70" size={20} />
          <Text style={styles.txtRow}>Medication taken: {specificData.medication_name}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="scissors-cutting" color="#651B70" size={20} />
          <Text style={styles.txtRow}>Previous surgeries: {specificData.surgeries_name}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="water" color="#651B70" size={20} />
          <Text style={styles.txtRow}>{specificData.hypertensionValue}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="diabetes" color="#651B70" size={20} />
          <Text style={styles.txtRow}>{specificData.diabetesValue}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="baby" color="#651B70" size={20} />
          <Text style={styles.txtRow}>{specificData.previous_pregnanciesValue}</Text>
        </View>
      </ScrollView>

    </SafeAreaView>
  );

};

export default PatientProfileScreen;
