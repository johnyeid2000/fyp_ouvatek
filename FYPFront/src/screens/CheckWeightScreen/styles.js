import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#651B70',
        borderRadius: 10
    },
    cellHeader: {
        flex: 1,
        padding: 8,
        textAlign: 'center',
        color: 'white'
    },
    error: {
        fontSize: 16,
        color: 'red',
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#651B70',
        borderRadius: 10
    },
    cell: {
        flex: 1,
        padding: 8,
        textAlign: 'center',
        borderRadius: 10
    },
});
export default styles;