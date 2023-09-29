import { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ListItem from './ListItem';

import { getAuth } from 'firebase/auth';
import { doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const EVENTS = [
  {
    title: 'QQQQQQTechXpo 2023: Unveiling the Future',
    date: '2023/08/23',
    time: '10:25',
    description: 'TechXpo 2023: Unveiling the Future',
    id: 0,
    invitees: ['john1', 'john2', 'john3', 'john4', 'john5'],
  },
  // {
  //   title: 'Gastronomy Fest: A Culinary Extravaganza',
  //   description:
  //     'e 2023: Unveiling the Future TechXpo 2023: Unveiling the Future TechXpo 2023: Unveiling the Future TechXpo 2023: Unveiling the ,TechXpo 2023: Unveiling the Future TechXpo 2023: Unveiling the Future TechXpo 2023: Unveiling the Future TechXpo 2023: Unveiling the Future,e 2023: Unveiling the Future TechXpo 2023: Unveiling the Future TechXpo 2023: Unveiling the Future TechXpo 2023: Unveiling the ,TechXpo 2023: Unveiling the Future TechXpo 2023: Unveiling the Future TechXpo 2023: Unveiling the Future TechXpo 2023: Unveiling the Futu',
  //   date: '2023/02/04',
  //   time: '20:00',
  //   id: 1,
  //   invitees: ['john1', 'john2', 'john3', 'john4', 'john5'],
  // },
  // {
  //   title: 'Artisanal Crafts Fair: Celebrating Creativity',
  //   description: 'TechXpo 2023: Unveiling the Future',
  //   date: '2023/02/15',
  //   id: 2,
  //   invitees: ['john1', 'john2', 'john3', 'john4', 'john5'],
  // },
  // {
  //   title: 'Global Sustainability Summit 2023',
  //   description: 'TechXpo 2023: Unveiling the Future',
  //   date: '2023/01/15',
  //   id: 3,
  //   invitees: ['john1', 'john2', 'john3', 'john4', 'john5'],
  // },
  // {
  //   title: 'Global Sustainability Summit 2023',
  //   date: '2023/12/07',
  //   id: 4,
  //   invitees: ['john1', 'john2', 'john3', 'john4', 'john5'],
  // },
  // {
  //   title: 'Global Sustainability Summit 2023',
  //   date: 'October,7,2023',
  //   id: 5,
  //   invitees: ['john1', 'john2', 'john3', 'john4', 'john5'],
  // },
  // {
  //   title: 'Global Sustainability Summit 2023',
  //   date: '2023/12/07',
  //   id: 6,
  //   invitees: ['john1', 'john2', 'john3', 'john4', 'john5'],
  // },
  // {
  //   title: 'Global Sustainability Summit 2023',
  //   date: '2023/12/07',
  //   id: 7,
  //   invitees: ['john1'],
  // },
  // {
  //   title: 'Global Sustainability Summit 2023',
  //   date: '2023/12/07',
  //   id: 8,
  //   invitees: [],
  // },
  // {
  //   title: 'Global Sustainability Summit 2023',
  //   date: '2023/12/07',
  //   id: 9,
  //   invitees: [],
  // },
  // {
  //   title: 'Global Sustainability Summit 2023',
  //   date: '2023/12/07',
  //   id: 10,
  //   invitees: [],
  // },
  // {
  //   title: 'Global Sustainability Summit 2023',
  //   date: '2023/12/07',
  //   id: 11,
  //   invitees: [],
  // },
];

const { width, height } = Dimensions.get('window');
const COLORS = {
  primary: '#7f44d4',
  white: '#fff',
  toSquare: '#B28FE5',
  brownColor: '#433E3E',
};

const CustomEventCard = () => {
  const [dataEvent, setDataEvent] = useState('');

  async function getUserData() {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'UsersData', userId);

    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const resData = docSnap.data();
      setDataEvent(resData);
      //eturn resData;
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  useEffect(() => {
    (async () => {
      getUserData();
    })();
  }, []);

  const [events, setEvent] = useState(EVENTS);

  const scrollRef = useRef(null);
  const onDismiss = useCallback((event) => {
    //const temp = events.filter((item) => item.id !== event.id);
    // console.log(item.id);
    console.log(dataEvent);

    setEvent((events) => events.filter((item) => item.id !== event.id));
    console.log('done');
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topContainer}>
        <Text style={styles.allEventText}>All {'\n'}Events</Text>
      </View>

      <ScrollView style={{ flex: 1 }} ref={scrollRef}>
        {events.length <= 0 ? (
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
          events.map((event) => (
            <ListItem
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
