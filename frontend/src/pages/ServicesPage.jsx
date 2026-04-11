import React, { useEffect, useState, useRef } from "react";
import { motion, animate, useInView } from "motion/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
    { number: 10, suffix: "+", label: "Years of Experience" },
    { number: 100, suffix: "+", label: "Completed Projects" },
    { number: 99, suffix: "%", label: "Client Satisfaction" },
    { number: 15, suffix: "+", label: "Awards & Recognition" },
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
    <div className="bg-white text-gray-800">
      <section className="bg-[#f8f6f2] pt-24 pb-16 px-5 lg:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-4"
          >
            What We Offer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight"
          >
            Our Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-gray-600 mt-6 text-base sm:text-lg leading-8"
          >
            Gravity Design Studio is driven by a commitment to transform ideas
            into meaningful and well-crafted spaces. Our approach combines
            creative vision with practical design strategies to deliver
            solutions that are both aesthetically refined and functionally
            efficient.
          </motion.p>
        </div>
      </section>

      <section className="px-5 lg:px-20 py-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-black">
                <CountUp to={item.number} suffix={item.suffix} />
              </h2>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 lg:px-20 py-16 bg-[#fcfbf8]">
        <div className="max-w-7xl mx-auto space-y-16">
          {services.map((service, index) => {
            const hasProjects = hasProjectsForService(service.title);

            return (
              <motion.div
                key={service._id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="overflow-hidden rounded-3xl shadow-lg">
                  <div
                    onClick={() => hasProjects && handleServiceClick(service.title)}
                    className={`relative overflow-hidden rounded-3xl shadow-lg group ${
                      hasProjects ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className={`w-full h-[280px] sm:h-[360px] lg:h-[420px] object-cover transition duration-500 ${
                        hasProjects ? "group-hover:scale-105" : ""
                      }`}
                    />

                    {hasProjects && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                        <span className="text-white text-lg font-semibold border border-white px-5 py-2 rounded-full">
                          View Projects
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-1 lg:px-6">
                  <p className="text-sm tracking-[0.25em] text-gray-400 mb-3">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h2 className="text-3xl sm:text-3xl font-semibold mb-5 leading-tight">
                    {service.title}
                  </h2>

                  <p className="text-gray-600 leading-8 text-base">
                    {service.detail}
                  </p>

                  {hasProjects && (
                    <button
                      onClick={() => handleServiceClick(service.title)}
                      className="mt-6 px-6 py-3 bg-[#795703] text-white rounded-full hover:bg-gray-800 transition"
                    >
                      View Projects
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-20 px-5 lg:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-3">
            Our Workflow
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-12">
            Our Process
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Consultation", "Planning", "Design", "Execution"].map(
              (step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#f8f6f2] rounded-2xl p-8 shadow-sm hover:shadow-md transition"
                >
                  <div className="text-4xl font-bold text-gray-300 mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl font-semibold">{step}</h3>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-20 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-5"
          >
            Have a Project in Mind?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-gray-300 max-w-2xl mx-auto leading-8"
          >
            Let’s create a space that feels modern, elegant, and truly yours.
          </motion.p>

          <button
            onClick={() => nav("/contact")}
            className="mt-8 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;