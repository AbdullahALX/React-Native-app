import { useState } from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  Dimensions,
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { Keyboard } from 'react-native';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';

import ModalEvent from '../componets/ModalEvent';
import CustomEventInput from '../componets/CustomEventInput';
import CustomButton from '../componets/CustomButton';
import DateTime from '../componets/DateTime';

const COLORS = {
  main: '#4526a5',
  primary: '#7f44d4',
  white: '#fff',
  border: '#e8e8e8',
  toSquare: '#a67ee0',
  temp: '#82799f',
};

const { width, height } = Dimensions.get('window');

const Post = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onPostPressed = (data) => {
    console.log(data);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.topContainer}>
        <SafeAreaView>
          <Text
            style={{
              fontSize: 60,
              fontWeight: '800',
              color: COLORS.toSquare,
              marginLeft: 30,
              marginTop: 30,
              letterSpacing: 3,
              marginBottom: 20,
            }}
          >
            Post
          </Text>
          <CustomEventInput
            name="title"
            placeholder="Enter event title"
            control={control}
            rules={{ required: 'Title is required' }}
          />
          <CustomEventInput
            name="EventDescription"
            placeholder="Enter event description"
            control={control}
            multiline={true}
            type="textArea"
          />
          <CustomEventInput
            name="invitees"
            placeholder="Enter invitees' names"
            control={control}
            multiline={true}
            type={'textInvitees'}
          />
          <DateTime control={control} watch={watch} name="date" />
          <View style={{ alignItems: 'center' }}>
            <CustomButton
              type="POST"
              text="Post"
              onPress={handleSubmit(onPostPressed)}
            />
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  topContainer: {
    backgroundColor: COLORS.white,
    height: height,
    padding: 20,
  },
  input: {},
});

export default Post;
