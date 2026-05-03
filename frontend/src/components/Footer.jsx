import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTiktok, 
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercent = (scrollPosition / (documentHeight - windowHeight)) * 100;
      
      // Show button when scrolled 69% down
      setShowScrollTop(scrollPercent >= 69);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Interior Design",
    "Architecture Design",
    "3D Visualization",
    "Space Planning",
    "Vastu Consultation",
    "Turnkey Projects",
  ];

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/profile.php?id=100063531258850",
      bgColor: "hover:bg-[#1877f2]",
      label: "Facebook",
    },
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/gravity_design_s",
      bgColor: "hover:bg-[#e4405f]",
      label: "Instagram",
    },
    {
      icon: <FaLinkedinIn />,
      href: "https://www.linkedin.com/company/gravity-design-studio-np/",
      bgColor: "hover:bg-[#0a66c2]",
      label: "LinkedIn",
    },
    {
      icon: <FaTiktok />,
      href: "https://www.tiktok.com/@gravitygesignstudio",
      bgColor: "hover:bg-[#000000]",
      label: "TikTok",
    },
    {
      icon: <FaYoutube />,
      href: "https://www.youtube.com/@gravitydesignstudiopvt.ltd2759",
      bgColor: "hover:bg-[#ff0000]",
      label: "YouTube",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#2a1f1a] to-[#1a1410] text-white">
      {/* Main Footer Content */}
      <div className="px-6 py-16 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            
            {/* Brand Column */}
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-1 h-8 bg-amber-500 rounded-full"></div>
                <h2 className="font-logo text-2xl font-bold tracking-tight">
                  Gravity Design Studio
                </h2>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                We create modern, elegant, and functional spaces that bring your
                ideas to life with creativity and precision.
              </p>
              
              {/* Social Links */}
              <div>
                <p className="text-sm text-gray-400 mb-3">Follow us on</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 transition-all duration-300 ${social.bgColor} hover:text-white hover:scale-110`}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-lg font-semibold mb-5 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-amber-500 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `text-gray-400 hover:text-amber-400 transition-all duration-300 flex items-center gap-2 group ${
                          isActive ? "text-amber-400" : ""
                        }`
                      }
                    >
                      <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-lg font-semibold mb-5 relative inline-block">
                Our Services
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-amber-500 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <NavLink
                      to="/services"
                      className="text-gray-400 hover:text-amber-400 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span>{service}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Location Column */}
            <div>
              <h3 className="text-lg font-semibold mb-5 relative inline-block">
                Get in Touch
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-amber-500 rounded-full"></span>
              </h3>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                    <FaMapMarkerAlt className="w-4 h-4 text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Visit Us</p>
                    <p className="text-gray-300 text-sm">Bishalnagar-5, Kathmandu, Nepal</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                    <FaEnvelope className="w-4 h-4 text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email Us</p>
                    <a 
                      href="mailto:gravitydesigns1@yahoo.com" 
                      className="text-gray-300 text-sm hover:text-amber-400 transition"
                    >
                      gravitydesigns1@yahoo.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                    <FaPhoneAlt className="w-4 h-4 text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Call Us</p>
                    <a 
                      href="tel:+9779844425728" 
                      className="text-gray-300 text-sm hover:text-amber-400 transition"
                    >
                      +977 9844425728
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Preview */}
              <div className="mt-4">
                <div className="rounded-xl overflow-hidden h-32 w-full shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.871222914005!2d85.33537227532429!3d27.721262076174625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19f4458ed4bb%3A0xc9eec53aeaaf5a7b!2sGravity%20Design%20Studio%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1773999601566!5m2!1sen!2snp"
                    className="w-full h-full border-0"
                    loading="lazy"
                    title="Gravity Design Studio Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Gravity Design Studio. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-amber-400 transition text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-400 transition text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-400 transition text-sm">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button - Only shows at 69% scroll */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg hover:bg-amber-600 transition-all duration-300 hover:scale-110 focus:outline-none group"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </footer>
  );
};

export default Footer;