import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyC7HVRapoS7DvA556W_8wTxx3h94Mm8KSo",
    authDomain: "babble-b6c40.firebaseapp.com",
    projectId: "babble-b6c40",
    storageBucket: "babble-b6c40.appspot.com",
    messagingSenderId: "15333739103",
    appId: "1:15333739103:web:af3af36ebea2d8c6c529ea"
}).auth();