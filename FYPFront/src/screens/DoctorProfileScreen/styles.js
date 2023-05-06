import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    marginRight: 10,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  txtRow: {
    color: "black",
    marginLeft: 20,
    flexShrink: 1
  },
  editLogoutContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '2%'
  }

});

export default styles;