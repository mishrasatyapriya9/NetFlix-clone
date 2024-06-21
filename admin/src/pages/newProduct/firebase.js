import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA83RjzvJX5YlfmC1-97raX1kxC6OcidZE",
  authDomain: "netflix-82054.firebaseapp.com",
  projectId: "netflix-82054",
  storageBucket: "netflix-82054.appspot.com",
  messagingSenderId: "951786203275",
  appId: "1:951786203275:web:6afac85d2e583fa8828c8e",
  measurementId: "G-R0W5TLVRJ3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;