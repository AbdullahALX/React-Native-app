import { useState } from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  Dimensions,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import CustomButton from '../componets/CustomButton';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { getAuth } from 'firebase/auth';

const COLORS = {
  main: '#4526a5',
  primary: '#7f44d4',
  white: '#fff',
  border: '#e8e8e8',
  toSquare: '#B28FE5',
  temp: '#82799f',
};
const { width, height } = Dimensions.get('window');
const userDat = {
  username: 'test212',
  email: 'test212@gmail.com',
};
const Home = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const auth = getAuth();

  const onLogOut = () => {
    auth
      .signOut()
      .then((response) => {
        Alert.alet('user sign out');
      })
      .catch((err) => {
        Alert.alet('error');
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View
          style={{
            alignItem: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: -60,
          }}
        >
          <Image
            source={require('../assets/images/Logout2.png')}
            style={{ height: '75%', width: width, resizeMode: 'cover' }}
          ></Image>
        </View>
        <View style={{ alignItems: 'center', padding: 20 }}>
          <CustomButton text="Log out" type="LOG" onPress={onLogOut} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,

    width: '100%',
    height: '100%',
  },
  TopSquare: {
    height: height * 0.11,
    width: width * 0.9,
    backgroundColor: COLORS.white,
    margin: 20,
    borderRadius: 5,
    justifyContent: 'center',
    borderColor: 'black',
    borderBottomWidth: 2,
  },
  circleProfile: {},
});

export default Home;
