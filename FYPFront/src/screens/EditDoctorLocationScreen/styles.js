import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  userInfoSection: {
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  newReq: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 20,
  },
  iconDecline: {
    color: 'red',
  },
  error:{
        fontSize:16,
        color:'red',
        marginBottom:5
    },
});


export default styles;