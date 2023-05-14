import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    pressableContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
    },
    icon: {
        fontSize: 20,
        marginLeft: '2%',
        marginRight: '2%',
        color: '#651B70'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    daysContainer: {
        marginBottom: 20
    },
    days: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#651B70',
    },
    timeTxt: {
        marginLeft: '10%',
        fontSize: 14,
        marginTop: 20,
        marginRight: '45%'
    }

});

export default styles;