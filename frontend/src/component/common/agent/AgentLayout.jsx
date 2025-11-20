import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AgentHeader from "./AgentHeader";
import AgentSidebar from "./AgentSidebar";

const AgentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = {
    name: "Ahmed Al Mansouri",
    role: "Senior Real Estate Consultant",
    initials: "AM",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AgentHeader onMenuClick={() => setSidebarOpen(true)} user={user} />
      <div className="flex">
        <AgentSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          user={user}
        />{" "}
        <main className="flex-1 ml-0 lg:ml-8 py-3.5">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentLayout;
