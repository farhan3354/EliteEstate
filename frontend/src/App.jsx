import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import MyProperty from "./pages/MyProperties";
import Booking from "./pages/Bookings";
import Layout from "./component/common/Layout";
import AdminLayout from "./component/common/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminProperties from "./pages/admin/Properties";
import AdminBookings from "./pages/admin/Bookings";
import AdminReviews from "./pages/admin/Reviews";
import AdminAgents from "./pages/admin/AdminAgents";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/about/Contact";
import UserLayout from "./component/common/user/UserLayout";
import Dashboard from "./component/userDashboard/Dashboard";
import Favorites from "./component/userDashboard/Favorites";
import Profile from "./pages/Profile";
import AddProperty from "./component/AddProperty";
import ArrayP from "./pages/ArrayP";
import BecomeAgent from "./component/agentPage/BecomeAgent";
import AgentProfile from "./component/agentPage/AgentProfile";
import Agents from "./component/agentPage/AgentsList";
import AgentLayout from "./component/common/agent/AgentLayout";
import AgentDashboard from "./component/agentPage/AgentDashboard";
import AgentListings from "./component/agentPage/AgentListings ";
import AgentClients from "./component/agentPage/AgentClients";
import AgentSchedule from "./component/agentPage/AgentSchedule";
import AgentInquiries from "./component/agentPage/AgentInquiries";
import AgentPerformance from "./component/agentPage/AgentPerformance";
import OwnAgentProfile from "./component/agentPage/OwnAgentProfile";
import SecureNetWebsite from "./component/ServiceWebsite";
import FullWebsite from "./component/servicesWebsite/FullWebsite";
import CompanyProfilePDF from "./component/servicesWebsite/CompanyProfilePDF";
import ProtectRoute from "./protectedRoute/VerifyRoute";
import BecomeOwner from "./component/BecomeOwner";
import OwnerLayout from "./component/common/owner/OwnerLayout";
import OwnerDashboard from "./component/owner/OwnerDashboard";
import OWnerProperties from "./component/owner/OwnerPropertier";
import AssignAgent from "./component/owner/AssignAgent";
import PendingProperties from "./pages/admin/PendingProperties";
import AdminCommissions from "./pages/admin/AdminCommissions";
import AdminOwners from "./pages/admin/AdminOwners";
import NotFound from "./pages/NotFound";
import EditProperty from "./pages/EditProperty";
import OwnerInquiries from "./component/owner/OwnerInquiries";
import OwnerAssignedAgents from "./component/owner/OwnerAssignedAgents";

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
          <Route path="agents" element={<Agents />} />
          <Route path="agents/:id" element={<AgentProfile />} />
          <Route path="become-agent" element={<BecomeAgent />} />
          <Route path="become-owner" element={<BecomeOwner />} />
          <Route path="task" element={<ArrayP />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* <Route element={<ProtectRoute allowedRoles={["user"]} />}> */}
        <Route path="/user-dashboard" element={<UserLayout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="add-property" element={<AddProperty />} /> */}
          {/* <Route path="my-properties" element={<MyProperty />} /> */}
          <Route path="favorites" element={<Favorites />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="profile" element={<Profile />} />
          {/* </Route> */}
        </Route>
        {/* <Route element={<ProtectRoute allowedRoles={["owner"]} />}> */}
        <Route path="/owner-dashboard" element={<OwnerLayout />}>
          <Route index element={<OwnerDashboard />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="my-properties" element={<OWnerProperties />} />
          <Route path="edit-property/:id/" element={<EditProperty />} />
          <Route path="property/:id" element={<PropertyDetails />} />
          <Route path="inquiries" element={<OwnerInquiries />} />
          <Route path="assign-agent" element={<AssignAgent />} />
          <Route path="assigned-agents" element={<OwnerAssignedAgents />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        {/* </Route> */}
        {/* <Route element={<ProtectRoute allowedRoles={["agent"]} />}> */}
        <Route path="/agent" element={<AgentLayout />}>
          <Route index element={<AgentDashboard />} />
          <Route path="listings" element={<AgentListings />} />
          <Route path="clients" element={<AgentClients />} />
          <Route path="inquiries" element={<AgentInquiries />} />
          <Route path="schedule" element={<AgentSchedule />} />
          <Route path="add-property" element={<AddProperty />} />{" "}
          <Route path="performance" element={<AgentPerformance />} />
          <Route path="profile" element={<OwnAgentProfile />} />
        </Route>
        {/* </Route> */}
        {/* <Route element={<ProtectRoute allowedRoles={["admin"]} />}> */}
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="owners" element={<AdminOwners />} />
          <Route path="agents" element={<AdminAgents />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="properties/pending" element={<PendingProperties />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="commissions" element={<AdminCommissions />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>

        <Route path="/servies" element={<SecureNetWebsite />} />
        <Route path="/a" element={<FullWebsite />} />
        <Route path="/profile" element={<CompanyProfilePDF />} />
      </Routes>
    </Router>
  );
}
