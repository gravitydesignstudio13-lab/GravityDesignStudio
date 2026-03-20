import React, { useEffect, useState } from "react";
import logo from "../assets/gravityLogo.png";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > 0.05) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [scrollYProgress]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: "-100%" }}
        animate={{ y: show ? 0 : "-100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <img className="h-12 sm:h-14 shrink-0" src={logo} alt="Logo" />
            <h1 className="text-base sm:text-xl lg:text-2xl font-bold truncate">
              Gravity Design Studio
            </h1>
          </div>

          <div className="hidden lg:flex gap-8 text-lg font-semibold">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${isActive ? "text-red-400" : "text-gray-800"} hover:text-red-400 transition`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-3xl text-gray-800"
          >
            <HiOutlineMenu />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-screen w-[80%] max-w-[320px] bg-white z-50 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between px-5 py-5 border-b">
                <div className="flex items-center gap-3">
                  <img className="h-10" src={logo} alt="Logo" />
                  <h1 className="text-lg font-bold">Gravity</h1>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl text-gray-800"
                >
                  <HiOutlineX />
                </button>
              </div>

              <div className="flex flex-col p-6 gap-5 text-lg font-semibold">
                {navLinks.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block ${
                          isActive ? "text-red-400" : "text-gray-800"
                        } hover:text-red-400 transition`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;