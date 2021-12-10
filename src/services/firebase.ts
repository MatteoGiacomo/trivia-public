import { initializeApp } from "firebase/app";

const firebaseConfig =  "YOUR_FIREBASE_CONFIG" ;

// Initialize Firebase
export const firebaseInstance = initializeApp(firebaseConfig);


