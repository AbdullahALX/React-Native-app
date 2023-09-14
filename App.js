import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

// import Navigation from './navigation';
import RootNavigationStack from './navigation';

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: 'transparent',
  },
};

const App = () => {
  return <RootNavigationStack />;
};

export default App;
