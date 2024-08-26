import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { useNavigate } from 'react-router-dom';
import { createUser, signInUser, signInWithGoogleUser } from '../api/services/userServices';

import './styles/Signup.css';
import './styles/Form.css';
import 'daisyui/dist/full.css';
import './styles/HomeDark.css';
import './styles/HomeLight.css';
import './styles/Home-media-screen.css';

const Modalsignup = ({ id }) => {
  const { isDarkTheme } = useTheme();
  const [isSignup, setIsSignup] = useState(true);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [SignupSuccessful, setSignupSuccessful] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await createUser(firstname, lastname, email, password);
      console.log("Utilisateur créé avec succès !", response);
      setSignupSuccessful(true);
      navigate('/dashboard');
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setErrorMessage(error.message || "An error occurred during signup. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const userData = await signInUser(loginEmail, loginPassword);
      console.log("Connexion réussie !", userData);
      setLoginSuccessful(true);
      navigate('/dashboard');
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErrorMessage(error.message || "Adresse e-mail ou mot de passe invalide.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogleUser();
      console.log("Utilisateur connecté avec Google :", user);
      navigate('/dashboard');
    } catch (error) {
      console.error("Erreur lors de la connexion avec Google :", error);
      setErrorMessage(error.message || "An error occurred during Google sign-in. Please try again.");
    }
  };

  return (
    <dialog id={id} className="modal">
      <div className="custum-modal-box">
        <div className="form-container">
          {isSignup ? (
            <div className="sign-up-formtwo">
              <h2 className='mtext'>Formulaire d'inscription</h2>
              <form className='sign-up-formone' onSubmit={handleSignUp}>
                <input className='sign-up-input' type="text" name="first-name" placeholder="First name" required value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                <input className='sign-up-input' type="text" name="last-name" placeholder="Last name" required value={lastname} onChange={(e) => setLastname(e.target.value)} />
                <input className='sign-up-input' type="email" name="email" placeholder="Email address" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='sign-up-input' type="password" name="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className={`btn signup-button ${isDarkTheme ? "spansvg-dark-3" : "spansvg-light-3"}`}>S'inscrire</button>
              </form>
              <p className='signup-text'>Vous avez déjà un compte? <a className='signup-link' href="#" onClick={toggleForm}>Log in</a></p>
            </div>
          ) : (
            <div className="login-form">
              <h2 className='mtext'>Formulaire de connexion</h2>
              <form className='login-formone' onSubmit={handleLogin}>
                <input className='login-input' type="email" name="email" placeholder="Email address" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                <input className='login-input' type="password" name="password" placeholder="Password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                <button type="submit" className={`btn signup-button ${isDarkTheme ? "spansvg-dark-3" : "spansvg-light-3"}`}>Se connecter</button>
                <button onClick={handleGoogleSignIn} className={`btn signup-button google-signin-button ${isDarkTheme ? "spansvg-dark-3" : "spansvg-light-3"}`}>Se connecter avec Google</button>
              </form>
              <p className='signup-text'>Vous n'avez pas de compte? <a className='signup-link' href="#" onClick={toggleForm}>Sign up</a></p>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default Modalsignup;
