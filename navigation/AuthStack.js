import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home.js';
import HomeTabs from './UserStack.js';
import SignIn from '../screens/SignIn/SignIn.js';
import SignUp from '../screens/SignUp/SignUp.js';
import ConfirmEmail from '../screens/ConfirmEmail/ConfirmEmail.js';
import OnboardingScreen from '../screens/OnboardingScreen.js';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_APP, FIREBASE_AUTH } from '../firebase.js';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />

        {/* <Stack.Screen name="HomeTabs" component={HomeTabs} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
