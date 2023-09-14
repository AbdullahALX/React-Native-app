import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { color } from 'react-native-reanimated';

const COLORS = { primary: '#7f44d4', white: '#fff', border: '#e8e8e8' };

const CustomEventInput = ({
  control,
  name,
  placeholder,
  multiline = false,
  secureTextEntry = false,
  type = 'none',
  editable = true,
  selectTextOnFocus = true,
  pointerEvents = 'auto',
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
              styles[type],
            ]}
          >
            <TextInput
              multiline={multiline}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              style={styles.input}
              editable={editable}
              selectTextOnFocus={selectTextOnFocus}
              pointerEvents={pointerEvents}
              placeholderTextColor={'#778899'}
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
              {error.message || 'Error!'}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: '100%',
    borderColor: 'black',
    borderBottomWidth: 2,
    borderRadius: 5,
    padding: 16,
    marginVertical: 10,
  },
  input: {
    textAlign: 'left',
    fontSize: 18,
    color: '#9666db',
  },
  errorValid: {
    borderColor: 'red',
  },
  errorInvalid: {
    borderColor: COLORS.primary,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  none: {},

  textInvitees: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default CustomEventInput;
