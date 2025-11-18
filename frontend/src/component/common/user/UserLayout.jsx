import React from 'react';
import { Outlet } from 'react-router-dom';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      <div className="flex">
        <UserSidebar />
        <main className="flex-1 ml-0 lg:ml-8">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;