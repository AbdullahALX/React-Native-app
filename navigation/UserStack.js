import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Home from '../screens/Home.js';
import Settings from '../screens/Settings.js';
import Notifications from '../screens/Notifications.js';
import Profile from '../screens/Profile.js';
import PostScreen from '../screens/PostScreen.js';
import DateTime from '../componets/DateTime.js';

const Tab = createBottomTabNavigator();
const COLORS = {
  primary: '#7f44d4',
  white: '#fff',
  gray: '#433E3E',
  postGray: '#696868',
  OnClickColor: '#B28FE5',
};

function UserStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#433E3E',
            backgroundColor: 'black',
            elevation: 0,
            height: 75,
            // borderTopLeftRadius: 15,
            // borderTopRightRadius: 15,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}
              >
                <Image
                  source={require('../assets/images/home.png')}
                  resizeMode="contain"
                  style={{
                    height: 30,
                    width: 30,
                    marginBottom: 10,
                    tintColor: focused ? COLORS.OnClickColor : COLORS.white,
                  }}
                />
              </View>
            ),
          }}
        />
        {/* <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}
            >
              <Image
                source={require('../assets/images/bell.png')}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  marginBottom: 10,
                  tintColor: focused ? COLORS.OnClickColor : COLORS.white,
                }}
              />
            </View>
          ),
        }}
      /> */}
        <Tab.Screen
          name="PostScreen"
          component={PostScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                  // flex: 1,

                  // top: -50,
                  // borderRadius: 50,
                  // backgroundColor: COLORS.postGray,
                  // height: 90,
                  // width: 90,
                }}
              >
                <Image
                  source={require('../assets/images/plus.png')}
                  resizeMode="contain"
                  style={{
                    height: 35,
                    width: 34,
                    marginBottom: 10,

                    tintColor: focused ? COLORS.OnClickColor : COLORS.white,
                  }}
                />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}
              >
                <Image
                  source={require('../assets/images/signOut.png')}
                  resizeMode="contain"
                  style={{
                    height: 35,
                    width: 35,
                    marginBottom: 10,
                    tintColor: focused ? COLORS.OnClickColor : COLORS.white,
                  }}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({});
export default UserStack;
