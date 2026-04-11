import React from "react";
import { Formik, Form, Field } from "formik";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/admin/login`,
        values,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminData", JSON.stringify(res.data.admin));

        toast.success(res.data.message || "Login successful");

        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      }
    } catch (error) {
      console.log("ADMIN LOGIN ERROR =", error);

      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between bg-[#0f1720] text-white p-10">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">Gravity Design Studio</h1>
                <p className="text-sm text-slate-400">Admin Control Panel</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold leading-tight">
              Secure access to your admin workspace.
            </h2>
            <p className="mt-5 text-slate-400 leading-7 text-sm">
              Manage projects, services, gallery, team members, reviews, and
              client inquiries from one professional dashboard.
            </p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-sm text-slate-400">
              Interior, architecture, and visualization management system.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <p className="text-sm font-medium text-slate-500 mb-2">
              Welcome back
            </p>
            <h2 className="text-3xl font-bold text-slate-900">Admin Login</h2>
            <p className="text-sm text-slate-500 mt-2">
              Enter your credentials to access the dashboard.
            </p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center border border-slate-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-slate-900">
                    <Mail size={18} className="text-slate-400 mr-3" />
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter admin email"
                      className="w-full outline-none bg-transparent text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="flex items-center border border-slate-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-slate-900">
                    <LockKeyhole size={18} className="text-slate-400 mr-3" />
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      className="w-full outline-none bg-transparent text-slate-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0f1720] text-white py-3.5 rounded-xl font-medium hover:bg-[#1d2939] transition disabled:opacity-50"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              Protected admin area • Gravity Design Studio
            </p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
};

export default AdminLoginPage;