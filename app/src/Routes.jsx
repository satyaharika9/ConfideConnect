import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
// import AdminPage from './pages/admin/AdminPage';
// import PatientPage from './pages/patient/PatientPage';
// import DoctorPage from './pages/doctor/DoctorPage';
// import LabPage from './pages/lab/LabPage';
// import EventsPage from './pages/event/EventPage';
// import BlogsPage from './pages/blog/BlogPage';
// import DonationPage from './pages/donation/DonationPage';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/admin" element={<AdminPage />} />
      <Route path="/patient" element={<PatientPage />} />
      <Route path="/doctor" element={<DoctorPage />} />
      <Route path="/lab" element={<LabPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/donation" element={<DonationPage />} />
      <Route path="*" element={<Navigate to="/login" />} /> */}
    </Routes>
  );
};

export default AppRoutes;
