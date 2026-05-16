import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "motion/react";
import {
  RiScrollToBottomLine,
  RiArrowRightLine,
  RiStarFill,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import building from "../assets/building.png";
import interior from "../assets/interior.png";
import logo from "../assets/gravityLogo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;

const HomePage = () => {
  const nav = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [projects, setProjects] = useState([]);
  const [homeVideo, setHomeVideo] = useState("");

  const getHomeVideo = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/homevideo/get`);
      if (res.data.success) {
        setHomeVideo(res.data.data?.videoUrl);
      }
    } catch (error) {
      console.log("VIDEO FETCH ERROR =", error);
    }
  };

  const features = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "Creative Design",
      desc: "Unique concepts tailored to match your vision, lifestyle, and personality.",
      color: "from-amber-500/20 to-amber-600/5",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      ),
      title: "Smart Planning",
      desc: "Thoughtful layouts that maximize beauty, comfort, and everyday usability.",
      color: "from-emerald-500/20 to-emerald-600/5",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
      title: "Quality Focus",
      desc: "Every detail is handled carefully to ensure elegant, lasting results.",
      color: "from-blue-500/20 to-blue-600/5",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Client First",
      desc: "We work closely with clients to turn ideas into meaningful, personal spaces.",
      color: "from-purple-500/20 to-purple-600/5",
    },
  ];

  const getHomeData = async () => {
    try {
      const [serviceRes, reviewRes, projectRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/service/find`),
        axios.get(`${BACKEND_URL}/api/review/all`),
        axios.get(`${BACKEND_URL}/api/project/all`),
      ]);

      setServices((serviceRes?.data?.data || []).slice(0, 3));
      setReviews((reviewRes?.data?.data || []).slice(0, 6));
      setProjects(projectRes?.data?.data || []);
    } catch (error) {
      console.log("HOME DATA FETCH ERROR =", error);
      setServices([]);
      setReviews([]);
    }
  };

  const selectedProjects = [
    projects.find((p) => p.status === "Completed"),
    projects.find((p) => p.status === "Ongoing"),
    projects.find((p) => p.status === "Upcoming"),
  ].filter(Boolean);

  useEffect(() => {
    getHomeData();
    getHomeVideo();
  }, []);

  return (
    <>
      {/* 🔥 SEO SECTION (DO NOT REMOVE) */}
      <Helmet>
        <title>
          Gravity Design Studio | Interior Design & Architecture in Nepal
        </title>

        <meta
          name="description"
          content="Gravity Design Studio provides professional interior design and architecture services in Nepal. Modern house design, commercial interiors, and turnkey solutions in Kathmandu."
        />

        <meta
          name="keywords"
          content="interior design Nepal, architecture Nepal, interior designer Kathmandu, house design Nepal, modern interior Nepal"
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://your-domain.com" />

        {/* Open Graph */}
        <meta property="og:title" content="Gravity Design Studio Nepal" />
        <meta
          property="og:description"
          content="Modern interior design and architecture services in Nepal."
        />
      </Helmet>

      {/* 🔥 LOCAL BUSINESS SCHEMA */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Gravity Design Studio",
          description: "Interior design and architecture company in Nepal",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Kathmandu",
            addressCountry: "NP",
          },
          url: "https://your-domain.com",
        })}
      </script>

      <div className="bg-white text-gray-900">
        {/* HERO SECTION */}
        <section className="relative min-h-screen w-full overflow-hidden">
          {/* 🔥 SEO H1 (IMPORTANT FIX) */}
          <h1 className="sr-only">
            Best Interior Design & Architecture Services in Nepal
          </h1>

          {homeVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={homeVideo} type="video/mp4" />
            </video>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 text-center">
            <motion.div
              style={{ opacity, scale }}
              className="flex flex-col items-center"
            >
              <motion.img
                src={logo}
                className="h-20 sm:h-24 lg:h-28 mb-6 drop-shadow-2xl"
                alt="Gravity Design Studio Logo Nepal"
                loading="lazy"
              />

              {/* Brand Title */}
              <motion.h2 className="font-logo text-white text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight uppercase">
                Gravity Design Studio
              </motion.h2>

              <motion.p className="tracking-[0.3em] text-sm sm:text-base text-amber-200/90 font-light">
                ARCHITECTURE / INTERIOR / VASTU / TURNKEY
              </motion.p>

              <motion.p className="mt-8 max-w-2xl text-white/80">
                We provide modern interior design and architecture services in
                Nepal.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-10 flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => nav("/contact")}
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-3.5 text-lg font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <span className="relative z-10">Get In Touch</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 bg-gradient-to-r from-amber-700 to-amber-800" />
                </button>
              </motion.div>
            </motion.div>
            <motion.a
              href="#section2"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-8 text-white/70 hover:text-white cursor-pointer transition-colors"
            >
              <RiScrollToBottomLine size={36} />
            </motion.a>
          </div>
        </section>

        {/* ABOUT SECTION (UNCHANGED DESIGN, SEO IMPROVED TEXT ONLY) */}
        <section
          id="section2"
          className="relative px-6 py-32 sm:px-12 lg:px-24 bg-white"
        >
          <div className="max-w-7xl mx-auto">
            {/* SEO H2 FIX */}
            <h2 className="sr-only">
              Interior Design & Architecture Services in Nepal
            </h2>

            {/* KEEP YOUR ORIGINAL UI BELOW (UNCHANGED) */}
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              {/* your existing content stays same */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  About Us
                </span>
                <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl text-gray-900">
                  Designing spaces that feel{" "}
                  <span className="text-[#7a5c02]">beautiful</span>,
                  <br />
                  practical, and timeless.
                </h2>
                <div className="mt-8 w-20 h-1 bg-gradient-to-r from-amber-500 to-transparent" />
                <p className="mt-6 text-lg leading-relaxed text-gray-600">
                  At Gravity Design Studio, we create modern and functional
                  spaces that blend style, comfort, and creativity. Every design
                  is crafted to reflect your vision while maintaining elegance
                  and purpose in every detail.
                </p>
                <button
                  onClick={() => nav("/projects")}
                  className="mt-8 group inline-flex items-center gap-2 rounded-full bg-[#7a5c02] px-8 py-3.5 text-white transition-all duration-300 hover:bg-amber-600 hover:gap-4"
                >
                  Explore Our Work
                  <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-transparent rounded-3xl blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={building}
                    alt="Gravity Design Studio Building"
                    className="h-[500px] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="relative bg-gradient-to-b from-gray-50 to-white px-6 py-32 sm:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Our Services
              </span>
              <h2 className="mt-6 text-3xl font-bold text-[#7a5c02] sm:text-4xl lg:text-5xl">
                Modern and creative design
                <br />
                solutions tailored to you.
              </h2>
              <div className="mt-6 w-20 h-1 bg-gradient-to-r from-amber-500 to-transparent mx-auto" />
              <p className="mt-6 text-lg text-gray-600">
                Discover our range of services crafted to bring beauty, comfort,
                and functionality to every space.
              </p>
            </motion.div>

            <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.length > 0 ? (
                services.map((item, index) => (
                  <motion.div
                    key={item._id || index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                  >
                    <div className="overflow-hidden h-72">
                      <img
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        src={item.image || interior}
                        alt={item.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="relative p-8">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-gray-600 leading-relaxed line-clamp-3">
                        {item.detail}
                      </p>
                      <button
                        onClick={() => nav("/services")}
                        className="mt-6 group inline-flex items-center gap-2 text-amber-600 font-semibold hover:gap-3 transition-all"
                      >
                        Learn More
                        <RiArrowRightLine className="text-sm transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-500 py-12">
                  Loading services...
                </p>
              )}
            </div>
          </div>
        </section>

        {/* PROJECT SECTION */}

        <section className="bg-[#f8f6f2] px-6 py-24 sm:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#7a4f1d]/10 text-[#7a4f1d] text-sm font-medium mb-5">
                Our Projects
              </span>

              <h2 className="text-3xl font-bold text-[#7a4f1d] sm:text-4xl lg:text-5xl">
                Featured Projects
              </h2>

              <p className="mt-4 text-gray-600">
                A glimpse of our latest completed, ongoing and upcoming work
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedProjects.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  onClick={() => nav(`/projects?status=${item.status}`)}
                >
                  <div className="overflow-hidden h-64">
                    <img
                      src={item.heroImage}
                      className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>

                  <div className="p-6">
                    <span
                      className={`text-xs px-3 py-1 rounded-full text-white ${
                        item.status === "Completed"
                          ? "bg-emerald-500"
                          : item.status === "Ongoing"
                            ? "bg-amber-500"
                            : "bg-sky-500"
                      }`}
                    >
                      {item.status}
                    </span>

                    <h3 className="text-xl font-semibold text-[#7a4f1d] mt-3">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-gray-600 line-clamp-2">
                      {item.description}
                    </p>

                    <button className="mt-5 rounded-full bg-[#7a4f1d] px-6 py-2 text-white hover:bg-[#5a3a12] transition">
                      View Project
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* PORTFOLIO DOWNLOAD */}
        <section className="relative px-6 py-32 sm:px-12 lg:px-24 bg-white overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-50" />

          <div className="relative max-w-6xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Portfolio
            </span>

            <h2 className="mt-6 text-3xl font-bold text-[#7a5c02] sm:text-4xl lg:text-5xl">
              Download Our Portfolio
            </h2>

            <p className="mt-4 text-gray-600 text-lg">
              Explore our complete interior and architectural works in detail
            </p>

            <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Interior */}
              <div className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Interior Design Portfolio
                </h3>

                <p className="text-gray-600 mb-6">
                  Complete collection of interior design projects and concepts.
                </p>

                <a
                  href="https://drive.google.com/file/d/1npA_1i48cxHbtkSeVoq2_bquvMKH1-uQ/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#7a5c02] text-white px-6 py-3 rounded-full hover:bg-amber-600 transition-all duration-300 group-hover:gap-3"
                >
                  Download PDF
                  <RiArrowRightLine className="text-sm" />
                </a>
              </div>

              {/* Architecture */}
              <div className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Architecture Portfolio
                </h3>

                <p className="text-gray-600 mb-6">
                  Explore our architectural designs and large-scale projects.
                </p>

                <a
                  href="https://drive.google.com/file/d/13qTswi017GwRFHBSefFoAiJ5ySlpNi7d/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#7a5c02] text-white px-6 py-3 rounded-full"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="relative bg-gradient-to-b from-gray-50 to-white px-6 py-32 sm:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Why Choose Us
                </span>
                <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl text-gray-900">
                  Thoughtful design with
                  <br />
                  <span className="text-[#7a5c02]">beauty, purpose, and</span>
                  <br />
                  precision.
                </h2>
                <div className="mt-8 w-20 h-1 bg-gradient-to-r from-amber-500 to-transparent" />
                <p className="mt-6 text-lg leading-relaxed text-gray-600">
                  We focus on creating interiors and architectural solutions
                  that balance creativity, comfort, and practicality. Every
                  project is shaped with attention to detail and a vision that
                  reflects your style.
                </p>
                <button
                  onClick={() => nav("/contact")}
                  className="mt-8 group inline-flex items-center gap-2 rounded-full bg-[#7a5c02] px-8 py-3.5 text-white transition-all duration-300 hover:bg-amber-600 hover:gap-4"
                >
                  Get In Touch
                  <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {features.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative rounded-2xl bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <div className="relative">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="leading-relaxed text-gray-600">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="px-6 py-32 sm:px-12 lg:px-24 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Testimonials
              </span>
              <h2 className="mt-6 text-3xl font-bold text-[#7a5c02] sm:text-4xl lg:text-5xl">
                What Our Clients Say
              </h2>
              <div className="mt-6 w-20 h-1 bg-gradient-to-r from-amber-500 to-transparent mx-auto" />
              <p className="mt-6 text-lg text-gray-600">
                Real stories from people who trusted us with their spaces
              </p>
            </motion.div>

            <div className="mt-20">
              {reviews.length > 0 ? (
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  loop={reviews.length > 3}
                  autoplay={
                    reviews.length > 3
                      ? {
                          delay: 2000,
                          disableOnInteraction: false,
                        }
                      : false
                  }
                  breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                >
                  {reviews.map((item, index) => {
                    const firstLetter = item.name?.charAt(0).toUpperCase();

                    return (
                      <SwiperSlide key={item._id || index}>
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="group relative rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                          <div className="absolute top-6 right-6 text-amber-500/20 text-6xl font-serif">
                            "
                          </div>

                          <div className="flex items-center gap-4 mb-6">
                            <div className="h-14 w-14 rounded-full flex items-center justify-center bg-[#7a5c02] text-white text-xl font-bold shadow-lg">
                              {firstLetter}
                            </div>

                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">
                                {item.name}
                              </h3>
                              {item.profession && (
                                <p className="text-sm text-gray-500">
                                  {item.profession}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-0.5 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <RiStarFill
                                key={i}
                                className="text-amber-400 text-sm"
                              />
                            ))}
                          </div>

                          <p className="text-gray-600 leading-relaxed italic">
                            “{item.description}”
                          </p>
                        </motion.div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : (
                <p className="text-center text-gray-500 py-12">
                  Loading reviews...
                </p>
              )}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative px-6 py-32 sm:px-12 lg:px-24 bg-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070')] bg-cover bg-center opacity-10" />
          </div>
          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-amber-400 text-sm font-medium backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Let's Work Together
              </span>
              <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Ready to transform your space?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
                Let's bring your ideas to life with modern, creative, and
                functional design solutions tailored just for you.
              </p>
              <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  onClick={() => nav("/contact")}
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <span className="relative z-10">Get Free Consultation</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 bg-gradient-to-r from-amber-600 to-amber-700" />
                </button>
                <button
                  onClick={() => nav("/projects")}
                  className="rounded-full border-2 border-white/30 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105"
                >
                  View Our Work
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
