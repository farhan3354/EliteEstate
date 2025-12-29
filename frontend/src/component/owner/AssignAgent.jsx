import React, { useState } from "react";

const AssignAgent = () => {
  const [agents] = useState([
    {
      id: 1,
      name: "John Doe",
      specialization: "Residential",
      rating: 4.8,
      properties: 24,
    },
    {
      id: 2,
      name: "Jane Smith",
      specialization: "Commercial",
      rating: 4.9,
      properties: 18,
    },
    {
      id: 3,
      name: "Mike Johnson",
      specialization: "Luxury",
      rating: 4.7,
      properties: 32,
    },
  ]);

  const [properties] = useState([
    { id: 1, name: "Modern Villa", type: "Sale" },
    { id: 2, name: "City Apartment", type: "Rent" },
    { id: 3, name: "Beach House", type: "Sale" },
  ]);

  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [commission, setCommission] = useState("5");
  const [agreement, setAgreement] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      property: selectedProperty,
      agent: selectedAgent,
      commission,
      agreement,
    });
    alert("Agent assigned successfully!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Assign Agent to Property</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Property *
            </label>
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Choose a property</option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name} ({property.type})
                </option>
              ))}
            </select>
          </div>

          {/* Available Agents */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Agent *
            </label>
            <div className="space-y-4">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedAgent === agent.id.toString()
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedAgent(agent.id.toString())}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">
                        {agent.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{agent.name}</h3>
                      <p className="text-sm text-gray-600">
                        {agent.specialization} Specialist
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 font-medium">{agent.rating}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {agent.properties} properties
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commission */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commission Rate (%) *
            </label>
            <input
              type="number"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              min="1"
              max="20"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Standard commission rates are 5-7%
            </p>
          </div>

          {/* Agreement Terms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Terms (Optional)
            </label>
            <textarea
              value={agreement}
              onChange={(e) => setAgreement(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add any specific terms or conditions..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium"
            >
              Assign Agent
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedProperty("");
                setSelectedAgent("");
                setCommission("5");
                setAgreement("");
              }}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 font-medium"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Information Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-3">
            How Agent Assignment Works:
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span>
                Selected agent will be notified and can accept/reject the
                assignment
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span>
                Once accepted, agent will manage the property listing and
                showings
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span>Commission is paid only upon successful sale/rental</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span>
                You can manage multiple agents for different properties
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AssignAgent;
