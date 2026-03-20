import React, { useEffect, useRef, useState } from "react";
import rambaran from "../assets/rambaran.png";
import { animate, useInView } from "motion/react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

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

const AboutPage = () => {
  return (
    <div>
      {/* HERO */}
      <h1 className="text-2xl sm:text-4xl lg:text-5xl text-center py-16 font-semibold">
  Designing Spaces That Reflect Your Vision
</h1>

<p className="text-center text-gray-600 max-w-2xl mx-auto px-5 -mt-8">
  With over a decade of experience, Gravity Design Studio creates modern,
  functional, and inspiring spaces across Nepal.
</p>

      {/* FOUNDER */}
      <section className="grid md:grid-cols-2 gap-10 py-16 px-5 md:px-10">
        <img
          src={rambaran}
          className="rounded-3xl lg:px-20 h-165 object-cover w-full"
          alt="founder"
        />

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold ">Ar. Rambaran Kapar</h2>
          <h2 className="text-xl font-extralight mb-4">Founder & CEO</h2>
          <p className="text-gray-600 leading-8 mb-6">
            With over 10 years of experience in the architectural and design
            field, Ar. Rambaran Kapar founded Gravity Design Studio with a vision to
            create meaningful and innovative spaces. Driven by a passion for
            modern design and a commitment to excellence, he has led the company
            to deliver projects that are not only visually appealing but also
            highly functional and sustainable. Under his leadership, Gravity
            Design Studio has successfully completed a wide range of projects,
            from residential interiors to large-scale architectural
            developments. His approach focuses on understanding client needs,
            attention to detail, and pushing creative boundaries — making the
            studio a trusted name in the design industry.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="#"
              target="_blank"
              className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-500 hover:text-white transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              target="_blank"
              className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-pink-500 hover:text-white transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              target="_blank"
              className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-700 hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-16 px-5 md:px-10 bg-gray-50">
        <h1 className="text-center text-3xl font-semibold mb-10">Our Team</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-5 text-center shadow-md">
            <img
              src={rambaran}
              className="h-40 w-40 mx-auto rounded-full object-cover mb-4"
              alt="team"
            />
            <h2 className="text-xl font-semibold">Ar. Rambaran Kapar</h2>
            <p className="text-gray-500">Founder & CEO</p>
          </div>

          <div className="bg-white rounded-3xl p-5 text-center shadow-md">
            <img
              src={rambaran}
              className="h-40 w-40 mx-auto rounded-full object-cover mb-4"
              alt="team"
            />
            <h2 className="text-xl font-semibold">Team Member</h2>
            <p className="text-gray-500">Architect</p>
          </div>

          <div className="bg-white rounded-3xl p-5 text-center shadow-md">
            <img
              src={rambaran}
              className="h-40 w-40 mx-auto rounded-full object-cover mb-4"
              alt="team"
            />
            <h2 className="text-xl font-semibold">Team Member</h2>
            <p className="text-gray-500">3D Designer</p>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="py-16 px-5 md:px-10">
        <h1 className="text-3xl text-center font-semibold mb-5">Our Journey</h1>
        <p className="text-xl sm:text-2xl text-center p-10 font-extralight">
          Gravity Design Studio is the best interior design/architectural firm
          based service provider in Kathmandu, Nepal. Established in 2015, has
          been a prominent name in the architectural world for over 11 years,
          known for creating inspiring and functional spaces. As one of the
          leading design studios in the region, we blend innovation with
          sustainability to deliver projects that make a lasting impact.<br/><br/>
          Our expert team collaborates closely with clients to bring their visions to life, whether it’s a Residential, Commercial, Hospitality, Landscape Designs, Urban Planning and beyond design. At Gravity, we are committed to excellence and are dedicated to setting new standards in architectural design, making us a premier choice for projects across Nepal and beyond.
        </p>
      </section>

      {/* STATS */}
      <section className="bg-blue-500 text-white py-16 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h1 className="text-3xl font-bold">
              <CountUp to={50} suffix="+" />
            </h1>
            <p>Projects</p>
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              <CountUp to={30} suffix="+" />
            </h1>
            <p>Happy Clients</p>
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              <CountUp to={11} suffix="+" />
            </h1>
            <p>Years Experience</p>
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              <CountUp to={100} suffix="%" />
            </h1>
            <p>Satisfaction</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
