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
    iconConnect: {
        color: 'red',
    },
});


export default styles;