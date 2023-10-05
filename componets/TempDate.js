import { useEffect, useState } from 'react';
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

  let [count, setCount] = useState(1);

  const today = new Date('slectedStartdDate');

  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    'YYYY/MM/DD h:m'
  );
  const [slectedStartdDate, setSlectedStartdDate] = useState('YYYY/MM/DD h:m');
  const [startedDate, setStartedDate] = useState('12/12/2023');
  const [dateTimeLast, setDateTimeLast] = useState({
    time: '',
    date: '',
  });

  const [openCalender, setOpenCalender] = useState(false);

  function handleChangeStartDate(date) {
    setDateTimeLast((prevState) => ({
      ...prevState,
      date: date,
    }));

    setStartedDate(date);
  }

  function handleChangeTime(time) {
    setDateTimeLast((prevState) => ({
      ...prevState,
      time: time,
    }));
  }

  const handleOpenCalender = () => {
    setOpenCalender(!openCalender);
  };

  async function handleAddDate() {}

  const CreateUser = async (props) => {
    const currentEventData = props.data;
    console.log(currentEventData);
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    //console.log(userId);

    const account = {
      Events0: {
        EventDescription: currentEventData.EventDescription || '',
        dateTime: currentEventData.dateTime || '',
        invitees: currentEventData.invitees || '',
        title: currentEventData.title || '',
        id: 0,
      },

      eventLength: 0,
    };
    const userRef = doc(db, 'UsersData', userId);
    const res = await setDoc(userRef, account);
    console.log('createeee');
    setCount(1);
  };

  const addData = async (props) => {
    const currentEventData = props.data;
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    console.log(currentEventData);

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
  useEffect(() => {
    async function fetchLen() {
      let reslen = 0;
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      const userRef = doc(db, 'UsersData', userId);

      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        reslen = docSnap.data().eventLength;
      }

      setCount(reslen);
    }
    fetchLen();
  }, []);

  async function onPostPressed(data) {
    console.log(data);
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'UsersData', userId);

    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const reslen = await docSnap.data().eventLength;

      setCount(count + 1);

      addData((data = { data }));
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
          <Controller
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <SafeAreaView
                  style={{
                    justifyContent: 'center',
                    backgroundColor: COLORS.white,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      backgroundColor: 'red',
                      height: '20%',
                    }}
                    onPress={() => setOpenCalender(!openCalender)}
                  >
                    {/* <CustomEventInput
                name="dateTime"
                placeholder={slectedStartdDate}
                control={control}
                editable={false}
                selectTextOnFocus={false}
                pointerEvents="none"
              ></CustomEventInput> */}
                  </TouchableOpacity>

                  <View>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={openCalender}
                      onDismiss={
                        handleAddDate
                        // () => console.log(dateTimeLast)
                      }
                    >
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <View style={styles.modalView}>
                          <DatePicker
                            selected={slectedStartdDate}
                            onChange={onChange}
                            onDateChange={handleChangeStartDate}
                            onTimeChange={handleChangeTime}
                            //rules={{ required: 'Time is required' }}
                            control
                            value={value}
                            name="dateTime"
                            onBlur={onBlur}
                            onSelectedChange={(date) => {
                              setSlectedStartdDate(date);
                            }}
                            options={{
                              backgroundColor: COLORS.toSquare,
                              textHeaderColor: '#fff',
                              textDefaultColor: '#fff',
                              selectedTextColor: COLORS.primary,
                              mainColor: '#fff',
                              textSecondaryColor: '#fff',
                              borderColor: 'rgba(122, 146, 165, 0.1)',
                            }}
                          />

                          <TouchableOpacity onPress={handleOpenCalender}>
                            <Text
                              style={{
                                color: COLORS.white,
                                marginTop: 5,
                                fontSize: 19,
                                fontWeight: '500',
                              }}
                            >
                              Close
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </View>
                </SafeAreaView>
              </>
            )}
          />
          );
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
  modalView: {
    backgroundColor: COLORS.toSquare,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default Post;
