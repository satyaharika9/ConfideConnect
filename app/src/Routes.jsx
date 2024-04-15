import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AppNavbar from './components/common/AppNavBar';
// import AdminPage from './pages/AdminPage';
import PatientPage from './pages/PatientPage';
import DoctorPage from './pages/DoctorPage';
import LabPage from './pages/LabPage';
// import EventsPage from './pages/EventPage';
// import BlogsPage from './pages/BlogPage';
// import DonationPage from './pages/DonationPage';


const AppRoutes = () => {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
        <Route path="/patient" element={<PatientPage />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/lab" element={<LabPage />} />
        {/* <Route path="/events" element={<EventsPage />} /> */}
        {/* <Route path="/blogs" element={<BlogsPage />} /> */}
        {/* <Route path="/donation" element={<DonationPage />} /> */}
        {/* <Route path="*" element={<Navigate to="/Home" />} /> */}
      </Routes>
    </>
  );
};

export default AppRoutes;
