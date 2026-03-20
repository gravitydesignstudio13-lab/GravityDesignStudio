import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="w-full bg-[#0f172a] text-white px-5 py-14 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h1
              style={{ fontFamily: "Dancing Script, cursive" }}
              className="text-3xl sm:text-4xl text-blue-400 mb-4"
            >
              Gravity Design Studio
            </h1>
            <p className="text-gray-300 leading-7">
              We create modern, elegant, and functional spaces that bring your
              ideas to life with creativity and precision.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="flex flex-col gap-3 text-gray-300">
              <NavLink to="/" className="hover:text-blue-400 transition">
                Home
              </NavLink>
              <NavLink to="/about" className="hover:text-blue-400 transition">
                About
              </NavLink>
              <NavLink
                to="/services"
                className="hover:text-blue-400 transition"
              >
                Services
              </NavLink>
              <NavLink
                to="/projects"
                className="hover:text-blue-400 transition"
              >
                Projects
              </NavLink>
              <NavLink to="/contact" className="hover:text-blue-400 transition">
                Contact
              </NavLink>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Our Services</h2>
            <div className="flex flex-col gap-3 text-gray-300">
              <p className="hover:text-blue-400 transition cursor-pointer">
                Interior Design
              </p>
              <p className="hover:text-blue-400 transition cursor-pointer">
                Architecture Design
              </p>
              <p className="hover:text-blue-400 transition cursor-pointer">
                3D Visualization
              </p>
              <p className="hover:text-blue-400 transition cursor-pointer">
                Space Planning
              </p>
            </div>
          </div>

          <div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Our Location</h2>

              <div className="rounded-2xl overflow-hidden h-40 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.871222914005!2d85.33537227532429!3d27.721262076174625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19f4458ed4bb%3A0xc9eec53aeaaf5a7b!2sGravity%20Design%20Studio%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1773999601566!5m2!1sen!2snp"
                  className="w-full h-full border-0"
                  loading="lazy"
                ></iframe>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-gray-300 text-sm">
                <p>Bishalnagar, Kathmandu Nepal</p>
                <p>gravitydesignstudio@gmail.com</p>
                <p>+977 9844425728</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Gravity Design Studio. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
