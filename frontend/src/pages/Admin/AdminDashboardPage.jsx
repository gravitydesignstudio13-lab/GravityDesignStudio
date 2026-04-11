import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  Briefcase,
  Image,
  MessageSquare,
  Wrench,
  MailOpen,
  FolderPlus,
  ArrowRight,
  Users,
  Star,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminDashboardPage = () => {
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [projects, setProjects] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDashboardData = async () => {
    try {
      setLoading(true);

      const [
        serviceRes,
        galleryRes,
        projectRes,
        inquiryRes,
        teamRes,
        reviewRes,
      ] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/service/find`),
        axios.get(`${BACKEND_URL}/api/gallery/all?page=1&limit=100&category=All`),
        axios.get(`${BACKEND_URL}/api/project/all?page=1&limit=100&category=All`),
        axios.get(`${BACKEND_URL}/api/inquiry/all`),
        axios.get(`${BACKEND_URL}/api/team/all`),
        axios.get(`${BACKEND_URL}/api/review/all`),
      ]);

      setServices(serviceRes?.data?.data || serviceRes?.data || []);
      setGallery(galleryRes?.data?.data || []);
      setProjects(projectRes?.data?.data || []);
      setInquiries(inquiryRes?.data?.data || []);
      setTeamMembers(teamRes?.data?.data || []);
      setReviews(reviewRes?.data?.data || []);
    } catch (error) {
      console.log("DASHBOARD FETCH ERROR =", error);
      setServices([]);
      setGallery([]);
      setProjects([]);
      setInquiries([]);
      setTeamMembers([]);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const unreadInquiries = inquiries.filter(
    (item) => item.status === "unread"
  ).length;

  const repliedInquiries = inquiries.filter(
    (item) => item.status === "replied"
  ).length;

  const recentInquiries = [...inquiries].slice(0, 5);
  const recentProjects = [...projects].slice(0, 4);
  const recentTeamMembers = [...teamMembers].slice(0, 4);
  const recentReviews = [...reviews].slice(0, 4);

  const stats = [
    {
      title: "Total Services",
      value: services.length,
      icon: Wrench,
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      text: "text-blue-700",
    },
    {
      title: "Gallery Items",
      value: gallery.length,
      icon: Image,
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      text: "text-purple-700",
    },
    {
      title: "Projects",
      value: projects.length,
      icon: Briefcase,
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      text: "text-green-700",
    },
    {
      title: "Total Inquiries",
      value: inquiries.length,
      icon: MessageSquare,
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      text: "text-orange-700",
    },
    {
      title: "Team Members",
      value: teamMembers.length,
      icon: Users,
      bg: "bg-cyan-50",
      iconBg: "bg-cyan-100",
      text: "text-cyan-700",
    },
    {
      title: "Reviews",
      value: reviews.length,
      icon: Star,
      bg: "bg-pink-50",
      iconBg: "bg-pink-100",
      text: "text-pink-700",
    },
    {
      title: "Unread Inquiries",
      value: unreadInquiries,
      icon: MailOpen,
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      text: "text-red-700",
    },
    {
      title: "Replied Inquiries",
      value: repliedInquiries,
      icon: LayoutDashboard,
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      text: "text-emerald-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-gray-500 mb-2">
            Admin Panel
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back. Here’s what’s happening in your website today.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/adminservice"
            className="rounded-xl bg-black px-5 py-3 text-white hover:bg-gray-800 transition"
          >
            Add Service
          </Link>
          <Link
            to="/admin/adminproject"
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-gray-800 hover:bg-gray-100 transition"
          >
            Add Project
          </Link>
          <Link
            to="/admin/adminteam"
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-gray-800 hover:bg-gray-100 transition"
          >
            Add Team
          </Link>
          <Link
            to="/admin/adminreview"
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-gray-800 hover:bg-gray-100 transition"
          >
            Add Review
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="h-36 rounded-3xl bg-white animate-pulse border border-gray-100"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`${item.bg} rounded-3xl border border-white/60 p-6 shadow-sm hover:shadow-md transition`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{item.title}</p>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className={`h-12 w-12 rounded-2xl ${item.iconBg} flex items-center justify-center`}
                  >
                    <Icon className={`h-6 w-6 ${item.text}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Middle Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Quick Actions
          </h2>

          <div className="space-y-3">
            <Link
              to="/admin/adminservice"
              className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-700 rounded-xl p-3">
                  <Wrench size={18} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Manage Services</p>
                  <p className="text-sm text-gray-500">Add or delete services</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-gray-400" />
            </Link>

            <Link
              to="/admin/admingallery"
              className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 text-purple-700 rounded-xl p-3">
                  <Image size={18} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Manage Gallery</p>
                  <p className="text-sm text-gray-500">Upload gallery images</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-gray-400" />
            </Link>

            <Link
              to="/admin/adminproject"
              className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-100 text-green-700 rounded-xl p-3">
                  <FolderPlus size={18} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Manage Projects</p>
                  <p className="text-sm text-gray-500">Create project portfolio</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-gray-400" />
            </Link>

            <Link
              to="/admin/admininquery"
              className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 text-orange-700 rounded-xl p-3">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">View Inquiries</p>
                  <p className="text-sm text-gray-500">
                    Check unread and replied messages
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="text-gray-400" />
            </Link>

            <Link
              to="/admin/adminteam"
              className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="bg-cyan-100 text-cyan-700 rounded-xl p-3">
                  <UserPlus size={18} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Manage Team</p>
                  <p className="text-sm text-gray-500">Add or remove team members</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-gray-400" />
            </Link>

            <Link
              to="/admin/adminreview"
              className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="bg-pink-100 text-pink-700 rounded-xl p-3">
                  <Star size={18} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Manage Reviews</p>
                  <p className="text-sm text-gray-500">Add or delete client reviews</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Recent Inquiries</h2>
            <Link
              to="/admin/admininquery"
              className="text-sm font-medium text-black hover:underline"
            >
              View all
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <p className="text-gray-500">No inquiries found</p>
          ) : (
            <div className="space-y-4">
              {recentInquiries.slice(0, 4).map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.fullName}
                      </h3>
                      <p className="text-sm text-gray-500">{item.email}</p>
                      <p className="text-sm text-gray-500">{item.phone}</p>
                      <p className="mt-2 text-sm text-gray-700">
                        <span className="font-medium">Service:</span> {item.service}
                      </p>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {item.message}
                      </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "unread"
                            ? "bg-red-100 text-red-600"
                            : item.status === "read"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.status}
                      </span>

                      <span className="text-xs text-gray-500">
                        {item.createdAt ? item.createdAt.split("T")[0] : ""}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
        {/* Recent Projects */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
            <Link
              to="/admin/adminproject"
              className="text-sm font-medium text-black hover:underline"
            >
              View all
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <p className="text-gray-500">No projects found</p>
          ) : (
            <div className="space-y-4">
              {recentProjects.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 transition"
                >
                  <img
                    src={item.heroImage}
                    alt={item.title}
                    className="h-16 w-20 rounded-xl object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-sm text-gray-500">
                      {item.location} • {item.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Team Members */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Recent Team Members</h2>
            <Link
              to="/admin/adminteam"
              className="text-sm font-medium text-black hover:underline"
            >
              View all
            </Link>
          </div>

          {recentTeamMembers.length === 0 ? (
            <p className="text-gray-500">No team members found</p>
          ) : (
            <div className="space-y-4">
              {recentTeamMembers.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Extra Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
        {/* Recent Reviews */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Recent Reviews</h2>
            <Link
              to="/admin/adminreview"
              className="text-sm font-medium text-black hover:underline"
            >
              View all
            </Link>
          </div>

          {recentReviews.length === 0 ? (
            <p className="text-gray-500">No reviews found</p>
          ) : (
            <div className="space-y-4">
              {recentReviews.map((item) => (
                <div
                  key={item._id}
                  className="flex items-start gap-4 border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.profession}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {item.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary Box */}
        <div className="bg-gradient-to-br from-black to-gray-800 text-white rounded-3xl p-6 shadow-sm">
          <p className="uppercase tracking-[0.25em] text-xs text-gray-300 mb-3">
            Website Summary
          </p>
          <h2 className="text-2xl font-bold mb-4">
            Keep your studio portfolio active and updated
          </h2>
          <p className="text-gray-300 leading-7 mb-6">
            Your admin dashboard gives you full control over services, gallery,
            projects, team members, reviews, and customer inquiries. Keep content
            updated regularly for a stronger and more professional brand image.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-sm text-gray-300">Portfolio Items</p>
              <h3 className="text-2xl font-bold mt-1">
                {projects.length + gallery.length}
              </h3>
            </div>

            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-sm text-gray-300">Client Messages</p>
              <h3 className="text-2xl font-bold mt-1">{inquiries.length}</h3>
            </div>

            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-sm text-gray-300">Team Members</p>
              <h3 className="text-2xl font-bold mt-1">{teamMembers.length}</h3>
            </div>

            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-sm text-gray-300">Client Reviews</p>
              <h3 className="text-2xl font-bold mt-1">{reviews.length}</h3>
            </div>

            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-sm text-gray-300">Unread Now</p>
              <h3 className="text-2xl font-bold mt-1">{unreadInquiries}</h3>
            </div>

            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-sm text-gray-300">Active Services</p>
              <h3 className="text-2xl font-bold mt-1">{services.length}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;