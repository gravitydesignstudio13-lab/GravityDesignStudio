import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;

const AdminReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  // ✅ GET REVIEWS
  const getReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/review/all`);
      if (res.data.success) setReviews(res.data.data);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/review/delete/${id}`);
      toast.success("Deleted");
      getReviews();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-10">

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-6">
          {editingReview ? "Edit Review" : "Add Review"}
        </h1>

        <Formik
          enableReinitialize
          initialValues={{
            name: editingReview?.name || "",
            description: editingReview?.description || "",
          }}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              let res;

              if (editingReview) {
                // UPDATE
                res = await axios.put(
                  `${BACKEND_URL}/api/review/update/${editingReview._id}`,
                  values
                );
              } else {
                // ADD
                res = await axios.post(
                  `${BACKEND_URL}/api/review/add`,
                  values
                );
              }

              if (res.data.success) {
                toast.success(editingReview ? "Updated" : "Added");

                resetForm();
                setEditingReview(null);
                getReviews();
              }
            } catch {
              toast.error("Action failed");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="grid md:grid-cols-2 gap-4">

              <Field
                name="name"
                placeholder="Reviewer Name"
                className="border p-3 rounded-xl"
              />

              <Field
                name="description"
                placeholder="Review Description"
                className="border p-3 rounded-xl"
              />

              <button
                type="submit"
                className="bg-[#7a4f1d] text-white py-3 rounded-xl md:col-span-2 hover:bg-[#5a3a12]"
              >
                {isSubmitting
                  ? "Saving..."
                  : editingReview
                  ? "Update Review"
                  : "Add Review"}
              </button>

              {editingReview && (
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="bg-gray-300 py-2 rounded-xl md:col-span-2"
                >
                  Cancel
                </button>
              )}

            </Form>
          )}
        </Formik>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>

        {loading ? (
          <p>Loading...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map((item) => {
              const firstLetter = item.name?.charAt(0).toUpperCase();

              return (
               <div
  key={item._id}
  className="group bg-gradient-to-br from-white to-[#f8f6f2] rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
>
  {/* Avatar + Name */}
  <div className="flex items-center gap-4 mb-4">
    <div className="h-14 w-14 rounded-full flex items-center justify-center 
      bg-gradient-to-br from-[#7a4f1d] to-[#c49a6c] 
      text-white text-lg font-bold shadow-md">
      {firstLetter}
    </div>

    <div>
      <h3 className="font-semibold text-gray-800 text-lg">
        {item.name}
      </h3>
      <p className="text-xs text-gray-400">Client</p>
    </div>
  </div>

  {/* Stars */}
  <div className="flex text-[#7a4f1d] mb-3 text-sm tracking-wide">
    {"★★★★★"}
  </div>

  {/* Review Text */}
  <p className="text-gray-600 text-sm leading-relaxed italic line-clamp-3">
    “{item.description}”
  </p>

  {/* Actions */}
  <div className="flex gap-2 mt-5">
    <button
      onClick={() => {
        setEditingReview(item);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="flex-1 bg-[#7a4f1d] text-white py-2 rounded-lg text-sm hover:bg-[#5a3a12] transition"
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(item._id)}
      className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 transition"
    >
      Delete
    </button>
  </div>
</div>
              );
            })}
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminReviewPage;