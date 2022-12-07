import React from 'react';
import {View, SafeAreaView, Pressable} from 'react-native';
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
      navigation.navigate('EditPatient');
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
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image 
                source={require('../../assets/images/1.jpg')}
                size={80}
              />
              <View style={{marginLeft: 20}}>
                <Title style={styles.title}>Jane Doe</Title>
                <Caption style={styles.caption}>Age: 26</Caption>
                <Caption style={styles.caption}>Date Of Birth: 5/10/1996</Caption>
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
              <Icon name="map-marker-radius" color="#651B70" size={20}/>
              <Text style={styles.txtRow}>Beirut, Lebanon</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#651B70" size={20}/>
              <Text style={styles.txtRow}>+961-** *** ***</Text>
            </View>
            <View style={styles.row}>
              <Icon name="calendar" color="#651B70" size={20}/>
              <Text style={styles.txtRow}>Week 6 in pregnancy</Text>
            </View>
            <View style={styles.row}>
              <Icon name="human-pregnant" color="#651B70" size={20}/>
              <Text style={styles.txtRow}>First trimester</Text>
            </View>
            <View style={styles.row}>
              <Icon name="diabetes" color="#651B70" size={20}/>
              <Text style={styles.txtRow}>Diabetic</Text>
            </View>
            <View style={styles.row}>
              <Icon name="water" color="#651B70" size={20}/>
              <Text style={styles.txtRow}>Not Hypertensive</Text>
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

export default PatientProfileScreen;
