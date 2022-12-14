import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    userInfoSection: {
      //marginTop:25,
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    txtRow:{
        color:"black",
        marginLeft: 20,
    },
    btn:{
        width:'50%',
        marginLeft:'25%',
    },
    editLogoutContainer:{
      flexDirection:'row',
      justifyContent:'flex-end',
      marginTop:'2%'
    }
  
  });

  export default styles;