import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { locationAPI } from "../../services/api";
import { FiPlus, FiEdit2, FiTrash2, FiImage, FiCheck, FiX, FiStar } from "react-icons/fi";
import Swal from "sweetalert2";

const ManageLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await locationAPI.getAll();
      setLocations(response.data.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      Swal.fire("Error", "Failed to fetch locations", "error");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log("DEBUG: ManageLocations onSubmit data:", data);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("isPopular", data.isPopular);
      
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      if (editingLocation) {
        await locationAPI.update(editingLocation._id, formData);
        Swal.fire("Updated", "Location updated successfully", "success");
      } else {
        await locationAPI.create(formData);
        Swal.fire("Created", "Location created successfully", "success");
      }

      closeModal();
      fetchLocations();
    } catch (error) {
      console.error("Error saving location:", error);
      Swal.fire("Error", error.response?.data?.message || "Failed to save location", "error");
    }
  };

  const handleEdit = (location) => {
    setEditingLocation(location);
    setValue("name", location.name);
    setValue("description", location.description);
    setValue("isPopular", location.isPopular);
    setPreviewImage(location.image);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await locationAPI.delete(id);
        Swal.fire("Deleted!", "Location has been deleted.", "success");
        fetchLocations();
      } catch (error) {
        Swal.fire("Error", "Failed to delete location", "error");
      }
    }
  };

  const openModal = () => {
    setEditingLocation(null);
    setPreviewImage(null);
    reset({
      name: "",
      description: "",
      isPopular: false,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLocation(null);
    setPreviewImage(null);
    reset();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Locations</h1>
          <p className="text-gray-600">Add or edit cities for property listings</p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus />
          <span>Add Location</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {locations.map((location) => (
            <div key={location._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
              <div className="relative h-48">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex space-x-3 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(location);
                    }}
                    className="p-3 bg-blue-600 text-white rounded-lg shadow-xl hover:bg-blue-700 transition-all transform hover:scale-110 flex items-center justify-center"
                    title="Edit Location"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(location._id);
                    }}
                    className="p-3 bg-red-600 text-white rounded-lg shadow-xl hover:bg-red-700 transition-all transform hover:scale-110 flex items-center justify-center"
                    title="Delete Location"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
                {location.isPopular && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full shadow-lg flex items-center space-x-1 text-xs font-bold">
                    <FiStar className="fill-current" size={10} />
                    <span>Popular</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {location.description || "No description provided."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editingLocation ? "Edit Location" : "Add New Location"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Location name is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Lahore"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell something about this city..."
                ></textarea>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPopular"
                  {...register("isPopular")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isPopular" className="text-sm font-medium text-gray-700">
                  Mark as Popular (Show on Home Page)
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                  <div className="space-y-1 text-center">
                    {previewImage ? (
                      <div className="relative inline-block">
                        <img src={previewImage} alt="Preview" className="h-32 w-auto rounded-lg" />
                        <button
                          type="button"
                          onClick={() => setPreviewImage(null)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              {...register("image", {
                                required: !editingLocation && "Image is required",
                                onChange: (e) => handleImageChange(e),
                              })}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
              </div>

              <div className="pt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md transition-shadow"
                >
                  {editingLocation ? "Update Location" : "Create Location"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLocations;
