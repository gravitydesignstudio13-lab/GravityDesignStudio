import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  User, 
  CheckCircle, 
  Clock, 
  Star,
  TrendingUp,
  Ruler,
  PenTool,
  Home,
  Award,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;
const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);
const [currentIndex, setCurrentIndex] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const [allProjects, setAllProjects] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      const [singleRes, allRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/project/${id}`),
        axios.get(`${BACKEND_URL}/api/project/all`)
      ]);

      if (singleRes.data.success) {
        setProject(singleRes.data.data);
      }

      if (allRes.data.success) {
        setAllProjects(allRes.data.data);
      }

    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [id]);
  const getStatusColor = (status) => {
    if (status === "Completed") return "bg-emerald-500";
    if (status === "Ongoing") return "bg-amber-500";
    if (status === "Upcoming") return "bg-sky-500";
    return "bg-gray-500";
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project?.title,
        text: project?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
    setShowShare(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#7a4f1d] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
            <Home size={96} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Project Not Found</h2>
          <p className="text-gray-500 mb-6">The project you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-3 bg-[#7a4f1d] text-white rounded-full hover:bg-[#5a3a12] transition"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
  const nextIndex = (currentIndex + 1) % project.images.length;
  setCurrentIndex(nextIndex);
  setSelectedImage(project.images[nextIndex]);
};

const handlePrev = () => {
  const prevIndex =
    (currentIndex - 1 + project.images.length) % project.images.length;
  setCurrentIndex(prevIndex);
  setSelectedImage(project.images[prevIndex]);
};



  return (
    <div className="bg-[#f8f6f2] min-h-screen">
      {/* Lightbox */}
      <AnimatePresence>
  {selectedImage && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
    >
      {/* CLOSE */}
      <button
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
        onClick={() => setSelectedImage(null)}
      >
        <X size={32} />
      </button>

      {/* PREV BUTTON */}
      <button
        onClick={handlePrev}
        className="absolute left-4 text-white bg-black/40 p-3 rounded-full hover:bg-black/60"
      >
        <ChevronLeft size={30} />
      </button>

      {/* IMAGE */}
      <motion.img
        key={selectedImage}
        src={selectedImage}
        alt="Full view"
        className="max-w-full max-h-[85vh] object-contain rounded-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      />

      {/* NEXT BUTTON */}
      <button
        onClick={handleNext}
        className="absolute right-4 text-white bg-black/40 p-3 rounded-full hover:bg-black/60"
      >
        <ChevronRight size={30} />
      </button>

      {/* INDEX INDICATOR */}
      <div className="absolute bottom-6 text-white text-sm">
        {currentIndex + 1} / {project.images.length}
      </div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/projects")}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/70 transition"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        Action Buttons
        <div className="absolute top-6 right-6 z-20 flex gap-3">
          <button
            onClick={() => setLiked(!liked)}
            className="bg-black/50 backdrop-blur-sm p-2.5 rounded-full text-white hover:bg-black/70 transition"
          >
            <Heart size={20} fill={liked ? "#ef4444" : "none"} color={liked ? "#ef4444" : "white"} />
          </button>
         
        </div>

        {/* Share Popup */}
        <AnimatePresence>
          {showShare && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute top-20 right-6 z-30 bg-white rounded-xl shadow-xl p-3 w-48"
            >
              <button
                onClick={handleShare}
                className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition flex items-center gap-2"
              >
                <Share2 size={16} />
                Copy Link / Share
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                {project.category}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                {project.year}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Ruler size={14} />
                <span>{project.area}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>Duration: {project.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-[#7a4f1d] pl-4">
                Project Overview
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </p>
            </motion.div>

            {/* Image Gallery */}
            {project.images && project.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-[#7a4f1d] pl-4">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {project.images.map((img, idx) => (
                    <motion.img
                      key={idx}
                      src={img}
                      alt={`${project.title} - ${idx + 1}`}
                      className="w-full h-40 object-cover rounded-xl cursor-pointer hover:opacity-80 transition"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                       setSelectedImage(img);
                       setCurrentIndex(idx);
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-[#7a4f1d] pl-4">
                Key Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle size={16} className="text-emerald-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technologies */}
            {project.technologies && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-[#7a4f1d] pl-4">
                  Technologies & Methods
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Testimonial */}
            {project.clientTestimonial && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-[#f5f0e8] rounded-2xl p-6 border border-gray-200"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{project.clientTestimonial.text}"
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7a4f1d]/20 flex items-center justify-center">
                    <User size={18} className="text-[#7a4f1d]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{project.clientTestimonial.name}</p>
                    <p className="text-xs text-gray-500">Client</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Project Details Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Project Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">Project Type</span>
                  <span className="text-gray-800 font-medium capitalize">{project.category}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">Area</span>
                  <span className="text-gray-800 font-medium">{project.area}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">Duration</span>
                  <span className="text-gray-800 font-medium">{project.duration}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">Completion Year</span>
                  <span className="text-gray-800 font-medium">{project.year}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Status</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Team Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Project Team</h3>
              <div className="space-y-3">
                {project.team.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#7a4f1d]/10 flex items-center justify-center">
                      <User size={14} className="text-[#7a4f1d]" />
                    </div>
                    <span className="text-gray-700 text-sm">{member}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#7a4f1d] to-[#5a3a12] rounded-2xl p-6 text-white text-center"
            >
              <h3 className="text-xl font-bold mb-2">Inspired by this project?</h3>
              <p className="text-white/80 text-sm mb-4">
                Let's create something amazing for you
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="w-full bg-white text-[#7a4f1d] py-2.5 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Get Free Consultation
              </button>
            </motion.div>
          </div>
        </div>

        {/* Related Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#7a4f1d] pl-4">
            Related Projects
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(allProjects)
              .filter(p => p._id !== project._id && p.category === project.category)
              .slice(0, 3)
              .map((relatedProject) => (
                <motion.div
                  key={relatedProject._id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer"
                  onClick={() => navigate(`/projectdetail/${relatedProject._id}`)}
                >
                  <img
                    src={relatedProject.heroImage}
                    alt={relatedProject.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">{relatedProject.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{relatedProject.location}</p>
                    <button className="mt-3 text-[#7a4f1d] text-sm font-medium hover:underline">
                      View Project →
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#3b2f2f] to-[#2a221f] py-16 px-6 sm:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-300 mb-6">
            Let's discuss your vision and create something extraordinary together.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-3 bg-[#7a4f1d] text-white rounded-full font-semibold hover:bg-[#5a3a12] transition inline-flex items-center gap-2"
          >
            Get In Touch
            <ArrowLeft size={18} className="rotate-180" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailsPage;