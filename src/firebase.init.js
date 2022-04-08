// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDy1MmHPtK7iwb9jfnmwFZG7fldw2ndyNk",
    authDomain: "email-login-auth-c3307.firebaseapp.com",
    projectId: "email-login-auth-c3307",
    storageBucket: "email-login-auth-c3307.appspot.com",
    messagingSenderId: "317191352388",
    appId: "1:317191352388:web:fe1b855d78a3339bea0c11",
    measurementId: "G-BT7W3911WJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app