import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const InquiryAdminPage = () => {
  const [inquiries, setInquiries] = useState([]);

  const getInquiries = async () => {
    try {
      const req = await axios.get(`${BACKEND_URL}/api/inquiry/all`);
      setInquiries(req?.data?.data || []);
    } catch (error) {
      console.log(error);
      setInquiries([]);
    }
  };

  useEffect(() => {
    getInquiries();
  }, []);

  const handleDelete = async (id) => {
    try {
      const req = await axios.delete(`${BACKEND_URL}/api/inquiry/delete/${id}`);
      alert(req?.data?.message || "Deleted successfully");
      getInquiries();
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Delete failed");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const req = await axios.put(`${BACKEND_URL}/api/inquiry/status/${id}`, {
        status,
      });
      alert(req?.data?.message || "Status updated");
      getInquiries();
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Status update failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Inquiries</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Service</th>
              <th className="p-4">Message</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.length > 0 ? (
              inquiries.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-4">{item.fullName}</td>
                  <td className="p-4">{item.email}</td>
                  <td className="p-4">{item.phone}</td>
                  <td className="p-4">{item.service}</td>
                  <td className="p-4 max-w-[250px]">{item.message}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.status === "unread"
                          ? "bg-red-100 text-red-600"
                          : item.status === "read"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {item.createdAt ? item.createdAt.split("T")[0] : ""}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleStatusChange(item._id, "read")}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                      >
                        Mark Read
                      </button>

                      <button
                        onClick={() => handleStatusChange(item._id, "replied")}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg"
                      >
                        Mark Replied
                      </button>

                      <button
                        onClick={() => handleStatusChange(item._id, "unread")}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                      >
                        Mark Unread
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  No inquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiryAdminPage;