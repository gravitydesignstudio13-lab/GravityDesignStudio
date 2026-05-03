import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Plus,
  Trash2,
  Upload,
  Image,
  X,
  Folder,
  Images,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;

const AdminGalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const getServices = async () => {
    try {
      const req = await axios.get(`${BACKEND_URL}/api/service/find`);
      setServices(req?.data?.data || []);
    } catch (error) {
      console.log(error);
      setServices([]);
    }
  };

  const getGallery = async () => {
    try {
      setLoading(true);
      const req = await axios.get(
        `${BACKEND_URL}/api/gallery/all?page=1&limit=100&category=All`,
      );
      if (req?.data?.success) {
        setGallery(req.data.data || []);
      }
    } catch (error) {
      console.log(error);
      setGallery([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGallery();
    getServices();
  }, []);

  const handleDeleteGallery = async (id, e) => {
    e.stopPropagation(); // Prevent triggering the image click
    const ok = window.confirm("Are you sure you want to delete this item?");
    if (!ok) return;

    try {
      const req = await axios.delete(`${BACKEND_URL}/api/gallery/delete/${id}`);
      if (req?.data?.success) {
        toast.success(req.data.message || "Deleted successfully");
        getGallery();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete");
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
                Gallery Management
              </h1>
              <p className="text-gray-500 mt-2">
                Upload and manage your gallery images
              </p>
            </div>
            <div className="bg-white rounded-full p-3 shadow-md">
              <Images className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Add Gallery Form - Modern Card */}
        <div className="mb-10">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#7a5703] to-[#5c3f02] px-6 py-4">
              <div className="flex items-center gap-3">
                <Plus className="w-5 h-5 text-white" />
                <h2 className="text-xl font-semibold text-white">
                  Add New Gallery Image
                </h2>
              </div>
            </div>

            <div className="p-6">
              <Formik
                initialValues={{
                  category: "",
                  image: null,
                }}
                onSubmit={async (
                  values,
                  { resetForm, setSubmitting, setFieldValue },
                ) => {
                  try {
                    const formData = new FormData();
                    formData.append("category", values.category);
                    if (values.image) {
                      formData.append("image", values.image);
                    }

                    const req = await axios.post(
                      `${BACKEND_URL}/api/gallery/add`,
                      formData,
                      { headers: { "Content-Type": "multipart/form-data" } },
                    );

                    if (req?.data?.success) {
                      toast.success("Image added successfully");
                      resetForm();
                      setFieldValue("image", null);
                      setPreview(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                      getGallery();
                    }
                  } catch (error) {
                    console.log(error);
                    toast.error("Upload failed");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Category Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Folder className="w-4 h-4 inline mr-1" /> Select
                          Category *
                        </label>
                        <Field
                          as="select"
                          name="category"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7a5703] focus:border-transparent transition outline-none bg-white"
                        >
                          <option value="">Choose a category</option>
                          {Array.isArray(services) &&
                            services.map((item) => (
                              <option key={item._id} value={item.title}>
                                {item.title}
                              </option>
                            ))}
                        </Field>
                      </div>

                      {/* Image Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Image className="w-4 h-4 inline mr-1" /> Upload Image
                          *
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.currentTarget.files[0];

                                if (!file) return;

                                // ✅ 10MB limit
                                const MAX_SIZE = 10 * 1024 * 1024; // 10MB

                                if (file.size > MAX_SIZE) {
                                  toast.error(
                                    "Image size must be less than 10MB ❌",
                                  );

                                  // clear input
                                  if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                  }

                                  setFieldValue("image", null);
                                  setPreview(null);
                                  return;
                                }

                                // ✅ valid file
                                setFieldValue("image", file);
                                setPreview(URL.createObjectURL(file));
                              }}
                              className="hidden"
                              id="image-upload"
                            />
                            <label
                              htmlFor="image-upload"
                              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#7a5703] transition group bg-gray-50"
                            >
                              <Upload className="w-5 h-5 text-gray-400 group-hover:text-[#7a5703]" />
                              <span className="text-gray-500 group-hover:text-[#7a5703]">
                                Choose image
                              </span>
                            </label>
                          </div>

                          {/* Preview */}
                          {preview && (
                            <div className="relative">
                              <img
                                src={preview}
                                alt="preview"
                                className="h-16 w-20 rounded-lg object-cover border-2 border-[#7a5703] shadow-md"
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
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#7a5703] to-[#5c3f02] text-white py-3 rounded-xl font-semibold hover:from-[#5c3f02] hover:to-[#3e2a01]  transition-all transform hover:scale-[1.02] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Uploading...
                        </div>
                      ) : (
                        "Upload to Gallery"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Gallery Images
              </h2>
              <p className="text-gray-500 mt-1">
                {gallery.length} images total
              </p>
            </div>
            <div className="bg-[#f3e9d2] rounded-full px-4 py-2">
              <span className="text-[#7a5703] font-semibold">
                {gallery.length}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#7a5703] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Loading gallery...</p>
            </div>
          ) : gallery.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <Images className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No images yet
              </h3>
              <p className="text-gray-400">
                Upload your first gallery image above
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gallery.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div
                    className="relative aspect-square overflow-hidden cursor-pointer bg-gray-100"
                    onClick={() => setSelectedImage(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.category}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-[#7a4f1d]/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full z-10">
                      {item.category}
                    </div>

                    {/* Delete Button - Now on top layer */}
                    <button
                      onClick={(e) => handleDeleteGallery(item._id, e)}
                      className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 z-20 shadow-lg"
                      title="Delete image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Overlay - Now behind buttons */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-0 pointer-events-none">
                      <Eye className="w-5 h-5 text-white" />
                      <span className="text-white text-sm font-medium">
                        Click to view
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="text-sm text-gray-600 truncate font-medium">
                      {item.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg"
              onClick={() => setSelectedImage(null)}
            >
              <div className="flex items-center justify-center min-h-screen p-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-4xl w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-12 right-0 text-white hover:text-gray-300 transition z-10"
                  >
                    <X className="w-8 h-8" />
                  </button>

                  <img
                    src={selectedImage.image}
                    alt={selectedImage.category}
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />

                  <div className="mt-4 text-center">
                    <span className="inline-block px-3 py-1 bg-[#7a4f1d] text-white text-sm rounded-full">
                      {selectedImage.category}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

export default AdminGalleryPage;
