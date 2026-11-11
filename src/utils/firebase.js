// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFnn4EvOnp45DRLwmvxc9S58yZyEJIwIE",
  authDomain: "netfkix-gpt.firebaseapp.com",
  projectId: "netfkix-gpt",
  storageBucket: "netfkix-gpt.firebasestorage.app",
  messagingSenderId: "573422698524",
  appId: "1:573422698524:web:0a4657e76f658103fd9fd9",
  measurementId: "G-D08B1FN5X8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
export const auth = getAuth(app);