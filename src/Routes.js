import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import PropertySearch from "./pages/PropertySearch/PropertySearch";
import AddProperty from "./pages/AddProperty/AddPropertyPage";
import EditProperty from "./pages/AddProperty/EditPropertyPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import MyBookings from "./pages/MyBookings/BookingPage";
import MyWallet from "./pages/MyWallet/MyWallet";
import PropertyDetails from "./pages/PropertyDetailsPage/PropertyScreen";
import PropertyOwnerDashboard from "./pages/PropertyOwnerDashBoard/PropertiesPage";
import SystemReport from "./pages/SystemReport/SystemReport";
import UserProfile from "./pages/UserProfile/UserProfile";

const ProjectRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/property_search/:id" element={<PropertySearch />} />
        <Route path="/my_profile/:id" element={< UserProfile/>} />
        <Route path="/my_properties/:id" element={< PropertyOwnerDashboard/>} />
        <Route path="/my_bookings/:id" element={< MyBookings/>} />
        <Route path="/my_wallet/:id" element={< MyWallet/>} />
        <Route path="/add_property/:id" element={< AddProperty/>} />
        <Route path="/edit_property/:user_id/:property_id" element={< EditProperty/>} />
        <Route path="/admin_dashboard/:id" element={<AdminDashboard />} />
        <Route path="/property_details/:user_id/:property_id" element={< PropertyDetails/>} />
        <Route path="/system_report" element={< SystemReport/>} />
      </Routes>
    </Router>
  );
};
export default ProjectRoutes;

