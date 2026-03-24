import React, { useState } from "react";
import { motion } from "motion/react";

const galleryData = [
  {
    id: 1,
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "3D",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    category: "3D",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    category: "3D",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
  },
];

const categories = ["All", "Interior", "Architecture", "3D"];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

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
      <section className="flex flex-wrap justify-center gap-4 pb-10">
        {categories.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(item)}
            className={`px-5 py-2 rounded-full border transition ${
              activeCategory === item
                ? "bg-black text-white border-black"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </section>

      {/* GALLERY GRID */}
      <section className="px-5 sm:px-10 lg:px-20 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
          {filteredImages.map((item, index) => (
            <motion.div
              key={item.id}
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

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Category label */}
              <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
                {item.category}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;