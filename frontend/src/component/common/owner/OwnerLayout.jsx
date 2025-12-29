import React from "react";
import { Outlet } from "react-router-dom";
import OwnerHeader from "./OwnerHeader";
import OwnerSidebar from "./OwnerSidebar";

const OwnerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerHeader />
      <div className="flex">
        <OwnerSidebar />
        <main className="flex-1 ml-0 lg:ml-8">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;