
import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Interior Design",
    desc: "We create modern and elegant interior spaces tailored to your lifestyle.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
  },
  {
    title: "3D Visualization",
    desc: "High-quality 3D renders to visualize your project before execution.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Architecture Design",
    desc: "Innovative architectural solutions combining creativity and functionality.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
  },
];

const ServicesPage = () => {
  
  const nav=useNavigate()

  return (
    <div className="bg-white text-gray-800">

      {/* HERO */}
      <section className="h-[30vh] flex flex-col justify-center items-center text-center px-5 bg-gray-100">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl font-bold mb-4"
        >
          Our Services
        </motion.h1>

        <p className="max-w-xl text-gray-600">
          We provide creative and modern design solutions to transform your ideas into reality.
        </p>
      </section>


      {/* SERVICES GRID */}
      <section className="py-20 px-5 lg:px-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer"
          >
            <img src={service.img} className="h-60 w-full object-cover" />

            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">
                {service.title}
              </h2>
              <p className="text-gray-600 text-sm">
                {service.desc}
              </p>
            </div>
          </motion.div>
        ))}

      </section>


      {/* PROCESS SECTION */}
      <section className="bg-gray-100 py-20 px-5 text-center">

        <h2 className="text-3xl font-bold mb-10">Our Process</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {["Consultation", "Planning", "Design", "Execution"].map((step, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold">{step}</h3>
            </div>
          ))}

        </div>

      </section>


      {/* CTA */}
      <section className="py-20 text-center bg-black text-white">
        <h2 className="text-3xl font-bold mb-4">
          Let’s Build Something Amazing Together
        </h2>
        <button onClick={()=>{
          nav("/contact")
        }} className="mt-5 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition">
          Contact Us
        </button>
      </section>

    </div>
  );
};

export default ServicesPage;