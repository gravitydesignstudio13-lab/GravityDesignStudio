import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCw,
  User,
  Tag,
  AlertCircle,
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;

const InquiryAdminPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const getInquiries = async () => {
    setLoading(true);
    try {
      const req = await axios.get(`${BACKEND_URL}/api/inquiry/all`);
      const data = req?.data?.data || [];
      setInquiries(data);
      setFilteredInquiries(data);
      
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to load inquiries");
      setInquiries([]);
      setFilteredInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInquiries();
  }, []);

  useEffect(() => {
    let filtered = [...inquiries];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.phone?.includes(searchTerm) ||
          item.service?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }
    
    setFilteredInquiries(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, inquiries]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    
    try {
      await axios.delete(`${BACKEND_URL}/api/inquiry/delete/${id}`);
      toast.success("Inquiry deleted successfully");
      getInquiries();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${BACKEND_URL}/api/inquiry/status/${id}`, { status });
      toast.success(`Status updated to ${status}`);
      getInquiries();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Status update failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "unread":
        return "bg-red-100 text-red-800 border-red-200";
      case "read":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "replied":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "unread":
        return <AlertCircle className="w-4 h-4" />;
      case "read":
        return <Eye className="w-4 h-4" />;
      case "replied":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInquiries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
              <p className="text-gray-600 mt-1">Manage and respond to customer inquiries</p>
            </div>
            <button
              onClick={getInquiries}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Unread</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiries.filter(i => i.status === "unread").length}
                </p>
              </div>
              <AlertCircle className="w-10 h-10 text-red-500 opacity-75" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Read</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiries.filter(i => i.status === "read").length}
                </p>
              </div>
              <Eye className="w-10 h-10 text-yellow-500 opacity-75" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Replied</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiries.filter(i => i.status === "replied").length}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500 opacity-75" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total</p>
                <p className="text-2xl font-bold text-gray-900">{inquiries.length}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-blue-500 opacity-75" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
              
              {(searchTerm || statusFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Inquiries Grid/Cards View */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
            <p className="text-gray-600">No inquiries match your search criteria</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6">
              {currentItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      {/* Left Section - Contact Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {item.fullName?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {item.fullName}
                              </h3>
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                  item.status
                                )}`}
                              >
                                {getStatusIcon(item.status)}
                                {item.status}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                              <div className="flex items-center text-gray-600">
                                <Mail className="w-4 h-4 mr-2" />
                                <a href={`mailto:${item.email}`} className="hover:text-indigo-600">
                                  {item.email}
                                </a>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Phone className="w-4 h-4 mr-2" />
                                <a href={`tel:${item.phone}`} className="hover:text-indigo-600">
                                  {item.phone}
                                </a>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Tag className="w-4 h-4 mr-2" />
                                <span>{item.service || "Not specified"}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{formatDate(item.createdAt)}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {item.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Section - Actions */}
                      <div className="flex flex-col gap-2 min-w-[140px]">
                        <button
                          onClick={() => {
                            setSelectedInquiry(item);
                            setShowDetailModal(true);
                          }}
                          className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        
                        {item.status !== "read" && (
                          <button
                            onClick={() => handleStatusChange(item._id, "read")}
                            className="inline-flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Mark Read
                          </button>
                        )}
                        
                        {item.status !== "replied" && (
                          <button
                            onClick={() => handleStatusChange(item._id, "replied")}
                            className="inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Replied
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="inline-flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded-lg ${
                          currentPage === pageNum
                            ? "bg-indigo-600 text-white"
                            : "border hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedInquiry && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
            <div className="flex items-center justify-center min-h-screen p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Inquiry Details</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        {selectedInquiry.fullName?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900">{selectedInquiry.fullName}</h3>
                        <span
                          className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                            selectedInquiry.status
                          )}`}
                        >
                          {getStatusIcon(selectedInquiry.status)}
                          {selectedInquiry.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <label className="text-xs text-gray-500 uppercase font-semibold">Email</label>
                        <a href={`mailto:${selectedInquiry.email}`} className="text-indigo-600 hover:underline block mt-1">
                          {selectedInquiry.email}
                        </a>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <label className="text-xs text-gray-500 uppercase font-semibold">Phone</label>
                        <a href={`tel:${selectedInquiry.phone}`} className="text-indigo-600 hover:underline block mt-1">
                          {selectedInquiry.phone}
                        </a>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <label className="text-xs text-gray-500 uppercase font-semibold">Service</label>
                        <p className="mt-1 font-medium">{selectedInquiry.service || "Not specified"}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <label className="text-xs text-gray-500 uppercase font-semibold">Date</label>
                        <p className="mt-1">{formatDate(selectedInquiry.createdAt)}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Message</label>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {selectedInquiry.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        handleStatusChange(selectedInquiry._id, "read");
                        setShowDetailModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      Mark as Read
                    </button>
                    <button
                      onClick={() => {
                        handleStatusChange(selectedInquiry._id, "replied");
                        setShowDetailModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Mark as Replied
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(selectedInquiry._id);
                        setShowDetailModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InquiryAdminPage;