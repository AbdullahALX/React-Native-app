import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useState } from 'react';

import CustomInput from '../../componets/CustomInput';
import CustomButton from '../../componets/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller, FormProvider } from 'react-hook-form';

const COLORS = {
  primary: '#7f44d4',
  white: '#fff',
  border: '#e8e8e8',
  gray: '#555',
};

const { width, height } = Dimensions.get('window');

const ConfirmEmail = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigation = useNavigation();

  const onConfirmPressed = (data) => {
    //logic
    console.log(data);
    navigation.navigate('HomeTabs');
  };
  const onSignInPressed = () => {
    //logic
    navigation.navigate('SignIn');
  };
  const onResenedPressed = () => {
    //logic
    console.warn('resend code');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput
          name="code"
          placeholder="Enter your confirmation code"
          control={control}
          secureTextEntry={true}
          rules={{ required: 'Code is required' }}
        />

        <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

        <CustomButton
          text="Resend code"
          onPress={onResenedPressed}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to sign in"
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
    marginTop: height * 0.2,
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    margin: 10,
    marginBottom: 20,
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

export default ConfirmEmail;
