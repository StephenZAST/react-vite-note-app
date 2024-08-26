import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import Drawer from './Container/Drawer';
import TopNavbar from './Container/TopNavbar';
import DashboardBody from './Container/DashboardBody';
import Notes from './Container/Notes';
import Checklist from './Container/Checklist';
import Settings from './Container/Settings';
import Trash from './Container/Trash';
import './styles/Dash.css';
import './styles/DashLight.css';
import './styles/DashMediaScreen.css';

const Dash = ({ currentUser, userData }) => {
  const { isDarkTheme } = useTheme();
  console.log("User in Dash:", currentUser);
  console.log("User data in Dash:", userData);

  return (
    <div className={`dash ${isDarkTheme ? "dash-back-dark" : "dash-back-light"}`}>
      <Drawer />
      <div className="main-content">
        <TopNavbar currentUser={currentUser} userData={userData} />
        <Routes>
          <Route path="dashboardBody" element={<DashboardBody />} />
          <Route path="notes/*" element={<Notes currentUser={currentUser} />} />
          <Route path="checklist" element={<Checklist />} />
          <Route path="settings" element={<Settings />} />
          <Route path="trash" element={<Trash />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dash;
