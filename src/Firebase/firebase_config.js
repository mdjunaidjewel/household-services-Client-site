// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo-6YPsqId5bk96yRmde9P2CfF_Ijsng8",
  authDomain: "household-service-428a3.firebaseapp.com",
  projectId: "household-service-428a3",
  storageBucket: "household-service-428a3.firebasestorage.app",
  messagingSenderId: "522238232768",
  appId: "1:522238232768:web:039cbe2c869f87521a8525",
  measurementId: "G-XPDGJPRK54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

