import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import bcrypt from 'bcryptjs'; 
import { register, login, signInWithGoogle } from './AuthService';

const usersCollection = collection(db, "users");

export const createUser = async (firstname, lastname, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const userData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword,
        };

        const docRef = await addDoc(usersCollection, userData);
        console.log("Utilisateur créé avec succès !");
        return await register(email, password); // Utiliser la fonction register pour créer l'utilisateur
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        throw error;
    }
};

export const signInUser = async (email, password) => {
    try {
        const q = query(usersCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error("Utilisateur non trouvé !");
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        const isPasswordCorrect = await bcrypt.compare(password, userData.password); // Utiliser bcrypt pour comparer les mots de passe

        if (!isPasswordCorrect) {
            throw new Error("Mot de passe incorrect !");
        }

        console.log("Connexion réussie !");
        return await login(email, password); // Utiliser la fonction login pour connecter l'utilisateur
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
        throw error;
    }
};

export const signInWithGoogleUser = async () => {
  try {
    const user = await signInWithGoogle();
    console.log("Connexion Google réussie !");
    return user;
  } catch (error) {
    console.error("Erreur lors de la connexion Google :", error);
    throw error;
  }
};
