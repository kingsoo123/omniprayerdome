import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { FIREBASE_APIKEY } from "@env";

const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: "omni-dome.firebaseapp.com",
  projectId: "omni-dome",
  storageBucket: "omni-dome.appspot.com",
  messagingSenderId: "304759563463",
  appId: "1:304759563463:web:df9c553c62d11446b44ae2",
  measurementId: "G-JB0B39Y6YJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
