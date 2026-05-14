import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import founderImg from "../assets/rambaran.png";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;
const AboutPage = () => {
  const [team, setTeam] = useState([]);
  const [teamLoading, setTeamLoading] = useState(false);

  const getTeam = async () => {
    try {
      setTeamLoading(true);

      const req = await axios.get(`${BACKEND_URL}/api/team/all`);

      if (req?.data?.success) {
        setTeam(req.data.data || []);
      } else {
        setTeam([]);
      }
    } catch (error) {
      console.log("TEAM ERROR =", error);
      setTeam([]);
    } finally {
      setTeamLoading(false);
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

  const stats = [
    { value: "150+", label: "Projects Completed" },
    { value: "500+", label: "Design Consultations" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "10+", label: "Years Experience" },
  ];

  return (
    <div className="bg-[#f8f6f2] text-[#3b2f2f]">
      {/* ABOUT HERO */}
      <section className="relative bg-[#f5f1ea] px-6 py-20 sm:px-12 lg:px-24 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#7a4f1d]/10 text-[#7a4f1d] text-sm font-medium tracking-wide mb-6">
              Since 2015
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#7a4f1d]">
              About Gravity
              <br />
              Design Studio
            </h1>

            <p className="mt-6 leading-8 text-lg text-gray-700">
              Gravity Design Studio is the best interior design/architectural
              firm based service provider in Kathmandu, Nepal. Established in
              2015, has been a prominent name in the architectural world for
              over 9 years, known for creating inspiring and functional spaces.
              As one of the leading design studios in the region, we blend
              innovation with sustainability to deliver projects that make a
              lasting impact.
            </p>

            <p className="mt-4 leading-8 text-lg text-gray-700">
              Our expert team collaborates closely with clients to bring
              residential, commercial, hospitality, landscape, and urban
              planning projects to life with creativity, excellence, and
              innovation.
            </p>

            <div className="mt-8 border-l-4 border-[#7a4f1d] pl-6">
              <p className="text-gray-700 italic">
                "Design is not just what it looks like — it's how it works,
                feels, and transforms lives."
              </p>
              <p className="mt-2 text-sm text-[#7a4f1d] font-medium">
                — Ar. Rambaran Kapar, Founder
              </p>
            </div>
          </motion.div>

          {/* RIGHT IMAGES */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#7a4f1d]/10 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-[#7a4f1d]/10 rounded-full"></div>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              className="w-full h-[350px] object-cover shadow-xl rounded-2xl relative z-10"
              alt="Modern architecture project"
            />

            <img
              src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
              className="absolute -bottom-6 left-6 sm:left-10 w-[250px] h-[180px] object-cover shadow-lg rounded-xl border-4 border-white z-20"
              alt="Interior design detail"
            />
          </motion.div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="px-6 py-20 sm:px-12 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-[#7a4f1d]">
              Founder & CEO
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#7a4f1d]">
              Ar. Rambaran Kapar
            </h2>
            <p className="mt-5 text-gray-700 leading-relaxed">
              Under Ar. Rambaran's leadership, Gravity Design Studio has
              completed numerous successful projects, ranging from residential
              homes to large-scale urban developments. Their expertise and
              forward-thinking approach have not only shaped the company's
              direction but also set new standards in the architectural
              industry.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              At Gravity Design Studio, every project is approached with a deep
              focus on detail, functionality, and aesthetics. We believe in
              creating spaces that not only look beautiful but also enhance the
              way people live and experience their environment.
            </p>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            src={founderImg}
            className="rounded-3xl shadow-xl h-[450px] object-cover w-full object-top "
            alt="Ar. Rambaran Shah - Founder of Gravity Design Studio"
          />
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 py-20 bg-[#f5f1ea]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-4xl font-bold text-[#7a4f1d]">{s.value}</h3>
                <p className="text-gray-600 mt-1 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-[#7a4f1d]">
              Our Guiding Principles
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#7a4f1d]">
              Vision & Mission
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-[#f5f1ea] hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-[#7a4f1d]/10 flex items-center justify-center mb-5">
                <svg
                  className="w-7 h-7 text-[#7a4f1d]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#7a4f1d] mb-3">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                At Gravity Design Studio, our vision is to create architecture
                that inspires, connects, and endures. We aim to design
                meaningful spaces that balance creativity, functionality, and
                sustainability.
                <br />
                <br />
                We envision a future where design responds thoughtfully to its
                environment while enhancing the quality of life. Through
                innovation and responsible design, we strive to create spaces
                that are both modern and timeless.
                <br />
                <br />
                Our goal is to continuously evolve, embrace new ideas, and
                create work that leaves a lasting impact for generations to
                come.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-[#f5f1ea] hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-[#7a4f1d]/10 flex items-center justify-center mb-5">
                <svg
                  className="w-7 h-7 text-[#7a4f1d]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 12h.01M12 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#7a4f1d] mb-3">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                At Gravity Design Studio, our mission is to create innovative,
                functional, and meaningful spaces that respond to both people
                and their environment. We focus on delivering thoughtful designs
                that balance creativity, practicality, and sustainability.
                <br />
                <br />
                We approach every project with integrity, attention to detail,
                and a deep understanding of context. Through a collaborative
                process, we transform ideas into well-crafted spaces that
                enhance user experience and contribute positively to the built
                environment.
                <br />
                <br />
                We continuously evolve by embracing new technologies and design
                approaches, aiming to create work that is visually compelling,
                efficient, and enduring.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-[#7a4f1d]">
              The Creative Force
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#7a4f1d]">
              Meet Our Leadership
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              A multidisciplinary team of architects and designers dedicated to
              bringing your vision to life.
            </p>
          </motion.div>

          {/* TEAM GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamLoading ? (
              <p className="col-span-4 text-center text-gray-500 py-10">
                Loading team...
              </p>
            ) : team.length === 0 ? (
              <p className="col-span-4 text-center text-gray-500 py-10">
                No team members found
              </p>
            ) : (
              team.map((m, i) => (
                <motion.div
                  key={m._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#f5f1ea] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
                >
                  {/* IMAGE */}
                  <div className="overflow-hidden h-64 relative">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* ROLE BADGE (top overlay) */}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 text-center">
                    {/* NAME */}
                    <h3 className="font-semibold text-xl text-[#3b2f2f]">
                      {m.name}
                    </h3>

                    {/* ROLE (main highlight) */}
                    <p className="text-sm text-blue-600 font-medium mt-1 tracking-wide uppercase">
                      {m.role}
                    </p>

                    {/* Divider */}
                    <div className="w-10 h-[2px] bg-blue-500 mx-auto my-3 rounded"></div>

                    {/* Description */}
                    <div className="relative group/desc">
                      {/* Short text */}

                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 group-hover/desc:opacity-0 transition duration-300">
                        {m.description}
                      </p>

                      {/* Full text on hover */}

                      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm opacity-0 group-hover/desc:opacity-100 transition duration-300 p-3 rounded">
                        <p className="text-sm text-gray-700 leading-relaxed overflow-y-auto max-h-28">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-[#3b2f2f] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Transform Your Space?
          </h2>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto">
            Let's collaborate to create a space that reflects your vision and
            enhances your lifestyle.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-block px-8 py-3.5 bg-[#7a4f1d] text-white rounded-full font-medium hover:bg-[#8a5f2d] hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Start Your Project
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
