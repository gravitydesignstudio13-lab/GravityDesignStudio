import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;
const ProjectsPage = () => {
  const nav = useNavigate();
const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);
const [filter, setFilter] = useState("All");
const [hoveredId, setHoveredId] = useState(null);
const location = useLocation();
useEffect(() => {

  const params = new URLSearchParams(location.search);

  const status = params.get("status");

  if (status) {

    setFilter(status);

  }

}, [location.search]);

  const filters = ["All", "Completed", "Ongoing", "Upcoming"];

  const filteredProjects =
  filter === "All"
    ? projects
    : projects.filter((p) => p.status === filter);

  const getStatusColor = (status) => {
    if (status === "Completed") return "bg-emerald-500";
    if (status === "Ongoing") return "bg-amber-500";
    if (status === "Upcoming") return "bg-sky-500";
    return "bg-gray-500";
  };

  const getStatusIcon = (status) => {
    if (status === "Completed") return "✓";
    if (status === "Ongoing") return "⟳";
    if (status === "Upcoming") return "★";
    return "•";
  };

  useEffect(() => {
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BACKEND_URL}/api/project/all`
      );

      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProjects();
}, []);

if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin h-10 w-10 border-b-2 border-[#7a4f1d]"></div>
    </div>
  );
}




  return (
    <div className="bg-[#f8f6f2] min-h-screen">
      {/* HERO SECTION - Premium Redesign */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#2a1f1a] via-[#3b2f2f] to-[#2a1f1a] pt-10 pb-10 px-6 sm:px-12 lg:px-24">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-white/80 text-sm tracking-wide">Portfolio</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
          >
            Our <span className="text-amber-400">Projects</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-24 h-1 bg-gradient-to-r from-amber-400 to-transparent mx-auto mt-6"
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg"
          >
            Explore our portfolio of completed, ongoing, and upcoming projects
            that showcase our commitment to design excellence.
          </motion.p>
        </div>
      </section>

      {/* STATS BAR - New */}
      <div className="bg-white border-b border-gray-100 py-6 px-6 sm:px-12 lg:px-24 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#7a4f1d]">{projects.length}</p>
              <p className="text-xs text-gray-500">Total Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{projects.filter(p => p.status === "Completed").length}</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
          </div>
          
          {/* FILTER BUTTONS - Premium Style */}
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <motion.button
                key={item}
                onClick={() => setFilter(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  filter === item
                    ? "text-white"
                    : "text-gray-600 hover:text-[#7a4f1d]"
                }`}
              >
                {filter === item && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-[#7a4f1d] rounded-full"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECTS GRID - Modern Masonry Style */}
      <section className="px-6 py-16 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  onHoverStart={() => setHoveredId(project._id)}
                  onHoverEnd={() => setHoveredId(null)}
                  className="group cursor-pointer"
                  onClick={() => nav(`/projectdetail/${project._id}`)}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-72">
                      <motion.img
                        src={project.heroImage}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: hoveredId === project._id ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold ${getStatusColor(project.status)} shadow-lg`}>
                          <span>{getStatusIcon(project.status)}</span>
                          <span>{project.status}</span>
                        </div>
                      </div>
                      
                      {/* Year Badge */}
                      {project.year && (
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium">
                          {project.year}
                        </div>
                      )}
                      
                      {/* Hover Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="bg-white text-[#7a4f1d] px-6 py-2.5 rounded-full font-semibold shadow-lg"
                        >
                          Explore Project
                        </motion.button>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#7a4f1d] transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{project.location}</span>
                          </div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                      </div>
                      
                      <p className="mt-3 text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-400">Click to view details</span>
                        <motion.span
                          animate={{ x: hoveredId === project._id ? 5 : 0 }}
                          className="text-[#7a4f1d] font-medium text-sm"
                        >
                          Read More →
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700">No projects found</h3>
              <p className="text-gray-500 mt-2">Try selecting a different filter</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA SECTION - Premium */}
      <section className="relative isolate overflow-hidden bg-gradient-to-r from-[#7a4f1d] to-[#5a3a12] py-20 px-6 sm:px-12 lg:px-24">
        <div className="absolute inset-0 -z-10 opacity-20">
          <svg className="absolute left-0 top-0 h-full w-1/2" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="white" opacity="0.05" />
          </svg>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="text-white/80 text-sm tracking-wider">START YOUR JOURNEY</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            Have a Project in <span className="text-amber-200">Mind?</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-white/80 text-lg"
          >
            Let's bring your vision to life with our expert design services
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => nav("/contact")}
            className="mt-8 px-10 py-3.5 bg-white text-[#7a4f1d] rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl inline-flex items-center gap-2"
          >
            Get Free Consultation
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;