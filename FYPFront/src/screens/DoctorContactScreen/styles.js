import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userImgWrapper: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    txtSection: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 15,
        paddingLeft: 0,
        marginLeft: 10,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    userInfoTxt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    nameTxt: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    msgTxt: {
        fontSize: 14,
        color: '#333333',
    },
    newReq: {
        marginTop: 20,
        marginBottom: 10,
        width: '90%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cccccc',
    },
    txtNewReq: {
        fontSize: 20,
    },
    renderOptions: {

    },
    renderOptions: {
        position: 'absolute',
        marginLeft: '56%',
        backgroundColor: '#D0D0D0',
        borderRadius: 10,
        padding: 5,
        zIndex: 1,
        borderColor: 'black',
        borderWidth: 1
    }
});

export default styles;