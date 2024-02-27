// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCWORvZGAspH-FFR4KgOxy2414fTez2IE",
  authDomain: "wimmelbilder-77dc8.firebaseapp.com",
  projectId: "wimmelbilder-77dc8",
  storageBucket: "wimmelbilder-77dc8.appspot.com",
  messagingSenderId: "207189737986",
  appId: "1:207189737986:web:1496ba82bc30152ae05d1b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Init Highscore Database
export const highscoreDB = getFirestore(app);

//Init Picture Storage
export const storage = getStorage(app);

