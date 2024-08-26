import React from 'react';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { logout } from '../../api/services/AuthService';
import { IoIosSearch } from "react-icons/io";
import '../styles/Dash.css';
import '../styles/DashLight.css';
import '../styles/DashMediaScreen.css';
import 'daisyui/dist/full.css';

const TopNavbar = ({ currentUser, userData }) => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  console.log("User in TopNavbar:", currentUser);
  console.log("User data in TopNavbar:", userData);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getTitle = () => {
    if (location.pathname.startsWith('/dashboard/dashboardBody')) return 'Dashboard';
    if (location.pathname.startsWith('/dashboard/notes')) return 'Notes';
    if (location.pathname.startsWith('/dashboard/checklist')) return 'Checklist';
    if (location.pathname.startsWith('/dashboard/settings')) return 'Setting';
    if (location.pathname.startsWith('/dashboard/trash')) return 'Corbeille';
    return '';
  };

  const renderUserProfile = () => {
    if (!currentUser || !userData) {
      console.error('User or user data not found');
      return <div className="skeleton h-45 w-320"></div>;
    }

    console.log('User found in TopNavbar:', currentUser);
    console.log('User data found in TopNavbar:', userData);

    const initials = userData.firstname.charAt(0) + userData.lastname.charAt(0);

    return (
      <div className="flex profil-div-one items-center">
        <div className={` online avatar-profil avatar `}>
          {currentUser.photoURL ? (
            // <div className="w-24 rounded-full">
            //   <img src={currentUser.photoURL} alt="Profile" />
            // </div>
            <div className="bg-neutral text-neutral-content w-16 rounded-full top-navbar-profil-two">
            <span className="text-xl profil-text">{initials}</span>
          </div>
            
          ) : (
            <div className="bg-neutral text-neutral-content w-16 rounded-full top-navbar-profil-two">
              <span className="text-xl profil-text">{initials}</span>
            </div>
          )}
        </div>
        <div className="ml-4">
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <details>
                    <summary><span><h3 className={` profil-text-two  ${isDarkTheme ? "description-dark" : "description-light"}`}>{userData.firstname}</h3></span></summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                      <li><Link to="/dashboard/settings"> Setting</Link></li>
                      <li><button onClick={handleLogout}><Link>Logout</Link></button></li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
        </div>
      </div>
    );
  };


  return (
    <div className={`dash-top-navbar ${isDarkTheme ? "nav-bg-dark" : "nav-bg-light"}`}>
      <div className='dash-navbar-start'>
      <h1 className={` dash-top-title  ${isDarkTheme ? "title-dark" : "title-light"}`}>{getTitle()}</h1>
      <div className='dash-search-div'>
        <IoIosSearch className="search-icon" />
        <input
          type="text"
          placeholder="Rechercher"
          className="search-input"
        />
      </div>
      </div>
      <div className='dash-navbar-end profil-div-two'>
        <label className="swap svg-profil-set swap-rotate theme-svg">
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
        <div className='profil-div-tree'>
        {renderUserProfile()}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
