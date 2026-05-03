import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Briefcase,
  Wrench,
  MessageSquare,
  Star,
  Users,
  LogOut,
  FolderPlus,
} from "lucide-react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;

const AdminPage = () => {

  // ✅ LOGOUT FUNCTION
  const handleLogout = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/admin/logout`,
        {},
        { withCredentials: true }
      );

      // clear frontend storage
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
      

      // redirect
      window.location.href = "/login";
    } catch (error) {
      console.log("LOGOUT ERROR =", error);
    }
  };

  const navItems = [
    { to: "admindashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "admingallery", label: "Gallery", icon: ImageIcon },
    { to: "adminproject", label: "Projects", icon: Briefcase },
    { to: "adminservice", label: "Services", icon: Wrench },
    { to: "admininquery", label: "Inquiry", icon: MessageSquare },
    { to: "adminreview", label: "Reviews", icon: Star },
    { to: "adminteam", label: "Team", icon: Users },
    
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-20 md:w-24 lg:w-72 border-r border-slate-200 bg-[#0f1720] text-slate-200 flex flex-col justify-between transition-all duration-300">
        
        <div>
          {/* Header */}
          <div className="px-3 lg:px-6 py-6 lg:py-7 border-b border-white/10 flex flex-col items-center lg:items-start">
            <h1 className="hidden lg:block text-xl font-semibold tracking-wide text-white">
              Admin Panel
            </h1>
            <p className="hidden lg:block mt-1 text-sm text-slate-400">
              Gravity Design Studio
            </p>
            <h1 className="lg:hidden text-white text-lg font-semibold">G</h1>
          </div>

          {/* Navigation */}
          <nav className="px-2 lg:px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  title={item.label}
                  className={({ isActive }) =>
                    `group flex items-center justify-center lg:justify-start gap-3 rounded-lg px-3 lg:px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span className="hidden lg:inline">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="px-2 lg:px-4 pb-5">
          
          {/* ✅ WORKING LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            title="Logout"
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-transparent px-3 lg:px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut size={18} strokeWidth={1.8} />
            <span className="hidden lg:inline">Logout</span>
          </button>

          <div className="hidden lg:block mt-4 border-t border-white/10 pt-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Studio
            </p>
            <h2 className="mt-1 text-sm font-semibold text-white">
              Gravity Design Studio
            </h2>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Interior, architecture, and visualization management dashboard.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-20 md:ml-24 lg:ml-72 flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300">
        <div className="min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:min-h-[calc(100vh-64px)] rounded-2xl border border-slate-200 bg-white p-4 md:p-5 lg:p-6 shadow-sm overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;