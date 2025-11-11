import React, { useState, useEffect } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "+971501234567",
        role: "user",
        status: "active",
        joinedDate: "2024-01-15",
        propertiesListed: 0,
      },
      {
        id: 2,
        name: "Sarah Wilson",
        email: "sarah@example.com",
        phone: "+971502345678",
        role: "agent",
        status: "active",
        joinedDate: "2024-01-10",
        propertiesListed: 12,
      },
      {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        phone: "+971503456789",
        role: "user",
        status: "inactive",
        joinedDate: "2024-01-05",
        propertiesListed: 0,
      },
      {
        id: 4,
        name: "Emily Brown",
        email: "emily@example.com",
        phone: "+971504567890",
        role: "agent",
        status: "active",
        joinedDate: "2024-01-01",
        propertiesListed: 8,
      },
      {
        id: 5,
        name: "David Smith",
        email: "david@example.com",
        phone: "+971505678901",
        role: "admin",
        status: "active",
        joinedDate: "2023-12-20",
        propertiesListed: 0,
      },
    ];

    setUsers(mockUsers);
    setLoading(false);
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const updateUserStatus = (userId, status) => {
    setUsers(
      users.map((user) => (user.id === userId ? { ...user, status } : user))
    );
  };

  const deleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-2">
            Manage all users and agents in the system
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="agent">Agents</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Properties
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "agent"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.propertiesListed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() =>
                        updateUserStatus(
                          user.id,
                          user.status === "active" ? "inactive" : "active"
                        )
                      }
                      className={`px-3 py-1 rounded text-xs ${
                        user.status === "active"
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No users found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {users.filter((u) => u.role === "user").length}
            </p>
            <p className="text-gray-600">Total Users</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {users.filter((u) => u.role === "agent").length}
            </p>
            <p className="text-gray-600">Total Agents</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {users.filter((u) => u.role === "admin").length}
            </p>
            <p className="text-gray-600">Total Admins</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-600">
              {users.filter((u) => u.status === "active").length}
            </p>
            <p className="text-gray-600">Active Users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
