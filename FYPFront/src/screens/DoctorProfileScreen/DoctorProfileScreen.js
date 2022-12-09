import React from 'react';
import {View, SafeAreaView, Pressable} from 'react-native';
import { Avatar, Title, Caption, Text } from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from "../../components/CustomButton/CustomButton";

import {useNavigation} from '@react-navigation/native';

const DoctorProfileScreen = () => {

    const navigation = useNavigation();

    const onEditAccountPressed = () =>{
        navigation.navigate('EditDoctor');
    }

    const onLogoutPressed = () =>{
        navigation.navigate('SignIn');
    }


    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.editLogoutContainer}>
          <Pressable onPress={onEditAccountPressed}>
          <Icon name='account-edit-outline' color="#651B70" size={25} style={{marginLeft:'5%'}}/>
          </Pressable>

          <Pressable onPress={onLogoutPressed}> 
          <Icon name='logout' color="#777777" size={25} style={{marginRight:'5%'}}/>
          </Pressable>
        </View>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row'}}>
              <Avatar.Image 
                source={require('../../assets/images/2.jpeg')}
                size={80}
              />
              <View style={{marginLeft: 20}}>
                <Title style={[styles.title, {
                  marginTop:15,
                  marginBottom: 5,
                }]}>Dr. Jack Ross</Title>
                <Caption style={styles.caption}>jack.Ross@hotmail.com</Caption>
              </View>
            </View>
          </View>

          {/* <View style={styles.btn}>
            <CustomButton
                text="Edit Account"
                onPress={onEditAccountPressed}
            />
          </View> */}
    
          <View style={styles.userInfoSection}>
          <View style={styles.row}>
              <Icon name="hospital-building" color="#651B70" size={20}/>
              <Text style={styles.txtRow}>CHU-NDS</Text>
            </View>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#651B70" size={20}/>
              <Text style={styles.txtRow}>Jbeil, Lebanon</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#651B70" size={20}/>
              <Text style={styles.txtRow}>+961-** *** ***</Text>
            </View>
            <View style={styles.row}>
              <Icon name="certificate-outline" color="#651B70" size={20}/>
              <Text style={styles.txtRow}>Endocrinologist</Text>
            </View>
            <View style={styles.row}>
              <Icon name="gender-male-female" color="#651B70" size={20}/>
              <Text style={styles.txtRow}>Male</Text>
            </View>
            <View style={styles.row}>
              <Icon name="timelapse" color="#651B70" size={20}/>
              <Text style={styles.txtRow}>5 of experience</Text>
            </View>
          </View>

        {/* <View style={[styles.btn, {marginTop:'10%'}]}>
            <CustomButton
                text="Logout"
                onPress={onLogoutPressed}
                type='Secondary'

            />
        </View> */}
        


        </SafeAreaView>
      );

  };

export default DoctorProfileScreen