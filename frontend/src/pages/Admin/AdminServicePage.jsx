import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  HiPlus, 
  HiPencil, 
  HiTrash, 
  HiX, 
  HiUpload,
  HiDocumentText
} from "react-icons/hi";

const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;

const AdminServicePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileInputRef = useRef(null);

  const getServices = async () => {
    try {
      setLoading(true);
      const req = await axios.get(`${BACKEND_URL}/api/service/find`);
      setServices(req?.data?.data || []);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const handleDeleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/service/delete/${id}`);
      toast.success("Service deleted successfully");
      getServices();
    } catch {
      toast.error("Delete failed");
    }
  };

  const openAddModal = () => {
    setEditingService(null);
    setPreview(null);
    setIsModalOpen(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setPreview(service.image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Service Management
              </h1>
              <p className="text-gray-500 mt-2">Manage your business services</p>
            </div>
            <button
              onClick={openAddModal}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
            >
              <HiPlus className="w-5 h-5" />
              Add New Service
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">All Services</h2>
              <p className="text-gray-500 mt-1">{services.length} services total</p>
            </div>
            <div className="bg-blue-100 rounded-full px-4 py-2">
              <span className="text-blue-700 font-semibold">{services.length}</span>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <HiDocumentText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Services Yet</h3>
              <p className="text-gray-400">Click "Add New Service" to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((item) => (
                <div
                  key={item._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {item.detail}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-medium text-sm flex items-center justify-center gap-1"
                      >
                        <HiPencil className="w-4 h-4" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteService(item._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        <HiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal with Blur Background */}
        {isModalOpen && (
          <>
            {/* Overlay with blur effect */}
            <div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all duration-300"
              onClick={closeModal}
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 opacity-100">
                  {/* Modal Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">
                        {editingService ? "Edit Service" : "Add New Service"}
                      </h3>
                      <button
                        onClick={closeModal}
                        className="text-white hover:text-gray-200 transition-all hover:rotate-90 duration-200"
                      >
                        <HiX className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Body */}
                  <div className="px-6 py-6">
                    <Formik
                      enableReinitialize
                      initialValues={{
                        title: editingService?.title || "",
                        detail: editingService?.detail || "",
                        image: null,
                      }}
                      onSubmit={async (values, { resetForm, setSubmitting }) => {
                        try {
                          const formData = new FormData();
                          formData.append("title", values.title);
                          formData.append("detail", values.detail);

                          if (values.image) {
                            formData.append("image", values.image);
                          }

                          let req;

                          if (editingService) {
                            req = await axios.put(
                              `${BACKEND_URL}/api/service/update/${editingService._id}`,
                              formData,
                              { headers: { "Content-Type": "multipart/form-data" } }
                            );
                          } else {
                            req = await axios.post(
                              `${BACKEND_URL}/api/service/create`,
                              formData,
                              { headers: { "Content-Type": "multipart/form-data" } }
                            );
                          }

                          if (req?.data?.success) {
                            toast.success(editingService ? "Service updated successfully" : "Service added successfully");
                            resetForm();
                            closeModal();
                            getServices();
                          }
                        } catch (error) {
                          toast.error("Action failed");
                        } finally {
                          setSubmitting(false);
                        }
                      }}
                    >
                      {({ isSubmitting, setFieldValue, values }) => (
                        <Form className="space-y-5">
                          {/* Title */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Service Title *
                            </label>
                            <Field
                              name="title"
                              placeholder="Enter service title"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                            />
                          </div>

                          {/* Description */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Service Description *
                            </label>
                            <Field
                              as="textarea"
                              name="detail"
                              rows="4"
                              placeholder="Describe your service in detail..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none outline-none"
                            />
                          </div>

                          {/* Image Upload */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Service Image
                            </label>
                            <div className="flex items-center gap-4 flex-wrap">
                              <div className="flex-1 min-w-[150px]">
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.currentTarget.files[0];
                                    if (file) {
                                      setFieldValue("image", file);
                                      setPreview(URL.createObjectURL(file));
                                    }
                                  }}
                                  className="hidden"
                                  id="modal-image-upload"
                                />
                                <label
                                  htmlFor="modal-image-upload"
                                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition group bg-gray-50"
                                >
                                  <HiUpload className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                                  <span className="text-gray-500 group-hover:text-blue-500 text-sm">
                                    Choose image
                                  </span>
                                </label>
                              </div>
                              
                              {/* Preview */}
                              {(preview || editingService?.image || values.image) && (
                                <div className="relative">
                                  <img
                                    src={preview || editingService?.image || (values.image && URL.createObjectURL(values.image))}
                                    alt="preview"
                                    className="h-20 w-28 rounded-lg object-cover border-2 border-blue-500 shadow-md"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setPreview(null);
                                      setFieldValue("image", null);
                                      if (fileInputRef.current) {
                                        fileInputRef.current.value = "";
                                      }
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                                  >
                                    <HiX className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Modal Buttons */}
                          <div className="flex gap-3 pt-4">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50"
                            >
                              {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                  Saving...
                                </div>
                              ) : (
                                editingService ? "Update Service" : "Add Service"
                              )}
                            </button>
                            
                            <button
                              type="button"
                              onClick={closeModal}
                              className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <ToastContainer 
          position="top-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default AdminServicePage;