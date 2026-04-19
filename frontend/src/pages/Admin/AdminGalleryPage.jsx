import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminGalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // ✅ FIXED
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
    const ok = window.confirm("Are you sure you want to delete this item?");
    if (!ok) return;

    try {
      const req = await axios.delete(
        `${BACKEND_URL}/api/gallery/delete/${id}`
      );

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
    <div className="space-y-8">
      {/* ADD GALLERY */}
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
                toast.success("Added successfully");
                resetForm();
                setFieldValue("image", null);
                fileInputRef.current.value = "";
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
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                as="select"
                name="category"
                className="border rounded-xl px-4 py-3"
              >
                <option value="">Select category</option>

                {/* ✅ SAFE MAP */}
                {Array.isArray(services) &&
                  services.map((item) => (
                    <option key={item._id} value={item.title}>
                      {item.title}
                    </option>
                  ))}
              </Field>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFieldValue("image", e.currentTarget.files[0])
                }
                className="border rounded-xl px-4 py-3"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-6 py-3 rounded-xl md:col-span-2"
              >
                {isSubmitting ? "Adding..." : "Add Gallery"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* GALLERY TABLE */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-5">All Gallery</h2>

        {loading ? (
          <p>Loading...</p>
        ) : gallery.length === 0 ? (
          <p>No data</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>SN</th>
                <th>Image</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {gallery.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={item.image}
                      className="h-16 w-20 object-cover"
                    />
                  </td>

                  <td>{item.category}</td>

                  <td>
                    <button
                      onClick={() => handleDeleteGallery(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
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

      <ToastContainer />
    </div>
  );
};

export default AdminGalleryPage;