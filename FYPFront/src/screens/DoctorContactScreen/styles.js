import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingLeft: 10,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    userInfo:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userImgWrapper:{
        paddingTop:15,
        paddingBottom:15,
    },
    img:{
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    txtSection:{
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 15,
        paddingLeft: 0,
        marginLeft: 10,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    userInfoTxt:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    nameTxt:{
        fontSize: 14,
        fontWeight: 'bold',
    },
    userInfoTime:{
        fontSize: 12,
        color: '#666',
    },
    msgTxt:{
        fontSize:14,
        color:'#333333',
    },
});

export default styles;