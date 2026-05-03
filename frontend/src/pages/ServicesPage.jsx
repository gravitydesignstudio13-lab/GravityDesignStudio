import React, { useEffect, useState, useRef } from "react";
import { motion, animate, useInView } from "motion/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;

const CountUp = ({ to, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration: 2,
        onUpdate(latest) {
          setValue(Math.floor(latest));
        },
      });

      return () => controls.stop();
    }
  }, [isInView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const nav = useNavigate();

  const getCategoryGroup = (title = "") => {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes("interior")) return "interior";
    if (
      lowerTitle.includes("architecture") ||
      lowerTitle.includes("architect") ||
      lowerTitle.includes("exterior")
    ) {
      return "architecture";
    }
    if (
      lowerTitle.includes("3d") ||
      lowerTitle.includes("visualization") ||
      lowerTitle.includes("render")
    ) {
      return "3d";
    }

    return "";
  };

  const getServices = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/service/find`);

      if (res?.data?.success) {
        setServices(res.data.data || []);
      } else if (Array.isArray(res.data)) {
        setServices(res.data);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      setServices([]);
    }
  };

  const getProjects = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/project/all?page=1&limit=500`
      );

      if (res?.data?.success) {
        setProjects(res.data.data || []);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      setProjects([]);
    }
  };

  useEffect(() => {
    getServices();
    getProjects();
  }, []);

  const stats = [
    { number: 150, suffix: "+", label: "Projects Completed" },

  { number: 500, suffix: "+", label: "Design Consultations" },

  { number: 98, suffix: "%", label: "Client Satisfaction" },

  { number: 10, suffix: "+", label: "Years Experience" },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consultation",
      description: "The consultation process begins with understanding the vision and objectives of the client, followed by research, brainstorming, and conceptual development. Through iterative discussions and feedback, the design evolves to balance functionality, aesthetics, sustainability, and technical feasibility.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      step: "02",
      title: "Conceptualization",
      description: "During conceptualization, designers explore multiple possibilities through sketches, diagrams, models, and digital tools. This stage encourages experimentation, innovation, and creative problem-solving, allowing concepts to evolve before they are refined into detailed solutions.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Development",
      description: "During development, designers focus on spatial planning, structural considerations, material selection, and integration of systems such as lighting, ventilation, and sustainability features. Iterative testing, modeling, and analysis help ensure that the design is both feasible and aligned with the project’s vision.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
    },
    {
      step: "04",
      title: "Execution & Delivery ",
      description: "Execution & Delivery is the final stage of the design process, where refined designs are transformed into built realities. This phase ensures that the vision, planning, and development efforts are accurately realized on site, meeting both aesthetic and functional objectives.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  const hasProjectsForService = (serviceTitle) => {
    const serviceGroup = getCategoryGroup(serviceTitle);
    if (!serviceGroup) return false;
    return projects.some(
      (project) => getCategoryGroup(project.category) === serviceGroup
    );
  };

  const handleServiceClick = (serviceTitle) => {
    const categoryGroup = getCategoryGroup(serviceTitle);
    const hasProjects = hasProjectsForService(serviceTitle);
    if (!categoryGroup || !hasProjects) return;
    nav(
      `/projects?group=${encodeURIComponent(
        categoryGroup
      )}&label=${encodeURIComponent(serviceTitle)}`
    );
  };

  return (
    <div className="bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#f8f6f2] to-white pt-28 pb-20 px-6 sm:px-12 lg:px-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7a4f1d]/5 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#7a4f1d]/5 rounded-full blur-3xl -z-0"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#7a4f1d]/10 text-[#7a4f1d] text-sm font-medium tracking-wide mb-6"
          >
            What We Offer
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900"
          >
            Our Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-3xl mx-auto text-gray-600 mt-6 text-base sm:text-lg leading-relaxed"
          >
            Gravity Design Studio is driven by a commitment to transform ideas
            into meaningful and well-crafted spaces. Our approach combines
            creative vision with practical design strategies to deliver
            solutions that are both aesthetically refined and functionally efficient.
          </motion.p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="px-6 py-16 sm:px-12 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-[#f8f6f2] hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-[#7a4f1d]">
                  <CountUp to={item.number} suffix={item.suffix} />
                </h2>
                <p className="text-gray-600 mt-2 text-sm font-medium">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES DETAILS */}
      <section className="px-6 py-20 sm:px-12 lg:px-24 bg-[#fcfbf8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#7a4f1d]/10 text-[#7a4f1d] text-sm font-medium tracking-wide mb-4">
              Comprehensive Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              What We Do Best
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Explore our range of professional design services tailored to meet your unique needs
            </p>
          </div>

          <div className="space-y-20">
            {services.map((service, index) => {
              const hasProjects = hasProjectsForService(service.title);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service._id || index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-[#7a4f1d]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div
                      onClick={() => hasProjects && handleServiceClick(service.title)}
                      className={`relative overflow-hidden rounded-3xl shadow-xl group ${
                        hasProjects ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className={`w-full h-[300px] sm:h-[380px] lg:h-[450px] object-cover transition duration-700 ${
                          hasProjects ? "group-hover:scale-105" : ""
                        }`}
                      />
                      {hasProjects && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                          <span className="text-white text-base font-medium border-2 border-white px-6 py-2.5 rounded-full hover:bg-white hover:text-gray-900 transition">
                            View Projects
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Decorative badge */}
                    <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-[#7a4f1d] text-white flex items-center justify-center text-sm font-bold shadow-lg">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="px-2 lg:px-6">
                    <span className="text-sm tracking-[0.3em] text-[#7a4f1d] font-medium uppercase mb-3 block">
                      {service.category || "Service"}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                      {service.title}
                    </h2>
                    <div className="w-16 h-1 bg-[#7a4f1d] mb-6"></div>
                    <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
                      {service.detail}
                    </p>

                    {hasProjects && (
                      <button
                        onClick={() => handleServiceClick(service.title)}
                        className="mt-8 inline-flex items-center gap-2 px-7 py-3 bg-[#7a4f1d] text-white rounded-full hover:bg-[#5a3a12] transition-all duration-300 hover:scale-105 shadow-md"
                      >
                        View Our Work
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="px-6 py-24 sm:px-12 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#7a4f1d]/10 text-[#7a4f1d] text-sm font-medium tracking-wide mb-4">
              Our Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              How We Bring Ideas to Life
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              A structured, collaborative process that ensures excellence at every stage
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative"
              >
                {/* Connector line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/4 left-full w-full h-0.5 bg-gradient-to-r from-[#7a4f1d]/20 to-transparent"></div>
                )}
                
                <div className="bg-[#f8f6f2] rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group-hover:border-[#7a4f1d]/30 border border-transparent">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-[#7a4f1d] text-white flex items-center justify-center text-2xl font-bold mb-5 shadow-md group-hover:scale-110 transition duration-300">
                    {step.step}
                  </div>
                  <div className="text-[#7a4f1d] mb-3 flex justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative px-6 py-24 sm:px-12 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#3b2f2f] to-[#2a221f]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5"
          >
            Have a Project in Mind?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg"
          >
            Let's collaborate to create a space that feels modern, elegant, and truly yours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <button
              onClick={() => nav("/contact")}
              className="mt-10 inline-flex items-center gap-2 px-8 py-3.5 bg-[#7a4f1d] text-white rounded-full hover:bg-[#5a3a12] transition-all duration-300 hover:scale-105 shadow-lg text-lg font-medium"
            >
              Start Your Project
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;