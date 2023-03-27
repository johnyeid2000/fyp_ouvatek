import React, {useEffect} from 'react';
import { View, FlatList, Text, Image, Pressable, BackHandler, Alert } from 'react-native';

import styles from './styles';

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const patients = [
    {
        id: 1,
        userName: 'Jane Doe',
        userImg: require('../../assets/images/1.jpg'),
        },
        {
        id: 2,
        userName: 'Linda Johnson',
        userImg: require('../../assets/images/p1.jpeg'),
        },
        {
        id: 3,
        userName: 'Jennifer Williams',
        userImg: require('../../assets/images/p2.jpeg'),
        },
        {
        id: 4,
        userName: 'Maria Miller',
        userImg: require('../../assets/images/p3.webp'),
        },
        {
        id: 5,
        userName: 'Carol White',
        userImg: require('../../assets/images/p4.webp'),
        },
]

const CheckMeasurementScreen =()=>{

    const navigation = useNavigation();

  useEffect(() => {
    const handleBackPress = () => {
      if (navigation.isFocused()) {
        Alert.alert(
          'Are you sure you want to Logout?',
          '',
          [
            { text: 'NO', onPress: () => false, style: 'cancel' },
            { text: 'YES', onPress: () => navigation.navigate("SignIn")},
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

    const patientPressed = () => {
        navigation.navigate('PatientMeasurements');
    }

    const newRequestPressed = () => {
        navigation.navigate('NewRequest');
    }

    return(
        <View style={styles.container}>
        <Pressable onPress={newRequestPressed} style={styles.newReq}>
        <Icon name='account-outline' style={{fontSize:20, marginRight:10}}/>
            <Text style={styles.txtNewReq}>New Requests</Text>
        </Pressable>
            <FlatList
                data={patients}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                        <Pressable onPress={patientPressed} style={styles.userInfo}>
                        <View style={styles.userImgWrapper}>
                        <Image source={item.userImg} style={styles.img}/>
                        </View>
                        <View style={styles.txtSection}>
                            <Text style={styles.nameTxt}>{item.userName}</Text>
                        </View>
                        </Pressable>
                )}
            />
        </View>
    )
}

export default CheckMeasurementScreen