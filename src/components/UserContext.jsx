import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../api/firebase";
import { doc, getDoc } from "firebase/firestore";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        setUser({ ...userDoc.data(), uid: user.uid });
                        console.log("User data:", userDoc.data());
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUser(null);
                console.log("No user is signed in");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};
