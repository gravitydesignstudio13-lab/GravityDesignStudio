import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  HiUsers,
  HiPencil,
  HiTrash,
  HiX,
  HiUpload,
  HiUser,
  HiPlus,
} from "react-icons/hi";
import * as Yup from "yup";

const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;

// Image size validation helper
const validateImageSize = (file, maxSizeMB = 10) => {
  const maxSizeInBytes = maxSizeMB * 1024 * 1024;
  if (file && file.size > maxSizeInBytes) {
    return {
      isValid: false,
      error: `Image size must be less than ${maxSizeMB} MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`
    };
  }
  return { isValid: true, error: null };
};

const AdminTeamPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(null);

  const fileInputRef = useRef(null);

  const getTeamMembers = async () => {
    try {
      setLoading(true);
      const req = await axios.get(`${BACKEND_URL}/api/team/all`);
      if (req?.data?.success) {
        setMembers(req.data.data || []);
      }
    } catch (error) {
      console.log(error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeamMembers();
  }, []);

  const handleDeleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      const req = await axios.delete(`${BACKEND_URL}/api/team/delete/${id}`);
      if (req?.data?.success) {
        toast.success("Member deleted successfully");
        getTeamMembers();
      }
    } catch {
      toast.error("Failed to delete member");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    role: Yup.string().required("Role is required"),
    description: Yup.string().required("Description is required"),
  });

  const openModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setPreview(member.image);
    } else {
      setEditingMember(null);
      setPreview(null);
    }
    setImageError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setPreview(null);
    setImageError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Team Members</h1>
            <p className="text-gray-500 mt-1">Manage your team members</p>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition shadow-md"
          >
            <HiPlus className="w-5 h-5" />
            Add Member
          </button>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow p-4 mb-8 inline-block">
          <div className="flex items-center gap-3">
            <HiUsers className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{members.length}</p>
              <p className="text-sm text-gray-500">Total Members</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Members Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-blue-600 text-sm font-medium mt-1">
                    {item.role}
                  </p>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => openModal(item)}
                      className="flex-1 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md font-medium flex items-center justify-center gap-1 hover:bg-blue-100 transition"
                    >
                      <HiPencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMember(item._id)}
                      className="flex-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-md font-medium flex items-center justify-center gap-1 hover:bg-red-100 transition"
                    >
                      <HiTrash className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && members.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <HiUsers className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No members yet
            </h3>
            <p className="text-gray-400">
              Click "Add Member" to get started
            </p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingMember ? "Edit Member" : "Add New Member"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              <Formik
                enableReinitialize
                initialValues={{
                  name: editingMember?.name || "",
                  role: editingMember?.role || "",
                  description: editingMember?.description || "",
                  image: null,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm, setSubmitting }) => {
                  try {
                    // Validate image size if a new image is being uploaded
                    if (values.image) {
                      const validation = validateImageSize(values.image);
                      if (!validation.isValid) {
                        toast.error(validation.error);
                        setSubmitting(false);
                        return;
                      }
                    }

                    const formData = new FormData();
                    formData.append("name", values.name);
                    formData.append("role", values.role);
                    formData.append("description", values.description);

                    if (values.image) {
                      formData.append("image", values.image);
                    }

                    let req;

                    if (editingMember) {
                      req = await axios.put(
                        `${BACKEND_URL}/api/team/update/${editingMember._id}`,
                        formData,
                      );
                    } else {
                      req = await axios.post(
                        `${BACKEND_URL}/api/team/add`,
                        formData,
                      );
                    }

                    if (req?.data?.success) {
                      toast.success(editingMember ? "Member updated!" : "Member added!");
                      resetForm();
                      closeModal();
                      getTeamMembers();
                    } else {
                      toast.error(req?.data?.message || "Something went wrong");
                    }
                  } catch (error) {
                    toast.error("Failed to save member");
                    console.error(error);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ setFieldValue, isSubmitting, errors, touched }) => (
                  <Form className="p-6 space-y-4">
                    {/* Image Upload */}
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-200">
                          {(preview || editingMember?.image) ? (
                            <img
                              src={preview || editingMember?.image}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <HiUser className="w-10 h-10 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full shadow-md hover:bg-blue-600 transition"
                        >
                          <HiUpload className="w-3 h-3" />
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              // Validate image size on selection
                              const validation = validateImageSize(file);
                              if (!validation.isValid) {
                                setImageError(validation.error);
                                setFieldValue("image", null);
                                setPreview(null);
                                e.target.value = "";
                                return;
                              }
                              
                              setImageError(null);
                              setFieldValue("image", file);
                              setPreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </div>
                      
                      {/* Image validation error message */}
                      {imageError && (
                        <p className="text-red-500 text-xs mt-2 text-center">{imageError}</p>
                      )}
                      
                      {/* Helper text */}
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Max file size: 10 MB
                      </p>
                    </div>

                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Enter full name"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.name && touched.name
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.name && touched.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Role Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role *
                      </label>
                      <Field
                        name="role"
                        type="text"
                        placeholder="e.g., Architect, Designer, Engineer"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.role && touched.role
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.role && touched.role && (
                        <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                      )}
                    </div>

                    {/* Description Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        rows="3"
                        placeholder="Enter description..."
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.description && touched.description
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.description && touched.description && (
                        <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Saving..." : editingMember ? "Update" : "Add"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default AdminTeamPage;