import { StyleSheet, Dimensions } from 'react-native';
const COLORS = { primary: '#7f44d4', white: '#fff' };
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  title: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 10,
    maxWidth: '70%',
    lineHeight: 23,
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
    marginTop: 10,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    padding: 16,

    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
