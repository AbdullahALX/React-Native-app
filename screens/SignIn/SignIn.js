import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TextInput,
  FastImage,
} from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';
import Logo from '../../assets/images/logo2.png';
import CustomInput from '../../componets/CustomInput';
import CustomButton from '../../componets/CustomButton';

const { width, height } = Dimensions.get('window');
let userId = 0;

const SignIn = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //console.log(errors);
  const methods = useForm();

  const onSignInPressed = async ({ email, password }) => {
    try {
      const respone = await signInWithEmailAndPassword(auth, email, password)
        //
        .catch((error) => {
          console.log(error);

          switch (error.code) {
            case 'auth/wrong-password':
              alert('Please enter correct password !');
              break;

            case 'auth/invalid-email':
              alert('Please enter Valid Email!');
              break;

            case 'auth/too-many-requests':
              alert('Please restore your password or try again letter');
              break;

            case 'auth/user-not-found':
              alert('Please enter correct email !');
              break;

            default:
              alert('Error!');
              break;
          }
        });
    } catch (error) {
      alert(error);
    }
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.root}>
        <Image source={Logo} style={styles.logo} resizeMode="contain"></Image>

        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{ required: 'Email is required' }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          secureTextEntry={true}
          rules={{ required: 'Password is required' }}
        />
        <CustomButton
          text="Sign In"
          onPress={() => handleSubmit(onSignInPressed)()}
        />

        <CustomButton
          text=" Don't have an account?
           create one"
          onPress={onSignUpPressed}
          type="TERTIAY"
          style={styles.create}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  logo: {
    marginTop: 100,
    width: width,
    height: height * 0.3,
  },
});

export default SignIn;
