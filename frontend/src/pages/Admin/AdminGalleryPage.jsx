import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const AdminGalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const fileInputRef = useRef(null);

const getServices = async () => {
    try {
      setLoading(true);
      const req = await axios.get(`${BACKEND_URL}/api/service/find`);
      setServices(req?.data || []);
    } catch (error) {
      console.log(error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

 

  const getGallery = async () => {
    try {
      setLoading(true);
      const req = await axios.get(
        `${BACKEND_URL}/api/gallery/all?page=1&limit=100&category=All`
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

  const handleDeleteGallery = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this gallery item?");
    if (!ok) return;

    try {
      const req = await axios.delete(`${BACKEND_URL}/api/gallery/delete/${id}`);

      if (req?.data?.success) {
        toast.success(req.data.message || "Gallery item deleted successfully");
        getGallery();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to delete gallery item");
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-5">Manage Gallery</h1>

        <Formik
          initialValues={{
            category: "",
            image: null,
          }}
          onSubmit={async (values, { resetForm, setSubmitting, setFieldValue }) => {
            try {
              const formData = new FormData();
              formData.append("category", values.category);

              if (values.image) {
                formData.append("image", values.image);
              }

              const req = await axios.post(
                `${BACKEND_URL}/api/gallery/add`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );

              if (req?.data?.success) {
                toast.success(req.data.message || "Gallery item added successfully");
                resetForm();
                setFieldValue("image", null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
                getGallery();
              }
            } catch (error) {
              console.log(error);
              toast.error(error?.response?.data?.message || "Failed to add gallery item");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                as="select"
                name="category"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white"
              >
                <option value="">Select category</option>
                {services.map((item, index) => (
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </Field>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-6 py-3 rounded-xl md:col-span-2 hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isSubmitting ? "Adding..." : "Add Gallery Item"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-5">All Gallery Items</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : gallery.length === 0 ? (
          <p className="text-gray-500">No gallery items found</p>
        ) : (
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-4 px-4 font-semibold text-gray-700">SN</th>
                <th className="py-4 px-4 font-semibold text-gray-700">Image</th>
                <th className="py-4 px-4 font-semibold text-gray-700">Category</th>
                <th className="py-4 px-4 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>

            <tbody>
              {gallery.map((item, index) => (
                <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4 px-4 font-medium">{index + 1}</td>

                  <td className="py-4 px-4">
                    <img
                      src={item.image}
                      alt={item.category}
                      className="h-16 w-20 object-cover rounded-lg"
                    />
                  </td>

                  <td className="py-4 px-4 font-medium text-gray-800">
                    {item.category}
                  </td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleDeleteGallery(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
};

export default AdminGalleryPage;