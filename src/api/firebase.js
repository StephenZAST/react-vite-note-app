import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBA88sxhnVBg7CoRaxt3rBcF63Yst3yBa0",
  authDomain: "mern-2-98517.firebaseapp.com",
  projectId: "mern-2-98517",
  storageBucket: "mern-2-98517.appspot.com",
  messagingSenderId: "932871249619",
  appId: "1:932871249619:web:4dd565bd0da5f9007abe26",
  measurementId: "G-Z79N1V4BH0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

export { app as firebase };
