import { useEffect, useState, useCallback } from 'react';
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
import { useForm, Controller, FormProvider, set } from 'react-hook-form';
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';
import { useFocusEffect } from '@react-navigation/native';
import ModalEvent from '../componets/ModalEvent';
import CustomEventInput from '../componets/CustomEventInput';
import CustomButton from '../componets/CustomButton';
import DateTime from '../componets/DateTime';

import { getAuth } from 'firebase/auth';
import {
  doc,
  getDoc,
  updateDocm,
  collection,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../firebase';

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
    reset,
  } = useForm();

  const [childId, setChildId] = useState();

  const [count, setCount] = useState(1);

  const CreateUser = async (props) => {
    const currentEventData = props.data;
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    //console.log(userId);

    const account = {
      Events1: {
        EventDescription: currentEventData.EventDescription || '',
        dateTime: currentEventData.dateTime || '',
        invitees: currentEventData.invitees || '',
        title: currentEventData.title || '',
        id: 1,
      },

      eventLength: 1,
    };
    const userRef = doc(db, 'UsersData', userId);
    const res = await setDoc(userRef, account);
    console.log('createeee');
    setCount(2);
  };

  useEffect(() => {
    fetchLen();
  }, []);

  const addData = async (props) => {
    const currentEventData = props.data;
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    const account = {
      ['Events' + count]: {
        EventDescription: currentEventData.EventDescription || '',
        dateTime: currentEventData.dateTime || '',
        invitees: currentEventData.invitees || '',
        title: currentEventData.title || '',
        id: count,
      },
      eventLength: count,
    };
    // console.log(account);

    const userRef = doc(db, 'UsersData', userId);
    await updateDoc(userRef, account);

    // const res = await setDoc(userRef, account);
  };

  async function fetchLen() {
    let reslen = 0;
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'UsersData', userId);

    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      reslen = docSnap.data().eventLength;
    }

    setCount(reslen + 1);
  }

  async function onPostPressed(data) {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'UsersData', userId);
    //console.log(docSnap.data().eventLength);

    const docSnap = await getDoc(userRef);
    if (docSnap.exists() && docSnap.data().eventLength != 0) {
      const reslen = await docSnap.data().eventLength;

      addData((data = { data }));
      setCount(count + 1);
      //console.log('Document data:', docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case

      CreateUser((data = { data }));
      console.log('No such document!');
    }
    reset({ ...data });
  }

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
          <DateTime control={control} watch={watch} name="date" count={count} />

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
