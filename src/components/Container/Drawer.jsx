import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { AiFillHome } from "react-icons/ai";
import { TbNotes } from "react-icons/tb";
import { BsCardChecklist } from "react-icons/bs";
import { TbSettingsFilled } from "react-icons/tb";
import { IoTrash } from "react-icons/io5";
import '../styles/Drawer.css';
import '../styles/Dash.css';
import '../styles/DashLight.css';
import '../styles/DashMediaScreen.css';
import 'daisyui/dist/full.css';
import '../styles/HomeDark.css';
import '../styles/HomeLight.css';
import '../styles/Home-media-screen.css';

const Drawer = () => {
  const { isDarkTheme } = useTheme();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabClick = (path) => {
    setActiveTab(path);
  };

  return (
    <div className={`drawer ${isDarkTheme ? "nav-bg-dark" : "nav-bg-light"}`}>
      <div className='drawer-first'>
        <div className='dash-logo'>
          <h1 className={`btn btn-ghost dash-logo-in text-xl ${isDarkTheme ? "logotextdark" : "logotextlight"}`}>MyNote</h1>
        </div>
        <ul className='dash-ul'>
          <li className={`dash-li ${activeTab === '/dashboard/dashboardBody' ? 'active' : ''}`}>
            <Link to="/dashboard/dashboardBody" className={`dash-tab ${isDarkTheme ? "title-dark" : "title-light"}`} onClick={() => handleTabClick('/dashboard/dashboardBody')}>
              <AiFillHome /> Dashboard
            </Link>
          </li>
          <li className={`dash-li ${activeTab === '/dashboard/notes' ? 'active' : ''}`}>
            <Link to="/dashboard/notes" className={`dash-tab ${isDarkTheme ? "title-dark" : "title-light"}`} onClick={() => handleTabClick('/dashboard/notes')}>
              <TbNotes /> Notes
            </Link>
          </li>
          <li className={`dash-li ${activeTab === '/dashboard/checklist' ? 'active' : ''}`}>
            <Link to="/dashboard/checklist" className={`dash-tab ${isDarkTheme ? "title-dark" : "title-light"}`} onClick={() => handleTabClick('/dashboard/checklist')}>
              <BsCardChecklist /> Checklist
            </Link>
          </li>
          <li className={`dash-li ${activeTab === '/dashboard/settings' ? 'active' : ''}`}>
            <Link to="/dashboard/settings" className={`dash-tab ${isDarkTheme ? "title-dark" : "title-light"}`} onClick={() => handleTabClick('/dashboard/settings')}>
              <TbSettingsFilled /> Setting
            </Link>
          </li>
          <li className={`dash-li ${activeTab === '/dashboard/trash' ? 'active' : ''}`}>
            <Link to="/dashboard/trash" className={`dash-tab ${isDarkTheme ? "title-dark" : "title-light"}`} onClick={() => handleTabClick('/dashboard/trash')}>
              <IoTrash /> Corbeille
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
