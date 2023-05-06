import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 10,
        textAlign: 'center'
    },
    icon: {
        position: 'absolute',
        top: 0,
        right: 10,
        padding: 10,
        zIndex: 1,
    },
    error: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center'
    },
});

export default styles;