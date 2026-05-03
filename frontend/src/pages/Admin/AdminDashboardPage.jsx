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
  TrendingUp,
  Calendar,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const unreadInquiries = inquiries.filter((item) => item.status === "unread").length;
  const totalPortfolio = projects.length ;

  const mainStats = [
    { title: "Total Porjects", value: totalPortfolio, icon: LayoutDashboard,  color: "#7a5703" },
    { title: "Active Services", value: services.length, icon: Wrench,  color: "#7a5703" },
    { title: "Team Members", value: teamMembers.length, icon: Users,  color: "#7a5703" },
    { title: "Client Reviews", value: reviews.length, icon: Star,  color: "#7a5703" },
  ];

  const inquiryStats = [
    { title: "Total Inquiries", value: inquiries.length, icon: MessageSquare, bg: "bg-orange-50", text: "text-orange-700" },
    { title: "Unread", value: unreadInquiries, icon: MailOpen, bg: "bg-red-50", text: "text-red-700" },
    { title: "Replied", value: inquiries.length - unreadInquiries, icon: Activity, bg: "bg-green-50", text: "text-green-700" },
  ];

  const recentInquiries = [...inquiries].slice(0, 4);
  const recentProjects = [...projects].slice(0, 3);
  const recentTeamMembers = [...teamMembers].slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#7a5703] mb-2">
              Dashboard
            </h1>
            <p className="text-gray-500 text-lg">
              Welcome back! Here's your website overview
            </p>
          </div>
          
          <div className="flex gap-3">
            <Link
              to="/admin/adminservice"
              className="bg-[#7a5703] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#634503] transition-all hover:scale-105 shadow-lg"
            >
              + Add Service
            </Link>
            <Link
              to="/admin/admingallery"
              className="bg-white border-2 border-[#7a5703] text-[#7a5703] px-6 py-3 rounded-xl font-semibold hover:bg-[#7a5703] hover:text-white transition-all"
            >
              + Add Image
            </Link>
          </div>
        </div>
      </div>

      {/* Main Stats Cards - Big & Bold */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-white rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mainStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-b-4 border-[#7a5703]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-2">{stat.title}</p>
                    <p className="text-5xl font-bold text-gray-900">{stat.value}</p>
                   
                  </div>
                  <div className="bg-[#7a5703]/10 rounded-2xl p-4">
                    <Icon className="w-8 h-8 text-[#7a5703]" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Inquiry Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {inquiryStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.3 }}
              className={`${stat.bg} rounded-2xl p-6 shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`bg-white rounded-xl p-3 ${stat.text}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link
  to="/admin/adminhomevideo"
  className="bg-white p-5 rounded-2xl text-center hover:shadow-lg transition-all group border border-gray-100"
>
  <div className="bg-[#7a5703]/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#7a5703] transition">
    <Activity className="w-6 h-6 text-[#7a5703] group-hover:text-white" />
  </div>
  <p className="font-semibold text-gray-700 text-sm">Home Video</p>
</Link>
          <Link
            to="/admin/adminservice"
            className="bg-white p-5 rounded-2xl text-center hover:shadow-lg transition-all group border border-gray-100"
          >
            <div className="bg-[#7a5703]/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#7a5703] transition">
              <Wrench className="w-6 h-6 text-[#7a5703] group-hover:text-white" />
            </div>
            <p className="font-semibold text-gray-700 text-sm">Services</p>
          </Link>

          <Link
            to="/admin/admingallery"
            className="bg-white p-5 rounded-2xl text-center hover:shadow-lg transition-all group border border-gray-100"
          >
            <div className="bg-[#7a5703]/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#7a5703] transition">
              <Image className="w-6 h-6 text-[#7a5703] group-hover:text-white" />
            </div>
            <p className="font-semibold text-gray-700 text-sm">Gallery</p>
          </Link>

          <Link
            to="/admin/adminproject"
            className="bg-white p-5 rounded-2xl text-center hover:shadow-lg transition-all group border border-gray-100"
          >
            <div className="bg-[#7a5703]/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#7a5703] transition">
              <FolderPlus className="w-6 h-6 text-[#7a5703] group-hover:text-white" />
            </div>
            <p className="font-semibold text-gray-700 text-sm">Projects</p>
          </Link>

          <Link
            to="/admin/admininquery"
            className="bg-white p-5 rounded-2xl text-center hover:shadow-lg transition-all group border border-gray-100"
          >
            <div className="bg-[#7a5703]/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#7a5703] transition">
              <MessageSquare className="w-6 h-6 text-[#7a5703] group-hover:text-white" />
            </div>
            <p className="font-semibold text-gray-700 text-sm">Inquiries</p>
          </Link>

          <Link
            to="/admin/adminteam"
            className="bg-white p-5 rounded-2xl text-center hover:shadow-lg transition-all group border border-gray-100"
          >
            <div className="bg-[#7a5703]/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#7a5703] transition">
              <Users className="w-6 h-6 text-[#7a5703] group-hover:text-white" />
            </div>
            <p className="font-semibold text-gray-700 text-sm">Team</p>
          </Link>

          <Link
            to="/admin/adminreview"
            className="bg-white p-5 rounded-2xl text-center hover:shadow-lg transition-all group border border-gray-100"
          >
            <div className="bg-[#7a5703]/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#7a5703] transition">
              <Star className="w-6 h-6 text-[#7a5703] group-hover:text-white" />
            </div>
            <p className="font-semibold text-gray-700 text-sm">Reviews</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">Recent Inquiries</h2>
            <Link to="/admin/admininquery" className="text-[#7a5703] text-sm font-semibold hover:underline">
              View all →
            </Link>
          </div>
          
          {recentInquiries.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No inquiries yet</p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((item) => (
                <div key={item._id} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.fullName}</h3>
                      <p className="text-sm text-gray-500">{item.service || "General Inquiry"}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "unread" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">Recent Projects</h2>
            <Link to="/admin/adminproject" className="text-[#7a5703] text-sm font-semibold hover:underline">
              View all →
            </Link>
          </div>
          
          {recentProjects.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No projects yet</p>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((item) => (
                <div key={item._id} className="flex gap-3 items-center border-b border-gray-100 pb-3 last:border-0">
                  <img src={item.heroImage} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section - Team & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Recent Team Members */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">Team Members</h2>
            <Link to="/admin/adminteam" className="text-[#7a5703] text-sm font-semibold hover:underline">
              View all →
            </Link>
          </div>
          
          {recentTeamMembers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No team members yet</p>
          ) : (
            <div className="space-y-3">
              {recentTeamMembers.map((item) => (
                <div key={item._id} className="flex gap-3 items-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.role || "Team Member"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-[#7a5703] to-[#9e7210] rounded-2xl p-6 shadow-md text-white">
          <h2 className="text-2xl font-bold mb-3">Website Summary</h2>
          <p className="text-white/80 mb-6">
            Your dashboard gives you full control over all content. Keep it updated for a professional brand image.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-white/70">Portfolio Items</p>
              <p className="text-2xl font-bold">{totalPortfolio}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-white/70">Active Services</p>
              <p className="text-2xl font-bold">{services.length}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-white/70">Team Members</p>
              <p className="text-2xl font-bold">{teamMembers.length}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-white/70">Client Reviews</p>
              <p className="text-2xl font-bold">{reviews.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;