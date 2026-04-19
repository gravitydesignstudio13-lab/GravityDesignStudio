import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminServicePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const getServices = async () => {
    try {
      setLoading(true);
      const req = await axios.get(`${BACKEND_URL}/api/service/find`);
      setServices(req?.data?.data || []); // ✅ FIXED
    } catch (error) {
      console.log(error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const handleDeleteService = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this service?");
    if (!ok) return;

    try {
      const req = await axios.delete(
        `${BACKEND_URL}/api/service/delete/${id}` // ✅ FIXED URL
      );

      if (req?.data?.success) {
        toast.success(req.data.message);
        getServices();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to delete service..."
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* ADD SERVICE */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-5">Manage Services</h1>

        <Formik
          initialValues={{
            title: "",
            detail: "",
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

              const req = await axios.post(
                `${BACKEND_URL}/api/service/create`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );

              if (req?.data?.success) {
                toast.success(req.data.message);
                resetForm();
                getServices();
              }
            } catch (error) {
              console.log(error);
              toast.error(
                error?.response?.data?.message || "Failed to add service"
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                type="text"
                name="title"
                placeholder="Service title"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFieldValue("image", e.currentTarget.files[0])
                }
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
              />

              <Field
                as="textarea"
                name="detail"
                placeholder="Service description"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none md:col-span-2 h-32 resize-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-6 py-3 rounded-xl md:col-span-2 hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isSubmitting ? "Adding..." : "Add Service"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* SERVICE LIST */}
      <div className="bg-white rounded-2xl shadow-sm p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-5">All Services</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : !Array.isArray(services) || services.length === 0 ? (
          <p className="text-gray-500">No services found</p>
        ) : (
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-4 px-4">Image</th>
                <th className="py-4 px-4">Title</th>
                <th className="py-4 px-4">Description</th>
                <th className="py-4 px-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {services.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-16 w-20 object-cover rounded-lg"
                    />
                  </td>

                  <td className="py-4 px-4 font-medium">
                    {item.title}
                  </td>

                  <td className="py-4 px-4 text-gray-600 max-w-md">
                    <p className="line-clamp-2">{item.detail}</p>
                  </td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleDeleteService(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
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

export default AdminServicePage;