import React, { useEffect, useRef, useState } from "react";
import rambaran from "../assets/rambaran.png";
import { animate, useInView, motion } from "motion/react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CountUp = ({ to, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration: 2,
        onUpdate(value) {
          setCount(Math.floor(value));
        },
      });

      return () => controls.stop();
    }
  }, [isInView, to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};



const stats = [
  { value: 100, suffix: "+", label: "Projects" },
  { value: 100, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 99, suffix: "%", label: "Satisfaction" },
];

const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);

const getTeamMembers = async () => {
  try {
    const req = await axios.get(`${BACKEND_URL}/api/team/all`);
    setTeamMembers(req?.data?.data || []);
  } catch (error) {
    console.log(error);
    setTeamMembers([]);
  }
};
useEffect(() => {
  getTeamMembers();
}, []);

  return (
    <div className="bg-[#f8f6f2] text-gray-900">
      {/* HERO */}
      <section className="px-5 pt-28 pb-20 sm:px-10 lg:px-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 uppercase tracking-[0.3em] text-sm text-gray-500"
        >
          About Us
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-5xl text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight"
        >
          Designing spaces that reflect your vision with beauty and purpose.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600"
        >
          With over a decade of experience, Gravity Design Studio creates modern,
          functional, and inspiring spaces across Nepal through thoughtful design,
          creativity, and attention to detail.
        </motion.p>
      </section>

      {/* FOUNDER */}
      <section className="px-5 py-16 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-[2rem] shadow-xl"
          >
            <img
              src={rambaran}
              className="h-[500px] md:h-[620px] w-full object-cover"
              alt="Founder"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 uppercase tracking-[0.3em] text-sm text-gray-500">
              Founder
            </p>

            <h2 className="text-3xl sm:text-4xl font-semibold">
              Ar. Rambaran Kapar
            </h2>
            <p className="mt-2 text-lg text-gray-500">Founder & CEO</p>

            <p className="mt-6 text-gray-600 leading-8">
              With over 10 years of experience in the architectural and design
              field, Ar. Rambaran Kapar founded Gravity Design Studio with a vision
              to create meaningful and innovative spaces. Driven by a passion for
              modern design and a commitment to excellence, he has led the studio
              to deliver projects that are visually elegant, highly functional, and
              thoughtfully planned.
            </p>

            <p className="mt-5 text-gray-600 leading-8">
              Under his leadership, Gravity Design Studio has completed a wide
              range of residential, commercial, and architectural projects. His
              approach focuses on understanding client needs, attention to detail,
              and pushing creative boundaries — making the studio a trusted name
              in the design industry.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition hover:-translate-y-1 hover:bg-blue-500 hover:text-white"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition hover:-translate-y-1 hover:bg-pink-500 hover:text-white"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition hover:-translate-y-1 hover:bg-blue-700 hover:text-white"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-white px-5 py-20 sm:px-10 lg:px-20">
        <div className="text-center">
          <p className="mb-4 uppercase tracking-[0.3em] text-sm text-gray-500">
            Our Team
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
            The people behind our creative work.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[2rem] bg-[#f8f6f2] p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
            >
              <img
                src={member.image}
                className="mx-auto h-40 w-40 rounded-full object-cover shadow-md"
                alt={member.name}
              />
              <h3 className="mt-5 text-2xl font-semibold">{member.name}</h3>
              <p className="mt-2 text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* JOURNEY */}
      <section className="px-5 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 uppercase tracking-[0.3em] text-sm text-gray-500">
            Our Journey
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            Building a design studio rooted in creativity, quality, and trust.
          </h2>

          <p className="mt-8 text-lg leading-9 text-gray-600">
            Gravity Design Studio is a leading interior design and architectural
            service provider based in Kathmandu, Nepal. Established in 2015, the
            studio has grown into a prominent name in the design world, known for
            creating inspiring and functional spaces that combine innovation with
            practicality.
          </p>

          <p className="mt-6 text-lg leading-9 text-gray-600">
            Our expert team works closely with clients to bring their visions to
            life across residential, commercial, hospitality, landscape, and urban
            design projects. At Gravity, we are committed to excellence and
            continuously strive to set new standards in modern design across Nepal
            and beyond.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="px-5 pb-20 sm:px-10 lg:px-20">
        <div className="rounded-[2.5rem] bg-black px-6 py-14 text-white sm:px-10 lg:px-16">
          <div className="text-center mb-10">
            <p className="mb-4 uppercase tracking-[0.3em] text-sm text-white/60">
              Our Impact
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
              Numbers that reflect our journey.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] bg-white/5 p-6 text-center backdrop-blur-sm"
              >
                <h3 className="text-3xl sm:text-4xl font-bold">
                  <CountUp to={item.value} suffix={item.suffix} />
                </h3>
                <p className="mt-3 text-white/75">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;