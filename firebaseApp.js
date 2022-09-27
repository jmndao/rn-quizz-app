// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKJVYuv9Ow2fKvdKOpzSVUHc5jh94aoFw",
    authDomain: "oneschool-fe158.firebaseapp.com",
    projectId: "oneschool-fe158",
    storageBucket: "oneschool-fe158.appspot.com",
    messagingSenderId: "674896090952",
    appId: "1:674896090952:web:9df1a60d51833446a0c57d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;