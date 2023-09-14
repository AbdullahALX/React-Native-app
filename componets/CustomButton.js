import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

const COLORS = {
  primary: '#7f44d4',
  white: '#fff',
  border: '#e8e8e8',
  gray: '#555',
};

const CustomButton = ({ onPress, text, type = 'PRIMARY' }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles['container_' + type]]}
    >
      <Text style={[styles.text, styles['text_' + type]]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   width: '90%',
  //   padding: 16,
  //   marginVertical: 5,
  //   alignItems: 'center',
  //   borderRadius: 5,
  // },
  container: {
    width: '90%',
    padding: 16,
    paddingVertical: 20,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 30,
  },
  container_PRIMARY: {
    backgroundColor: COLORS.primary,
  },

  container_POST: {
    width: '70%',
    borderColor: '#A07ADA',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },

  container_LOG: {
    width: '70%',
    borderColor: '#A07ADA',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },

  container_SECONDARY: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  container_TERTIAY: {},
  text: {
    fontWeight: 'bold',
    color: COLORS.white,
  },
  text_POST: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  text_LOG: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  text_PRIMARY: {
    fontSize: 16,
  },

  text_SECONDARY: {
    color: COLORS.primary,
  },

  text_TERTIAY: {
    fontWeight: 'normal',
    color: COLORS.gray,
    marginVertical: -30,
  },
});

export default CustomButton;
