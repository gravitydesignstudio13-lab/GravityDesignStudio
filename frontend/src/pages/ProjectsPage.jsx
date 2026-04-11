import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProjectsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();

  const [activeGroup, setActiveGroup] = useState(
    searchParams.get("group") || ""
  );
  const [activeProjectType, setActiveProjectType] = useState(
    searchParams.get("projectType") || "All"
  );
  const [activeLabel, setActiveLabel] = useState(
    searchParams.get("label") || ""
  );

  const [projects, setProjects] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [allProjectTypes, setAllProjectTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  const getCategoryGroup = (text = "") => {
    const lower = text.toLowerCase();

    if (lower.includes("interior")) return "interior";
    if (
      lower.includes("architecture") ||
      lower.includes("architect") ||
      lower.includes("exterior")
    ) {
      return "architecture";
    }
    if (
      lower.includes("3d") ||
      lower.includes("visualization") ||
      lower.includes("render")
    ) {
      return "3d";
    }

    return "";
  };

  const getProjects = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/project/all?page=1&limit=500`);

      if (res?.data?.success) {
        setAllProjects(res.data.data || []);
      } else {
        setAllProjects([]);
      }
    } catch (error) {
      console.log(
        "GET PROJECTS ERROR =",
        error?.response?.data?.message || error.message
      );
      setAllProjects([]);
    }
  };

  const getProjectTypes = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/project-type/all`);

      if (res?.data?.success) {
        setAllProjectTypes(res.data.data || []);
      } else {
        setAllProjectTypes([]);
      }
    } catch (error) {
      console.log(
        "GET PROJECT TYPES ERROR =",
        error?.response?.data?.message || error.message
      );
      setAllProjectTypes([]);
    }
  };

  useEffect(() => {
    const groupFromUrl = searchParams.get("group") || "";
    const projectTypeFromUrl = searchParams.get("projectType") || "All";
    const labelFromUrl = searchParams.get("label") || "";

    setActiveGroup(groupFromUrl);
    setActiveProjectType(projectTypeFromUrl);
    setActiveLabel(labelFromUrl);
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    getProjects();
    getProjectTypes();
  }, []);

  const filteredProjectTypes = useMemo(() => {
    if (!activeGroup) return [];

    return allProjectTypes.filter(
      (item) => getCategoryGroup(item.category) === activeGroup
    );
  }, [allProjectTypes, activeGroup]);

  const filteredProjects = useMemo(() => {
    let data = [...allProjects];

    if (activeGroup) {
      data = data.filter(
        (item) => getCategoryGroup(item.category) === activeGroup
      );
    }

    if (activeProjectType && activeProjectType !== "All") {
      data = data.filter((item) => item.projectType === activeProjectType);
    }

    return data;
  }, [allProjects, activeGroup, activeProjectType]);

  useEffect(() => {
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    setProjects(filteredProjects.slice(start, end));
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / limit);

  const handleProjectTypeChange = (typeName) => {
    setCurrentPage(1);
    setActiveProjectType(typeName);

    if (typeName === "All") {
      setSearchParams({
        group: activeGroup,
        label: activeLabel,
      });
    } else {
      setSearchParams({
        group: activeGroup,
        label: activeLabel,
        projectType: typeName,
      });
    }
  };

  const heroTitle = activeLabel ? `${activeLabel} Projects` : "Our Projects";

  const projectTypeButtons = [
  { _id: "all-filter", typeName: "All" },
  ...[...filteredProjectTypes].sort((a, b) =>
    a.typeName.localeCompare(b.typeName)
  ),
];

  return (
    <div className="bg-white text-gray-900">
      <section className="relative h-[55vh] w-full flex items-center justify-center bg-black overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1400&auto=format&fit=crop"
          alt="Projects Hero"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="relative z-10 text-center px-5">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold"
          >
            {heroTitle}
          </motion.h1>

          <p className="text-gray-200 mt-4 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            Explore our creative work in {activeLabel || "design"} projects.
          </p>
        </div>
      </section>

      {activeGroup && projectTypeButtons.length > 0 && (
        <section className="px-5 sm:px-10 lg:px-20 py-10 flex flex-wrap justify-center gap-4">
          {projectTypeButtons.map((item) => (
            <button
              key={item._id}
              onClick={() => handleProjectTypeChange(item.typeName)}
              className={`px-5 py-2 rounded-full border transition duration-300 ${
                activeProjectType === item.typeName
                  ? "bg-[#795703] text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              {item.typeName}
            </button>
          ))}
        </section>
      )}

      <section className="px-5 sm:px-10 lg:px-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => nav(`/projectdetail/${project._id}`)}
              className="group rounded-3xl overflow-hidden bg-white shadow-lg cursor-pointer"
            >
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition duration-500"></div>

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-white/90 backdrop-blur-md text-sm px-4 py-1 rounded-full">
                    {project.category}
                  </span>

                  {project.projectType && (
                    <span className="bg-white/90 backdrop-blur-md text-sm px-4 py-1 rounded-full">
                      {project.projectType}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <p className="text-sm text-gray-200 mt-2">
                    {project.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No projects found</p>
        )}
      </section>

      {totalPages > 1 && (
        <section className="pb-20 flex justify-center items-center gap-3 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === index + 1
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </section>
      )}
    </div>
  );
};

export default ProjectsPage;