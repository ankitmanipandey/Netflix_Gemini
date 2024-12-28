// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI4_6xbeJbg5K6U5q-wOT9v9f7WR2wQjI",
  authDomain: "netflix-gpt-a1ab6.firebaseapp.com",
  projectId: "netflix-gpt-a1ab6",
  storageBucket: "netflix-gpt-a1ab6.appspot.com",
  messagingSenderId: "282258130409",
  appId: "1:282258130409:web:2d2f52324371cd39a8b778",
  measurementId: "G-S3WRG8KJ95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();