import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller, FormProvider } from 'react-hook-form';

import CustomInput from '../../componets/CustomInput';
import CustomButton from '../../componets/CustomButton';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { db } from '../../firebase';
import { addDoc, collection, setDoc } from 'firebase/firestore';

const COLORS = {
  primary: '#7f44d4',
  white: '#fff',
  border: '#e8e8e8',
  gray: '#555',
};

const { width, height } = Dimensions.get('window');
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])./;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const SignUp = ({ history }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const pwd = watch('password');

  const navigation = useNavigation();
  let userId = 0;

  const onSignInPressed = (data) => {
    navigation.navigate('SignIn');
  };

  const auth = getAuth();

  async function onSignUpPressed(data) {
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert(
              'Email already in use!' + '\n' + 'Please enter different email'
            );
            break;
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  const onTermsPressed = () => {
    //add page
    console.warn('Terms of use');
  };

  const onPolicyUpPressed = () => {
    //add page
    console.warn('privacy policy');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        {/* 
        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{
            required: 'Username is required',

            pattern: {
              value: USER_REGEX,
              message:
                'Must begin with a letter. Letters, numbers, underscores, hyphens allowed',
            },
            minLength: {
              value: 4,
              message: 'Username should be at least 4 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Username should be max 24 characters long',
            },
          }}
        /> */}
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Enter a valid email address',
            },
          }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          secureTextEntry={true}
          rules={{
            required: 'Password is required',
            pattern: {
              value: PWD_REGEX,
              message:
                'Must include uppercase and lowercase letters, a number and a special character' +
                '. Allowed special characters: ! # @ $ %',
            },
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Password should be max 24 characters long',
            },
          }}
        />
        <CustomInput
          name="repate-password"
          placeholder="Confirm Password"
          control={control}
          secureTextEntry={true}
          rules={{
            required: 'Password is required',
            validate: (value) => value === pwd || 'Password do not match',
          }}
        />
        <CustomButton text="Sign Up" onPress={handleSubmit(onSignUpPressed)} />

        <Text style={styles.text}>
          By signing, you Confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsPressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPolicyUpPressed}>
            Privacy Policy
          </Text>
        </Text>

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPressed}
          type="TERTIAY"
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

  title: {
    marginTop: height * 0.15,
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.primary,
    margin: 10,
    marginBottom: 20,
    letterSpacing: 1,
  },
  text: {
    padding: 20,
    textAlign: 'center',
    color: COLORS.gray,
    marginVertical: 10,
  },
  link: {
    color: COLORS.primary,
  },
});

export default SignUp;
