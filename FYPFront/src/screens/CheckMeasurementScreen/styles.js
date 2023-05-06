import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userImgWrapper: {
        paddingLeft: 10,
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
        marginLeft: 10,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },

    nameTxt: {
        fontSize: 14,
        fontWeight: 'bold',
    },

});

export default styles;