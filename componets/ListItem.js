import { useState, Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import ModalEvent from '../componets/ModalEvent';
import { render } from 'react-dom';
const COLORS = {
  primary: '#7f44d4',
  white: '#fff',
  gray: '#433E3E',
  postGray: '#696868',
  DateColor: '#B28FE5',
  toSquare: '#B28FE5',
  cardColor: '#9969DD',
};
const { width, height } = Dimensions.get('window');
const LIST_ITEM_HEIGHT = 90;
const TRANSLATE_X_THRESHOLD = -width * 0.2;
const lastTap = null;
let isDouble = 0;

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const ListItem = ({ event, onDismiss, simultaneousHandlers }) => {
  const [modalComponentVisibility, setModalComponentVisibility] =
    useState(false);

  const dateSplit = event.date.split('/');

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);
  const pangGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldDismissed) {
        translateX.value = withTiming(-width);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(event);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rEventContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
    );
    return { opacity };
  });
  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  // new
  const DoubleTap = () => {
    setModalComponentVisibility(false);
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.lastTap && now - this.lastTap < DOUBLE_PRESS_DELAY) {
      setModalComponentVisibility(true);
    } else {
      this.lastTap = now;
    }
  };

  return (
    <Pressable onPress={DoubleTap}>
      {modalComponentVisibility && (
        <ModalEvent
          description={event.description}
          invitees={event.invitees.join(',  ')}
          dataOnly={event.date}
          timeOnly={event.time}
        />
      )}

      <Animated.View style={[styles.eventContainer, rEventContainerStyle]}>
        <Animated.View style={[styles.eventIcon, rIconContainerStyle]}>
          <Ionicons
            name="ios-checkmark-circle-outline"
            size={LIST_ITEM_HEIGHT * 0.5}
            color="green"
          />
        </Animated.View>

        <PanGestureHandler
          simultaneousHandlers={simultaneousHandlers}
          onGestureEvent={pangGesture}
        >
          <Animated.View style={[styles.event, rStyle]}>
            <View style={styles.squareDate}>
              <Text
                // adjustsFontSizeToFit={true}
                // numberOfLines={2}
                style={styles.DateText}
              >
                <Text style={[styles.squareDate, styles.squareDateExstra]}>
                  {' '}
                  {dateSplit[2]}{' '}
                </Text>
                {'\n'}

                {monthNames[parseInt(dateSplit[1]) - 1]}
              </Text>
            </View>
            <Text style={styles.eventTitle}>{event.title}</Text>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  eventContainer: {
    width: '100%',
    alignItems: 'center',
  },

  event: {
    width: '85%',
    height: LIST_ITEM_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    shadowOpacity: 0.09,
    shadowOffset: {
      width: 0,
      height: 20,
    },

    shadowRadius: 10,
    elevation: 5,
  },
  eventTitle: {
    fontSize: 18,
    color: COLORS.white,
    marginLeft: LIST_ITEM_HEIGHT - 20,
    marginEnd: 10,
    fontWeight: 'bold',
    lineHeight: 25,
  },
  eventIcon: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: 'absolute',
    right: '7%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  DateText: {
    color: COLORS.white,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 18,
    textAlignVertical: 'center',
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  squareDateExstra: {
    fontSize: 14,
    fontWeight: '500',
  },
  squareDate: {
    justifyContent: 'center',
    position: 'absolute',
    width: LIST_ITEM_HEIGHT - 30,
    height: LIST_ITEM_HEIGHT - 30,
    backgroundColor: COLORS.DateColor,
    left: 15,
    borderRadius: 10,
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
});
export default ListItem;
