import { useState } from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  Dimensions,
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          justifyContent: 'center',
          textAlign: 'center',
          color: 'black',
        }}
      >
        Notifications
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Home;
