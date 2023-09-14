import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';

const COLORS = { primary: '#7f44d4', white: '#fff', border: '#e8e8e8' };

const CustomInput = ({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  rules = {},
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              error ? styles.errorValid : styles.errorInvalid,
            ]}
          >
            <TextInput
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              style={styles.input}
            />
          </View>
          {error && (
            <Text
              style={{
                color: 'red',
                alignSelf: 'stretch',
                marginLeft: 30,
                marginRight: 30,
                fontSize: 12,
              }}
            >
              {error.message || 'Error hoooo!'}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: COLORS.white,

  //   width: '90%',
  //   borderColor: COLORS.border,
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   padding: 16,
  //   marginVertical: 5,
  // },

  container: {
    backgroundColor: 'transparent',
    width: '90%',
    borderColor: 'black',
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 16,
    marginVertical: 5,
  },
  input: {
    textAlign: 'left',
    fontSize: 16,
  },
  errorValid: {
    borderColor: 'red',
  },
  errorInvalid: {
    borderColor: COLORS.primary,
  },
});

export default CustomInput;
