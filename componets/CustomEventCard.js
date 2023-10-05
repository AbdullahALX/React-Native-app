import { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ListItem from './ListItem';
import { useFocusEffect } from '@react-navigation/native';

import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../firebase';

const { width, height } = Dimensions.get('window');
const COLORS = {
  primary: '#7f44d4',
  white: '#fff',
  toSquare: '#B28FE5',
  brownColor: '#433E3E',
};

const CustomEventCard = () => {
  const [dataEvent, setDataEvent] = useState('');
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  async function getUserData() {
    let reArr = [];
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'UsersData', userId);

    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const resData = docSnap.data();

      Object.entries(resData).forEach(([key, value]) => {
        if (typeof value !== 'number') reArr.push(value);
      });
      reArr.sort(function (a, b) {
        return a.id - b.id;
      });
      setDataEvent(reArr);

      setDone(true);
    } else {
      console.log('No such document!');
      setDataEvent([]);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getUserData();

      return () => {};
    }, [done])
  );

  const scrollRef = useRef(null);
  const onDismiss = useCallback(async (event) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'UsersData', userId);
    await updateDoc(userRef, {
      ['Events' + event.id]: deleteField(),
    });
    //deleting dates and time
    const DateRef = doc(db, 'UsersData', userId + '-dateTime');
    const docRes = await getDoc(DateRef);
    if (docRes.exists()) {
      await updateDoc(DateRef, {
        [event.id]: deleteField(),
      });
    }

    const docSnap = await getDoc(userRef);
    console.log(docSnap.data().eventLength);
    await updateDoc(userRef, {
      eventLength: (docSnap.data().eventLength -= 1),
    });

    getUserData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topContainer}>
        <Text style={styles.allEventText}>All {'\n'}Events</Text>
      </View>

      <ScrollView style={{ flex: 1 }} ref={scrollRef}>
        {dataEvent.length - 1 < 0 ? (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../assets/images/empty3.png')}
              style={{
                height: height * 0.5,
                width: width * 0.7,
                resizeMode: 'contain',
                //marginLeft: 30,r
              }}
            ></Image>
          </View>
        ) : (
          dataEvent.map((event) => (
            <ListItem
              allEvent={{ dataEvent }}
              key={event.id}
              event={event}
              onDismiss={onDismiss}
              simultaneousHandlers={scrollRef}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: COLORS.primary,
    height: height * 0.4,
    borderBottomRightRadius: 50,
  },
  eventText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    padding: 5,
    paddingLeft: 40,
    color: COLORS.brownColor,
    backgroundColor: 'transparent',
  },
  allEventText: {
    fontSize: 60,
    fontWeight: '800',
    color: COLORS.white,
    position: 'absolute',
    left: 40,
    letterSpacing: 3,
    top: '40%',
  },
});

export default CustomEventCard;
