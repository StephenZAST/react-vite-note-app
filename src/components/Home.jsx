import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import 'daisyui/dist/full.css';
import './styles/HomeDark.css'
import './styles/HomeLight.css'
import './styles/Home-media-screen.css'
import { Appview, Restless, Bihance} from '../assets/index'
import Modalsignup from './Signup';

export const ThemeToggle = () => {

  const features = [
    { id: 1, title: 'Prise de notes', description: 'capturez facilement vos idées, vos pensées et votre inspiration.', icone: `<svg className="inner-svg1" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28 30H6V8H19.22L21.22 6H6C5.46957 6 4.96086 6.21071 4.58579 6.58579C4.21071 6.96086 4 7.46957 4 8V30C4 30.5304 4.21071 31.0391 4.58579 31.4142C4.96086 31.7893 5.46957 32 6 32H28C28.5304 32 29.0391 31.7893 29.4142 31.4142C29.7893 31.0391 30 30.5304 30 30V15L28 17V30Z" fill="white"/>
    <path d="M33.53 5.84001L30.16 2.47001C30.0104 2.32004 29.8327 2.20105 29.6371 2.11986C29.4415 2.03868 29.2318 1.99689 29.02 1.99689C28.8082 1.99689 28.5985 2.03868 28.4028 2.11986C28.2072 2.20105 28.0295 2.32004 27.88 2.47001L14.17 16.26L13.06 21.07C13.0127 21.3032 13.0177 21.5439 13.0745 21.7749C13.1314 22.0059 13.2388 22.2215 13.3889 22.406C13.539 22.5906 13.7282 22.7396 13.9428 22.8423C14.1574 22.945 14.3921 22.9988 14.63 23C14.753 23.0135 14.877 23.0135 15 23L19.85 21.93L33.53 8.12001C33.68 7.97045 33.7989 7.79277 33.8801 7.59714C33.9613 7.40152 34.0031 7.1918 34.0031 6.98001C34.0031 6.76821 33.9613 6.55849 33.8801 6.36287C33.7989 6.16724 33.68 5.98957 33.53 5.84001ZM18.81 20.08L15.15 20.89L16 17.26L26.32 6.87001L29.14 9.69001L18.81 20.08ZM30.27 8.56001L27.45 5.74001L29 4.16001L31.84 7.00001L30.27 8.56001Z" fill="white"/>
    </svg>` },
    { id: 2, title: 'Checklists', description: 'créez et gérez des listes de contrôle pour rester au top de vos tâches.', icone: `<svg className="inner-svg1" width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 16.42L0.79 10.21L3.62 7.38L7 10.77L16.88 0.880005L19.71 3.71L7 16.42Z" fill="white"/>
    </svg>` },
    { id: 3, title: 'Catégories', description: 'organisez vos notes et listes de contrôle par catégorie pour une récupération facile.', icone: `<svg className="inner-svg1" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.72799 15.137C2.18299 13.591 1.40999 12.819 1.12299 11.816C0.834988 10.813 1.08099 9.748 1.57299 7.619L1.85599 6.391C2.26899 4.599 2.47599 3.703 3.08899 3.089C3.70299 2.476 4.59899 2.269 6.39099 1.856L7.61899 1.572C9.74899 1.081 10.813 0.835001 11.816 1.122C12.819 1.41 13.591 2.183 15.136 3.728L16.966 5.558C19.657 8.248 21 9.592 21 11.262C21 12.933 19.656 14.277 16.967 16.966C14.277 19.656 12.933 21 11.262 21C9.59199 21 8.24699 19.656 5.55799 16.967L3.72799 15.137Z" stroke="white" stroke-width="1.5"/>
    <path opacity="0.5" d="M9.02121 9.29324C9.80225 8.51219 9.80225 7.24586 9.02121 6.46481C8.24016 5.68377 6.97383 5.68377 6.19278 6.46481C5.41173 7.24586 5.41173 8.51219 6.19278 9.29324C6.97383 10.0743 8.24016 10.0743 9.02121 9.29324Z" stroke="white" stroke-width="1.5"/>
    <path opacity="0.5" d="M10.542 17.5L17.521 10.52" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    </svg>` }
  ];

  const { isDarkTheme, toggleTheme } = useTheme();


  const getColorClass = (id) => {
    const themePrefix = isDarkTheme ? 'spansvg-dark' : 'spansvg-light';
    return `${themePrefix}-${id}`;
  };

  return (
      <>
        <div className="home">
          <div
            className={`navbar navbar-fixed ${
              isDarkTheme ? "nav-bg-dark" : "nav-bg-light"
            }`}
          >
            <div className="navbar-start">
              <h1
                className={`btn btn-ghost text-xl ${
                  isDarkTheme ? "logotextdark" : "logotextlight"
                }`}
              >
                MyNote
              </h1>
            </div>
            <div className="navbar-end button-navbar">
              <>
                <label className="swap swap-rotate theme-svg">
                  <input
                    type="checkbox"
                    checked={isDarkTheme}
                    onChange={toggleTheme}
                    className='theme-checkbox'
                  />

                  <svg
                    className="swap-off h-10 w-10 fill-black theme-svg sun"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  <svg
                    className="swap-on h-10 w-10 fill-current theme-svg moon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </>
              <button
                className={` btn  ${isDarkTheme ? "signup-dark" : "signup-light"}`} onClick={()=>document.getElementById('my_modal_2').showModal()}
              >
                Sign up
              </button>
              <Modalsignup id="my_modal_2" />
            </div>
          </div>
          <section className={` HeroSection  `}>
            <div
              className={` hero-main home-width-centered ${
                isDarkTheme ? "hero-main-dark" : "hero-main-light"
              }`}
            >
              <div className="home-width hero-centered ">
                <div className="hero-left">
                  <h1
                    className={` title  ${
                      isDarkTheme ? "title-dark" : "title-light"
                    }`}
                  >
                    Maximisez votre productivité avec MyNotes
                  </h1>
                  <p
                    className={` description  ${
                      isDarkTheme ? "description-dark" : "description-light"
                    }`}
                  >
                    L'application ultime de prise de notes et de liste de contrôle
                    pour vous aider à atteindre vos objectifs.{" "}
                  </p>
                  <button
                    className={` btn hero-button  ${
                      isDarkTheme ? "hero-button-dark" : "button-light"
                    }`} onClick={()=>document.getElementById('my_modal_2').showModal()}
                  >
                    Commencer
                  </button>
                </div>
                <div className="hero-right">
                  <img src={Appview} className="Appview" alt="Appview" />
                  <span className="svgshape"></span>
                  <svg
                    className={` orangeCircle  ${
                      isDarkTheme ? "orangeCircle-dark" : "orangeCircle-light"
                    }`}
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="15" cy="15" r="15" />
                  </svg>
                </div>
              </div>
            </div>
          </section>
          <section className="features">
            <div
              className={`feature-hero home-width-centered ${
                isDarkTheme ? "feature-hero-dark" : "feature-hero-light"
            }`}
            >
              <div className="home-width feature-hero-width feature-hero">
                {features.map((feature) => (
                  <div key={feature.id} className="feature-card-parent">
                    <div className="card-body feature-card">
                    <span className={`span-svg ${getColorClass(feature.id)}`} dangerouslySetInnerHTML={{ __html: feature.icone }} />
                      <h2 className="card-title">{feature.title}</h2>
                      <p className="features-description">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="GetStartedSection">
            <div
              className={` GetStartedSection-section home-width-centered ${
                isDarkTheme ? "GetStartedSection-dark" : "GetStartedSection-light"
              }`}
            >
              <div className="home-width GetStartedSection-section">
                <div className="GetStartedSection-left hero-left">
                  <h1
                    className={` title  ${
                      isDarkTheme ? "title-dark" : "title-light"
                    }`}
                  >
                    Les avantages de l'utilisation de MyNotes
                  </h1>
                  <p
                    className={` description  ${
                      isDarkTheme ? "description-dark" : "description-light"
                    }`}
                  >
                    Productivité accrue : restez organisé et maître de vos tâches
                    grâce à nos fonctionnalités puissantes. Concentration améliorée :
                    éliminez les distractions et concentrez-vous sur ce qui est
                    important. Réduction du stress : sentez-vous plus maître de votre
                    temps et de votre charge de travail.
                  </p>
                  <p
                    className={` description  ${
                      isDarkTheme ? "description-dark" : "description-light"
                    }`}
                  >
                    Créativité améliorée : capturez vos idées et vos pensées dès
                    qu'elles surviennent. Objectifs atteints : atteignez facilement
                    vos objectifs grâce à nos outils et ressources.
                  </p>
                </div>
                <div className="GetStartedSection-right hero-left">
                  <img src={Restless} alt="restless" />
                </div>
              </div>
            </div>
          </section>
          <section className="CompanySection">
            <div
              className={` GetStartedSection-section home-width-centered ${
                isDarkTheme ? "CompanySection-dark" : "CompanySection-light"
              }`}
            >
              <div className="home-width GetStartedSection-section">
                <div className="GetStartedSection-right hero-left">
                  <img src={Bihance} alt="restless" />
                </div>
                <div className="GetStartedSection-left hero-left">
                  <h1
                    className={` title  ${
                      isDarkTheme ? "title-dark" : "title-light"
                    }`}
                  >
                    L'application ultime de prise de notes et de Checklists
                  </h1>
                  <p
                    className={` description  ${
                      isDarkTheme ? "description-dark" : "description-light"
                    }`}
                  >
                    Capturez facilement vos idées et vos pensées grâce à notre
                    interface intuitive de prise de notes. Créez et gérez des listes
                    de contrôle pour rester organisé et maîtriser vos tâches.
                  </p>
                  <p
                    className={` description  ${
                      isDarkTheme ? "description-dark" : "description-light"
                    }`}
                  >
                    Attribuez des notes et des listes de contrôle aux catégories pour
                    faciliter l'organisation et la récupération. Ajoutez des notes et
                    des listes de contrôle aux favoris pour un accès rapide.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div
              className={`action-section home-width-centered ${
                isDarkTheme ? "action-dark" : "action-light"
              }`}
            >
              <div className="home-width action-section">
                <div className="action-left">
                  <h1
                    className={` title  ${
                      isDarkTheme ? "title-dark" : "title-light"
                    }`}
                  >
                    Prêt à commencer?
                  </h1>
                  <p
                    className={` description action-description ${
                      isDarkTheme ? "description-dark" : "description-light"
                    }`}
                  >
                    Commencez gratuitement
                  </p>
                </div>
                <div className={`action-right`}>
                  <button
                    className={` btn hero-button action-button  ${
                      isDarkTheme ? "spansvg-dark-3" : "spansvg-light-3"
                    }`} onClick={()=>document.getElementById('my_modal_2').showModal()}
                  >
                    Créer un compte
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section
            className={`footer-section ${
              isDarkTheme ? "footer-dark" : "footer-light"
            }`}
          >
            <h6
              className={`'footer-text' ${
                isDarkTheme ? "footer-text-dark" : "footer-text-light"
              }`}
            >
              Made With Love By STEPHEN All Right Reserved
            </h6>
          </section>
        </div>
      </>

  );
};



export default ThemeToggle;

