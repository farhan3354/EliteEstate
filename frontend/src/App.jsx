import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import CreateProperty from "./pages/CreateProperty";
import MyProperties from "./pages/MyProperties";
import Favorites from "./pages/Favorites";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import Layout from "./component/common/Layout";
import AdminLayout from "./component/common/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminProperties from "./pages/admin/Properties";
import AdminBookings from "./pages/admin/Bookings";
import AdminReviews from "./pages/admin/Reviews";
import AdminAgents from "./pages/admin/AdminAgents";
import ImageSwapAnimation from "./pages/ImageSwap";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/about/Contact";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="properties" element={<Properties />} />
          <Route path="property/:id" element={<PropertyDetails />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="create-property" element={<CreateProperty />} />
          <Route path="my-properties" element={<MyProperties />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="pro" element={<ImageSwapAnimation />} />
        </Route>

        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="agents" element={<AdminAgents />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="booking" element={<AdminBookings />} />
          <Route path="reviews" element={<AdminReviews />} />
        </Route>
      </Routes>
    </Router>
  );
}
