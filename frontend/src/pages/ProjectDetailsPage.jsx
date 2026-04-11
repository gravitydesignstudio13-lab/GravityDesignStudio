import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSingleProject = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/project/${id}`);

      if (res.data.success) {
        setProject(res.data.data);
      }
    } catch (error) {
      console.log(error);
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-5">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <button
          onClick={() => navigate("/projects")}
          className="px-6 py-3 bg-black text-white rounded-full"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900">
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="absolute bottom-10 left-0 right-0 px-5 sm:px-10 lg:px-20 text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm mb-4"
          >
            {project.category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold"
          >
            {project.title}
          </motion.h1>

          <p className="mt-3 text-gray-200 text-sm sm:text-base">
            {project.location} • {project.year}
          </p>
        </div>
      </section>

      <section className="py-20 px-5 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-semibold mb-6"
            >
              Project Overview
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 leading-8 text-lg"
            >
              {project.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-3xl p-8 shadow-sm"
          >
            <h3 className="text-2xl font-semibold mb-6">Project Info</h3>

            <div className="space-y-5">
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <h4 className="text-lg font-medium">{project.client}</h4>
              </div>

              <div>
                <p className="text-sm text-gray-500">Location</p>
                <h4 className="text-lg font-medium">{project.location}</h4>
              </div>

              <div>
                <p className="text-sm text-gray-500">Area</p>
                <h4 className="text-lg font-medium">{project.area}</h4>
              </div>

              <div>
                <p className="text-sm text-gray-500">Year</p>
                <h4 className="text-lg font-medium">{project.year}</h4>
              </div>

              <div>
                <p className="text-sm text-gray-500">Service</p>
                <h4 className="text-lg font-medium">{project.service}</h4>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-5 sm:px-10 lg:px-20 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">The Challenge</h2>
            <p className="text-gray-600 leading-8">{project.challenge}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">The Solution</h2>
            <p className="text-gray-600 leading-8">{project.solution}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-5 sm:px-10 lg:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-semibold mb-10 text-center"
        >
          Project Gallery
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
          {project.gallery?.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              className="overflow-hidden rounded-3xl"
            >
              <img
                src={img}
                alt={`${project.title} ${index + 1}`}
                className="h-[350px] w-full object-cover hover:scale-105 transition duration-700"
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-black text-white py-20 px-5 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Interested in a similar project?
        </h2>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Let’s design a space that reflects your vision with elegance and purpose.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
          >
            Contact Us
          </button>

          <button
            onClick={() => navigate("/projects")}
            className="px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition"
          >
            Back to Projects
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailsPage;