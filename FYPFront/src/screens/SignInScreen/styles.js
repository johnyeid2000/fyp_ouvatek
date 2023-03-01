import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        padding: 20,
    },
    logo:{
        width:'100%',
    },
    checkbox:{
        flexDirection:'row', 
        alignItems:'center', 
        marginTop:1,
        marginBottom:1, 
        marginLeft:"-50%"
    },
    error:{
        fontSize:16,
        color:'red',
        marginBottom:5
    },
});

export default styles;