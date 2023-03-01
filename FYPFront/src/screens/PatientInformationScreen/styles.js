import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
     root:{
        alignItems: 'center',
        padding:20
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'#651B70',
        marginVertical:10,
    },
    txt:{
        marginTop:5, 
        fontWeight:'bold',
    },
    checkbox:{
        flexDirection:'row', 
        alignItems:'center', 
        marginTop:1,
        marginBottom:1, 
    },
    checkboxContainer:{
        alignContent:'flex-start', 
        marginBottom:5,
        marginLeft:'-45%'
    },
    error:{
        fontSize:16,
        color:'red',
        marginBottom:5
    },
    picker: {
    width: 200,
    borderWidth: 1,
    borderColor: 'gray'
  }
});

export default styles;