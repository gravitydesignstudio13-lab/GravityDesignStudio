
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminTeamPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const getTeamMembers = async () => {
    try {
      setLoading(true);
      const req = await axios.get(`${BACKEND_URL}/api/team/all`);

      if (req?.data?.success) {
        setMembers(req.data.data || []);
      } else {
        setMembers([]);
      }
    } catch (error) {
      console.log("GET TEAM MEMBERS ERROR =", error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeamMembers();
  }, []);

  const handleDeleteMember = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this team member?");
    if (!ok) return;

    try {
      const req = await axios.delete(`${BACKEND_URL}/api/team/delete/${id}`);

      if (req?.data?.success) {
        toast.success(req.data.message || "Team member deleted successfully");
        getTeamMembers();
      }
    } catch (error) {
      console.log("DELETE TEAM MEMBER ERROR =", error);
      toast.error(error?.response?.data?.message || "Failed to delete team member");
    }
  };

  return (
    <div className="space-y-8">
      {/* Add Team Member Form */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-5">Manage Team Members</h1>

        <Formik
          initialValues={{
            name: "",
            role: "",
            image: null,
          }}
          onSubmit={async (values, { resetForm, setSubmitting, setFieldValue }) => {
            try {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("role", values.role);

              if (values.image) {
                formData.append("image", values.image);
              }

              const req = await axios.post(
                `${BACKEND_URL}/api/team/add`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );

              if (req?.data?.success) {
                toast.success(req.data.message || "Team member added successfully");
                resetForm();
                setFieldValue("image", null);

                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }

                getTeamMembers();
              }
            } catch (error) {
              console.log("ADD TEAM MEMBER ERROR =", error);
              toast.error(error?.response?.data?.message || "Failed to add team member");
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
                placeholder="Team member name"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
              />

              <Field
                type="text"
                name="role"
                placeholder="Team member role"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white md:col-span-2"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-6 py-3 rounded-xl md:col-span-2 hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isSubmitting ? "Adding..." : "Add Team Member"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Team Member Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-5">All Team Members</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : members.length === 0 ? (
          <p className="text-gray-500">No team members found</p>
        ) : (
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-4 px-4 font-semibold text-gray-700">SN</th>
                <th className="py-4 px-4 font-semibold text-gray-700">Image</th>
                <th className="py-4 px-4 font-semibold text-gray-700">Name</th>
                <th className="py-4 px-4 font-semibold text-gray-700">Role</th>
                <th className="py-4 px-4 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>

            <tbody>
              {members.map((item, index) => (
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
                    {item.role}
                  </td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleDeleteMember(item._id)}
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

export default AdminTeamPage;