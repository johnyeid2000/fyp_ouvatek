import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, Pressable, BackHandler, Alert } from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const CheckMeasurementScreen = () => {
  const [patients, setPatients] = useState([]);

  const navigation = useNavigation();
  const getMyPatients = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('https://ouvatek.herokuapp.com/api/showmypatients', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPatients(response.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyPatients();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const handleBackPress = () => {
      if (navigation.isFocused()) {
        Alert.alert(
          'Are you sure you want to Logout?',
          '',
          [
            { text: 'NO', onPress: () => false, style: 'cancel' },
            { text: 'YES', onPress: () => navigation.navigate("SignIn") },
          ],
          { cancelable: false }
        );

        // Prevent going back to the previous screen
        return true;
      }

      // Allow going back to the previous screen
      return false;
    };

    // Add the event listener
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Remove the event listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [navigation]);

  const patientPressed = (item) => {
    navigation.navigate('PatientMeasurements', { id: item.id });
  };


  return (
    <View style={styles.container}>

      {patients.length === 0 ? (
        <View>
          <Text style={{ marginTop: 30 }}>You have no linked Patients.</Text>
        </View>
      ) : (
        <FlatList
          data={patients}
          keyExtractor={item => item.pat_id.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => patientPressed(item)} style={styles.userInfo}>
              <View style={styles.userImgWrapper}>
                <Image
                  source={{ uri: 'https://dub01pap003files.storage.live.com/y4m0SSC9fzPryBlevyPGjBpQlVmCD52-SGGPDA-Hk8H2ps-cfOXNJ_Jt_G7wR64SL0IwM9SyZz7ocmciHVwZ52Ij1OrTg1MS2IQogTINfsqc7KU2eFR2Z2zXB0BmAbDAE0_cmbOEtQfuA13NUuitrJ3KQr0YHT4hgjwqAUGU2iG5iNfenB95VV2l3JT6vKPQ-6u?width=200&height=200&cropmode=none' }}
                  style={styles.img} />
              </View>
              <View style={styles.txtSection}>
                <Text style={styles.nameTxt}>{item.first_name} {item.last_name}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  )
}

export default CheckMeasurementScreen