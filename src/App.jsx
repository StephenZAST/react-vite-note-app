import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, query, where, getDocs, collection } from "firebase/firestore"; // Assure-toi d'importer collection ici
import { db } from './api/firebase';
import Home from './components/Home';
import Signup from './components/Signup';
import Dash from './components/Dash';
import { ThemeProvider } from './components/ThemeContext';
import { Provider } from 'react-redux';
import store from './Redux/store';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        console.log("User is signed in:", user);

        const q = query(collection(db, "users"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUserData(userDoc.data());
          console.log("User data from Firestore:", userDoc.data());
        } else {
          console.log("No such document!");
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
        console.log("No user is signed in");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard/*" element={<Dash currentUser={currentUser} userData={userData} />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;