import React, { useState } from "react";

const AdminCommissions = () => {
  const [commissionRate, setCommissionRate] = useState({
    residential: "5",
    commercial: "7",
    luxury: "10",
    rental: "1",
  });

  const [transactions] = useState([
    {
      id: 1,
      property: "Beach Villa",
      agent: "John Doe",
      owner: "Mike Smith",
      amount: "$60,000",
      status: "Paid",
      date: "2024-01-10",
    },
    {
      id: 2,
      property: "City Apartment",
      agent: "Jane Smith",
      owner: "Sarah Johnson",
      amount: "$12,500",
      status: "Pending",
      date: "2024-01-12",
    },
  ]);

  const saveCommissionRates = () => {
    console.log("Saving rates:", commissionRate);
    alert("Commission rates updated successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Commission Management</h1>

      {/* Commission Rates */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Set Commission Rates (%)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Residential Sales
            </label>
            <input
              type="number"
              value={commissionRate.residential}
              onChange={(e) =>
                setCommissionRate({
                  ...commissionRate,
                  residential: e.target.value,
                })
              }
              min="1"
              max="20"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commercial Sales
            </label>
            <input
              type="number"
              value={commissionRate.commercial}
              onChange={(e) =>
                setCommissionRate({
                  ...commissionRate,
                  commercial: e.target.value,
                })
              }
              min="1"
              max="20"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Luxury Properties
            </label>
            <input
              type="number"
              value={commissionRate.luxury}
              onChange={(e) =>
                setCommissionRate({ ...commissionRate, luxury: e.target.value })
              }
              min="1"
              max="20"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rental Properties
            </label>
            <input
              type="number"
              value={commissionRate.rental}
              onChange={(e) =>
                setCommissionRate({ ...commissionRate, rental: e.target.value })
              }
              min="0.5"
              max="5"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={saveCommissionRates}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Rates
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold mb-4">
          Recent Commission Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Property
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Agent
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Owner
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-4 py-3">
                    <div className="font-medium">{transaction.property}</div>
                  </td>
                  <td className="px-4 py-3">{transaction.agent}</td>
                  <td className="px-4 py-3">{transaction.owner}</td>
                  <td className="px-4 py-3 font-bold">{transaction.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        transaction.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{transaction.date}</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      {transaction.status === "Pending"
                        ? "Mark Paid"
                        : "Receipt"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCommissions;
