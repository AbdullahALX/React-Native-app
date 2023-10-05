import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import CustomEventInput from '../componets/CustomEventInput';

import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';

import { getAuth } from 'firebase/auth';
import { doc, updateDoc, addDoc, setDoc, getDoc } from 'firebase/firestore';
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
const DateTime = ({ watch, name, count }) => {
  const { control, register, handleSubmit } = useForm();

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
  async function handleAddDate() {
    console.log(count);
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'UsersData', userId + '-dateTime');
    const docSnap = await getDoc(userRef);

    if (docSnap.exists() && Object.keys(docSnap.data()) != 0) {
      await updateDoc(userRef, {
        [count]: dateTimeLast,
      });
    } else {
      await setDoc(userRef, {
        [1]: dateTimeLast,
      });
    }
  }

  //console.log(data);

  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        backgroundColor: COLORS.white,
      }}
    >
      <TouchableOpacity
        style={{
          width: '100%',
        }}
        onPress={() => setOpenCalender(!openCalender)}
      >
        <CustomEventInput
          name="dateTime"
          placeholder={slectedStartdDate}
          control={control}
          editable={false}
          selectTextOnFocus={false}
          pointerEvents="none"
        ></CustomEventInput>
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
                onChange={(date) => console.log(date)}
                onDateChange={handleChangeStartDate}
                onTimeChange={handleChangeTime}
                //rules={{ required: 'Time is required' }}

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
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: COLORS.toSquare,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default DateTime;
