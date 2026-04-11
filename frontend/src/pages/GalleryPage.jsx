import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [gallery, setGallery] = useState([]);
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

const getServices = async () => {
    try {
      const req = await axios.get(`${BACKEND_URL}/api/service/find`);
      setServices(req?.data || []);
    } catch (error) {
      console.log(error);
      setServices([]);
    } 
  };

  const getGallery = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/gallery/all?page=${currentPage}&limit=9&category=${activeCategory}`
      );

      if (res?.data?.success) {
        setGallery(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
      } else {
        setGallery([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.log("GET GALLERY ERROR =", error);
      setGallery([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    getGallery();
  }, [currentPage, activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const categories = ["All", ...new Set(services.map((item) => item.title))];

  return (
    <div className="bg-[#f8f6f2] text-gray-900">
      {/* HERO */}
      <section className="h-[30vh] flex flex-col justify-center items-center text-center px-5">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold"
        >
          Gallery
        </motion.h1>

        <p className="mt-4 max-w-xl text-gray-600">
          A curated collection of our design works, concepts, and visual inspirations.
        </p>
      </section>

      {/* FILTER */}
      <section className="flex flex-wrap justify-center gap-4 pb-10 px-5">
        {categories.map((item, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(item)}
            className={`px-5 py-2 rounded-full border transition ${
              activeCategory === item
                ? "bg-[#795703] text-white border-black"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </section>

      {/* GALLERY GRID */}
      <section className="px-5 sm:px-10 lg:px-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
          {gallery.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`relative overflow-hidden rounded-3xl group cursor-pointer ${
                index % 3 === 0 ? "row-span-2" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.category}
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="absolute bottom-4 left-4 text-white text-sm bg-[#795703] px-3 py-1 rounded-full backdrop-blur-md">
                {item.category}
              </div>
            </motion.div>
          ))}
        </div>

        {gallery.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No gallery items found</p>
        )}
      </section>

      {/* PAGINATION */}
      <section className="pb-20 flex justify-center items-center gap-3 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-black border-gray-300 hover:bg-gray-100"
          }`}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === index + 1
                ? "bg-[#795703] text-white border-black"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-black border-gray-300 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </section>
    </div>
  );
};

export default GalleryPage;