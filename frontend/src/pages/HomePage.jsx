import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { RiScrollToBottomLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import video from "../assets/herovideo.mp4";
import building from "../assets/building.png";
import interior from "../assets/interior.png";
import logo from "../assets/gravityLogo.png";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const HomePage = () => {
  const nav = useNavigate();

  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);

  const openPdf = () => {
  window.open("/files/GRAVITY.pdf", "_blank");
};
  const features = [
    {
      icon: "✨",
      title: "Creative Design",
      desc: "Unique concepts tailored to match your vision and lifestyle.",
    },
    {
      icon: "📐",
      title: "Smart Planning",
      desc: "Thoughtful layouts that maximize beauty, comfort, and usability.",
    },
    {
      icon: "🏆",
      title: "Quality Focus",
      desc: "Every detail is handled carefully to ensure elegant final results.",
    },
    {
      icon: "🤝",
      title: "Client First",
      desc: "We work closely with clients to turn ideas into meaningful spaces.",
    },
  ];

  const getHomeData = async () => {
    try {
      const [serviceRes, projectRes, reviewRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/service/find`),
        axios.get(`${BACKEND_URL}/api/project/all?page=1&limit=3&category=All`),
        axios.get(`${BACKEND_URL}/api/review/all`),
      ]);

      setServices((serviceRes?.data?.data || serviceRes?.data || []).slice(0, 3));
      setProjects((projectRes?.data?.data || []).slice(0, 3));
      setReviews((reviewRes?.data?.data || []).slice(0, 3));
    } catch (error) {
      console.log("HOME DATA FETCH ERROR =", error);
      setServices([]);
      setProjects([]);
      setReviews([]);
    }
  };

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <div className="bg-[#f8f6f2] text-gray-900">
      {/* HERO */}
      <section id="section1" className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 uppercase tracking-[0.35em] text-sm text-white/80"
          >
            Architecture • Interior • 3D Visualization
          </motion.p>

          <div className="flex items-center">
            <motion.img
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              src={logo}
              className="h-35"
              alt="logo image"
            />
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{ fontFamily: "Dancing Script, cursive" }}
              className="text-white text-4xl sm:text-6xl lg:text-8xl drop-shadow-xl"
            >
              Gravity Design Studio
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base leading-8 text-white/85 sm:text-lg"
          >
            We create modern, elegant, and functional spaces that transform ideas
            into timeless design experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <button
              onClick={openPdf}
              className="rounded-full  px-8 py-3 text-lg font-medium text-white bg-[#795703] transition hover:scale-105"
            >
              View Portfolio
            </button>
            <button
              onClick={() => nav("/contact")}
              className="rounded-full border border-white px-8 py-3 text-lg font-medium text-white transition hover:bg-[#795703] hover:text-white "
            >
              Get In Touch
            </button>
          </motion.div>

          <motion.a
            href="#section2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="absolute bottom-8 text-white"
          >
            <RiScrollToBottomLine size={34} />
          </motion.a>
        </div>
      </section>

      {/* ABOUT INTRO */}
      <section id="section2" className="px-5 py-20 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 uppercase tracking-[0.3em] text-sm text-gray-500">
              About Us
            </p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Designing spaces that feel beautiful, practical, and timeless.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              At Gravity Design Studio, we create modern and functional spaces
              that blend style, comfort, and creativity. Every design is crafted
              to reflect your vision while maintaining elegance and purpose in
              every detail.
            </p>

            <button
              onClick={() => nav("/projects")}
              className="mt-8 rounded-full bg-[#795703] px-7 py-3 text-white transition hover:bg-gray-800"
            >
              Explore Projects
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-[2rem] shadow-xl"
          >
            <img
              src={building}
              alt="Gravity Design Studio Building"
              className="h-[500px] w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white px-5 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 uppercase tracking-[0.3em] text-sm text-gray-500">
            Our Services
          </p>
          <h2 className="text-3xl font-semibold text-gray-800 sm:text-4xl lg:text-5xl">
            Modern and creative design solutions tailored to your needs.
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-600">
            Discover our range of services crafted to bring beauty, comfort, and
            functionality to every space.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.length > 0 ? (
            services.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group overflow-hidden rounded-[2rem] border border-gray-100 bg-[#f8f6f2] p-4 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="overflow-hidden rounded-[1.5rem]">
                  <img
                    className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
                    src={item.image || interior}
                    alt={item.title}
                  />
                </div>

                <div className="pt-5">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-gray-600">
                    {item.detail}
                  </p>

                  <button
                    onClick={() => nav("/services")}
                    className="mt-6 rounded-full bg-[#795703] px-5 py-2.5 text-white transition hover:bg-gray-800"
                  >
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No services found
            </p>
          )}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="px-5 py-20 sm:px-10 lg:px-20">
        <div className="text-center">
          <p className="mb-4 uppercase tracking-[0.3em] text-sm text-gray-500">
            Recent Projects
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Selected works that reflect our design vision.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Explore some of our latest interior, architectural, and creative
            design works.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.length > 0 ? (
            projects.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group overflow-hidden rounded-[2rem] bg-white shadow-md transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.heroImage || interior}
                    alt={item.title}
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <span className="inline-block rounded-full bg-black/5 px-3 py-1 text-sm text-gray-700">
                    {item.category}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No projects found
            </p>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => nav("/projects")}
            className="rounded-full bg-[#795703] px-8 py-3 text-lg font-medium text-white transition hover:bg-gray-800"
          >
            View All Projects
          </button>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white px-5 py-20 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 uppercase tracking-[0.3em] text-sm text-gray-500">
              Why Choose Us
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-gray-800 sm:text-4xl lg:text-5xl">
              Thoughtful design with beauty, purpose, and precision.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              We focus on creating interiors and architectural solutions that
              balance creativity, comfort, and practicality. Every project is
              shaped with attention to detail and a vision that reflects your style.
            </p>

            <button
              onClick={() => nav("/contact")}
              className="mt-8 rounded-full bg-[#795703] px-7 py-3 text-white transition hover:bg-gray-800"
            >
              Get In Touch
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] bg-[#f8f6f2] p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                  {item.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="leading-7 text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-5 py-20 sm:px-10 lg:px-20">
        <div className="text-center">
          <p className="mb-4 uppercase tracking-[0.3em] text-sm text-gray-500">
            Testimonials
          </p>
          <h2 className="text-3xl font-semibold text-gray-800 sm:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.length > 0 ? (
            reviews.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.profession}</p>
                  </div>
                </div>

                <p className="leading-8 text-gray-600">“{item.message}”</p>
              </motion.div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No reviews found
            </p>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-20 sm:px-10 lg:px-20">
        <div className="overflow-hidden rounded-[2.5rem] bg-black px-8 py-14 text-center text-white sm:px-12 lg:px-16">
          <p className="mb-4 uppercase tracking-[0.3em] text-sm text-white/60">
            Let’s Work Together
          </p>

          <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Ready to transform your space?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">
            Let’s bring your ideas to life with modern, creative, and functional
            design solutions tailored just for you.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => nav("/contact")}
              className="rounded-full bg-white px-8 py-3 text-lg font-medium text-black transition hover:scale-105"
            >
              Get Free Consultation
            </button>

            <button
              onClick={() => nav("/projects")}
              className="rounded-full border border-white px-8 py-3 text-lg font-medium text-white transition hover:bg-white hover:text-black"
            >
              View Our Work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;