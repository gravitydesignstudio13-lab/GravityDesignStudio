import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminProjectTypePage = () => {
  const [projectTypes, setProjectTypes] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const getServices = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/service/find`);

      if (res?.data?.success) {
        setServices(res.data.data || []);
      } else if (Array.isArray(res.data)) {
        setServices(res.data);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.log("GET SERVICES ERROR =", error);
      setServices([]);
    }
  };

  const getProjectTypes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/project-type/all`);

      if (res?.data?.success) {
        setProjectTypes(res.data.data || []);
      } else {
        setProjectTypes([]);
      }
    } catch (error) {
      console.log("GET PROJECT TYPES ERROR =", error);
      setProjectTypes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
    getProjectTypes();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this project type?"
    );
    if (!ok) return;

    try {
      const res = await axios.delete(
        `${BACKEND_URL}/api/project-type/delete/${id}`
      );

      if (res?.data?.success) {
        toast.success(res.data.message || "Deleted successfully");
        getProjectTypes();
      }
    } catch (error) {
      console.log("DELETE PROJECT TYPE ERROR =", error);
      toast.error(
        error?.response?.data?.message || "Failed to delete project type"
      );
    }
  };

  const normalizeCategory = (title = "") => {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes("interior")) return "Interior";
    if (
      lowerTitle.includes("architecture") ||
      lowerTitle.includes("architect") ||
      lowerTitle.includes("exterior")
    ) {
      return "Architecture";
    }
    if (
      lowerTitle.includes("3d") ||
      lowerTitle.includes("visualization") ||
      lowerTitle.includes("render")
    ) {
      return "3D";
    }

    return title;
  };

  const categories = useMemo(() => {
    return [...new Set(services.map((item) => normalizeCategory(item.title)))];
  }, [services]);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-5">Manage Project Types</h1>

        <Formik
          initialValues={{
            category: "",
            typeName: "",
          }}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              const res = await axios.post(
                `${BACKEND_URL}/api/project-type/add`,
                values
              );

              if (res?.data?.success) {
                toast.success(
                  res.data.message || "Project type added successfully"
                );
                resetForm();
                getProjectTypes();
              }
            } catch (error) {
              console.log("ADD PROJECT TYPE ERROR =", error);
              toast.error(
                error?.response?.data?.message || "Failed to add project type"
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                as="select"
                name="category"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white w-full"
              >
                <option value="">Select category</option>
                {categories.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Field>

              <Field
                type="text"
                name="typeName"
                placeholder="Project type name"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none w-full"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-6 py-3 rounded-xl md:col-span-2 hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isSubmitting ? "Adding..." : "Add Project Type"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-5">All Project Types</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : projectTypes.length === 0 ? (
          <p className="text-gray-500">No project types found</p>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-4 px-4">SN</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Type Name</th>
                  <th className="py-4 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {projectTypes.map((item, index) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">{index + 1}</td>
                    <td className="py-4 px-4">{item.category}</td>
                    <td className="py-4 px-4">{item.typeName}</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
};

export default AdminProjectTypePage;