// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBvwYsih2tUc4BGlRx3D97HInWub3Kvbh4',
  authDomain: 'eventplanner-8ea37.firebaseapp.com',
  projectId: 'eventplanner-8ea37',
  storageBucket: 'eventplanner-8ea37.appspot.com',
  messagingSenderId: '829171514102',
  appId: '1:829171514102:web:bf18c5a172d2df5a4b0ad7',
  measurementId: 'G-XKNSJNJ30V',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
