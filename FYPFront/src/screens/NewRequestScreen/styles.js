import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    newReq: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 5,
    },
    icon: {
        position: 'absolute',
        top: 0,
        right: 10,
        padding: 10,
        zIndex: 1,
    },
    doctorImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    doctorInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '75%',
        height: 60,
    },
    iconAccept: {
        fontSize: 25,
        color: 'green'
    },
    iconDecline: {
        fontSize: 25,
        color: 'red'
    },
    iconsPressable: {
        width: '12%',
        alignItems: 'center',
        justifyContent: 'center'
    },
});


export default styles;