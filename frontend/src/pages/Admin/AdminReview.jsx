import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const getReviews = async () => {
    try {
      setLoading(true);
      const req = await axios.get(`${BACKEND_URL}/api/review/all`);

      if (req?.data?.success) {
        setReviews(req.data.data || []);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.log("GET REVIEWS ERROR =", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const handleDeleteReview = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this review?");
    if (!ok) return;

    try {
      const req = await axios.delete(`${BACKEND_URL}/api/review/delete/${id}`);

      if (req?.data?.success) {
        toast.success(req.data.message || "Review deleted successfully");
        getReviews();
      }
    } catch (error) {
      console.log("DELETE REVIEW ERROR =", error);
      toast.error(error?.response?.data?.message || "Failed to delete review");
    }
  };

  return (
    <div className="space-y-8">
      {/* Add Review Form */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-5">Manage Reviews</h1>

        <Formik
          initialValues={{
            name: "",
            profession: "",
            message: "",
            image: null,
          }}
          onSubmit={async (values, { resetForm, setSubmitting, setFieldValue }) => {
            try {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("profession", values.profession);
              formData.append("message", values.message);

              if (values.image) {
                formData.append("image", values.image);
              }

              const req = await axios.post(
                `${BACKEND_URL}/api/review/add`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );

              if (req?.data?.success) {
                toast.success(req.data.message || "Review added successfully");
                resetForm();
                setFieldValue("image", null);

                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }

                getReviews();
              }
            } catch (error) {
              console.log("ADD REVIEW ERROR =", error);
              toast.error(error?.response?.data?.message || "Failed to add review");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                type="text"
                name="name"
                placeholder="Reviewer name"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
              />

              <Field
                type="text"
                name="profession"
                placeholder="Reviewer profession"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white md:col-span-2"
              />

              <Field
                as="textarea"
                name="message"
                placeholder="Review message"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none md:col-span-2 h-32 resize-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-6 py-3 rounded-xl md:col-span-2 hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isSubmitting ? "Adding..." : "Add Review"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Review Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-5">All Reviews</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500">No reviews found</p>
        ) : (
          <table className="w-full min-w-[1000px] text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-4 px-4 font-semibold text-gray-700">SN</th>
                <th className="py-4 px-4 font-semibold text-gray-700">Image</th>
                <th className="py-4 px-4 font-semibold text-gray-700">Name</th>
                <th className="py-4 px-4 font-semibold text-gray-700">Profession</th>
                <th className="py-4 px-4 font-semibold text-gray-700">Message</th>
                <th className="py-4 px-4 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((item, index) => (
                <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4 px-4 font-medium">{index + 1}</td>

                  <td className="py-4 px-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-full"
                    />
                  </td>

                  <td className="py-4 px-4 font-medium text-gray-800">
                    {item.name}
                  </td>

                  <td className="py-4 px-4 text-gray-700">
                    {item.profession}
                  </td>

                  <td className="py-4 px-4 text-gray-600 max-w-md">
                    <p className="line-clamp-2">{item.message}</p>
                  </td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleDeleteReview(item._id)}
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

export default AdminReviewPage;