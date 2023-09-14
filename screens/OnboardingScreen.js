import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const COLORS = { primary: '#7f44d4', white: '#fff' };

import styles from '../componets/styles';
// import Footer from "../componets/Footer";
// import { ref, updateCurrentSlideIndex } from "../componets/Footer";

export const slides = [
  {
    id: '1',
    image: require('../assets/images/stressed-person-using-computer-at-desk.png'),
    title: 'Manage all your events!',
    text: 'Plan your good times with our event manager.',
  },
  {
    id: '2',
    image: require('../assets/images/a-person-taking-an-online-class.png'),
    title: 'Time Management Perfected!',
    text: 'Enhance Your Meetings with Our Smart Scheduling App.',
  },
  {
    id: '3',
    image: require('../assets/images/two-colleagues-working-outdoors.png'),
    title: 'Efficient Event Management!',
    text: 'Invites, Media Sharing, Attendee Engagement, and Beyond.',
  },
];

const Slide = ({ item }) => {
  return (
    <View style={{ alignItem: 'center' }}>
      <Image
        source={item.image}
        style={{ height: '75%', width, resizeMode: 'contain' }}
      ></Image>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -100,
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentSlidesIndex, setCurrentSlidesIndex] = useState(0);
  const ref = useRef(null);

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlidesIndex === index && {
                  backgroundColor: COLORS.primary,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {currentSlidesIndex === slides.length - 1 ? (
          <View style={{ marginBottom: 20 }}>
            <View style={{ height: 50 }}>
              <TouchableOpacity
                style={[styles.btn]}
                onPress={() => navigation.replace('SignIn')}
              >
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                  },
                ]}
                onPress={skip}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: COLORS.primary,
                  }}
                >
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>NEXT</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlidesIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlidesIndex(nextSlideIndex);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current?.scrollToOffset({ offset });
    setCurrentSlidesIndex(lastSlideIndex);
  };

  const updateCurrentSlideIndex = (e) => {
    const conetenOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(conetenOffsetX / width);
    setCurrentSlidesIndex(currentIndex);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar style={{ backgroundColor: COLORS.primary }} />
      <FlatList
        alwaysBounceVertical={false}
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={slides}
        contentContainerStyle={{ height: height * 0.75 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
