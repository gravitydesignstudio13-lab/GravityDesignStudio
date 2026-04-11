import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);

  const heroInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const getServices = async () => {
    try {
      const req = await axios.get(`${BACKEND_URL}/api/service/find`);

      if (req?.data?.success) {
        setServices(req.data.data || []);
      } else if (Array.isArray(req?.data)) {
        setServices(req.data);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.log("GET SERVICES ERROR =", error);
      setServices([]);
    }
  };

  const getProjects = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BACKEND_URL}/api/project/all?page=1&limit=100`
      );

      if (res?.data?.success) {
        setProjects(res.data.data || []);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.log("GET PROJECTS ERROR =", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const getAllProjectTypes = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/project-type/all`);

      if (res?.data?.success) {
        setProjectTypes(res.data.data || []);
      } else {
        setProjectTypes([]);
      }
    } catch (error) {
      console.log("GET PROJECT TYPES ERROR =", error);
      setProjectTypes([]);
    }
  };

  useEffect(() => {
    getProjects();
    getServices();
    getAllProjectTypes();
  }, []);

  const handleDeleteProject = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this project?");
    if (!ok) return;

    try {
      const res = await axios.delete(`${BACKEND_URL}/api/project/delete/${id}`);

      if (res?.data?.success) {
        toast.success(res.data.message || "Project deleted successfully");
        getProjects();
      }
    } catch (error) {
      console.log("DELETE PROJECT ERROR =", error);
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Failed to delete project"
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

  const getDynamicProjectTypesByCategory = (category) => {
    if (!category) return [];

    return projectTypes.filter(
      (item) => normalizeCategory(item.category) === normalizeCategory(category)
    );
  };

  const categoryOptions = [...new Set(services.map((item) => item.title))];

  return (
    <div className="space-y-8">
      {/* Add Project Form */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-5">Manage Projects</h1>

        <Formik
          initialValues={{
            title: "",
            category: "",
            projectType: "",
            location: "",
            year: "",
            client: "",
            area: "",
            service: "",
            description: "",
            challenge: "",
            solution: "",
            heroImage: null,
            gallery: [],
          }}
          onSubmit={async (
            values,
            { resetForm, setSubmitting, setFieldValue }
          ) => {
            try {
              const formData = new FormData();

              formData.append("title", values.title);
              formData.append("category", values.category);
              formData.append("projectType", values.projectType);
              formData.append("location", values.location);
              formData.append("year", values.year);
              formData.append("client", values.client);
              formData.append("area", values.area);
              formData.append("service", values.service);
              formData.append("description", values.description);
              formData.append("challenge", values.challenge);
              formData.append("solution", values.solution);

              if (values.heroImage) {
                formData.append("heroImage", values.heroImage);
              }

              if (values.gallery && values.gallery.length > 0) {
                values.gallery.forEach((file) => {
                  formData.append("gallery", file);
                });
              }

              const res = await axios.post(
                `${BACKEND_URL}/api/project/add`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );

              if (res?.data?.success) {
                toast.success(res.data.message || "Project added successfully");

                resetForm();
                setFieldValue("heroImage", null);
                setFieldValue("gallery", []);

                if (heroInputRef.current) {
                  heroInputRef.current.value = "";
                }

                if (galleryInputRef.current) {
                  galleryInputRef.current.value = "";
                }

                getProjects();
              }
            } catch (error) {
              console.log("ADD PROJECT ERROR =", error);
              toast.error(
                error?.response?.data?.error ||
                  error?.response?.data?.message ||
                  "Failed to add project"
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => {
            const filteredProjectTypes = getDynamicProjectTypesByCategory(
              values.category
            );

            return (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  type="text"
                  name="title"
                  placeholder="Project title"
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none w-full"
                />

                <Field
                  as="select"
                  name="category"
                  onChange={(e) => {
                    setFieldValue("category", e.target.value);
                    setFieldValue("projectType", "");
                  }}
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white w-full"
                >
                  <option value="">Select category</option>
                  {categoryOptions.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Field>

                <Field
                  as="select"
                  name="projectType"
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white w-full"
                >
                  <option value="">Select project type</option>
                  {filteredProjectTypes.map((type) => (
                    <option key={type._id} value={type.typeName}>
                      {type.typeName}
                    </option>
                  ))}
                </Field>

                <Field
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none w-full"
                />

                <Field
                  type="text"
                  name="year"
                  placeholder="Year"
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none w-full"
                />

                <Field
                  type="text"
                  name="client"
                  placeholder="Client"
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none w-full"
                />

                <Field
                  type="text"
                  name="area"
                  placeholder="Area"
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none w-full"
                />

                <Field
                  type="text"
                  name="service"
                  placeholder="Service"
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none md:col-span-2 w-full"
                />

                <Field
                  as="textarea"
                  name="description"
                  placeholder="Project description"
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none md:col-span-2 h-28 resize-none w-full"
                />

                <Field
                  as="textarea"
                  name="challenge"
                  placeholder="Project challenge"
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none md:col-span-2 h-28 resize-none w-full"
                />

                <Field
                  as="textarea"
                  name="solution"
                  placeholder="Project solution"
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none md:col-span-2 h-28 resize-none w-full"
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Hero Image
                  </label>
                  <input
                    ref={heroInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFieldValue("heroImage", e.currentTarget.files[0])
                    }
                    className="border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Gallery Images
                  </label>
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setFieldValue("gallery", Array.from(e.currentTarget.files))
                    }
                    className="border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white w-full"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white px-6 py-3 rounded-xl md:col-span-2 hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Adding..." : "Add Project"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>

      {/* Project Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-5">All Projects</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500">No projects found</p>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto min-w-[1000px]">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-4 px-4 font-semibold text-gray-700">SN</th>
                  <th className="py-4 px-4 font-semibold text-gray-700">
                    Image
                  </th>
                  <th className="py-4 px-4 font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="py-4 px-4 font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="py-4 px-4 font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="py-4 px-4 font-semibold text-gray-700">
                    Location
                  </th>
                  <th className="py-4 px-4 font-semibold text-gray-700">
                    Year
                  </th>
                  <th className="py-4 px-4 font-semibold text-gray-700">
                    Client
                  </th>
                  <th className="py-4 px-4 font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {projects.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4 font-medium">{index + 1}</td>

                    <td className="py-4 px-4">
                      <img
                        src={item.heroImage}
                        alt={item.title}
                        className="h-16 w-20 object-cover rounded-lg"
                      />
                    </td>

                    <td className="py-4 px-4 font-medium text-gray-800 break-words">
                      {item.title}
                    </td>

                    <td className="py-4 px-4 break-words">{item.category}</td>
                    <td className="py-4 px-4 break-words">
                      {item.projectType}
                    </td>
                    <td className="py-4 px-4 break-words">{item.location}</td>
                    <td className="py-4 px-4">{item.year}</td>
                    <td className="py-4 px-4 break-words">{item.client}</td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleDeleteProject(item._id)}
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

export default AdminProjectPage;