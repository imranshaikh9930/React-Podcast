// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDM6QqSAehx0SCwzh-0tX5rmml_hUF8Npk",
  authDomain: "myproject-f4668.firebaseapp.com",
  projectId: "myproject-f4668",
  storageBucket: "myproject-f4668.appspot.com",
  messagingSenderId: "313877505193",
  appId: "1:313877505193:web:881bb3d2feeb7aa754f5b8",
  measurementId: "G-1ZHSXK6N32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage =  getStorage(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export  {app,db,storage};