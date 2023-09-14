import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
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
import { slides } from '../screens/OnboardingScreen';

const Footer = () => {
  const [currentSlidesIndex, setCurrentSlidesIndex] = useState(0);
  const ref = useRef(null);

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
              onPress={() => navigation.replace('Home')}
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

export default Footer;
