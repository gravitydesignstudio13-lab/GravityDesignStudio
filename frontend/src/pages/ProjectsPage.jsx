import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";


const projectsData = [
  {
    id: 1,
    slug: "modern-living-room",
    title: "Modern Living Room",
    category: "Interior",
    location: "Kathmandu, Nepal",
    year: "2025",
    client: "Private Residence",
    area: "1200 sq.ft",
    service: "Interior Design",
    heroImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop",
    description:
      "A refined modern living space designed with minimal aesthetics, warm textures, and a balanced layout that enhances both comfort and functionality.",
    challenge:
      "The client wanted a luxurious yet calm environment in a limited urban residential space without making it feel crowded.",
    solution:
      "We used soft neutral tones, clean furniture lines, layered lighting, and carefully selected materials to create an elegant and spacious atmosphere.",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    slug: "luxury-bedroom-concept",
    title: "Luxury Bedroom Concept",
    category: "Interior",
    location: "Pokhara, Nepal",
    year: "2024",
    client: "Residential Client",
    area: "900 sq.ft",
    service: "Interior Design",
    heroImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop",
    description:
      "A bedroom concept focused on relaxation, visual elegance, and premium comfort through soft textures and sophisticated materials.",
    challenge:
      "The challenge was to create a luxury feel while keeping the room visually soft and restful.",
    solution:
      "We combined ambient lighting, muted colors, upholstered elements, and smart spatial planning to deliver a rich yet peaceful design.",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693531424-7e7c7b1b4c55?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: 3,
    slug: "3d-exterior-visualization",
    title: "3D Exterior Visualization",
    category: "3D",
    location: "Lalitpur, Nepal",
    year: "2025",
    client: "Commercial Client",
    area: "2500 sq.ft",
    service: "3D Visualization",
    heroImage:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop",
    description:
      "A high-quality 3D exterior concept developed to help the client visualize the final building form before construction.",
    challenge:
      "The client needed realistic exterior visuals to evaluate materials, massing, and overall presentation.",
    solution:
      "We created photorealistic renders with accurate lighting, textures, and environmental context to support confident decision-making.",
    gallery: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];



const categories = ["All", "Interior", "Architecture", "3D"];

const ProjectPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === activeCategory);

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[55vh] w-full flex items-center justify-center bg-black overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1400&auto=format&fit=crop"
          alt="Projects Hero"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="relative z-10 text-center px-5">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold"
          >
            Our Projects
          </motion.h1>
          <p className="text-gray-200 mt-4 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            Explore our creative work in interior design, architecture, and 3D visualization.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="px-5 sm:px-10 lg:px-20 py-10 flex flex-wrap justify-center gap-4">
        {categories.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(item)}
            className={`px-5 py-2 rounded-full border transition duration-300 ${
              activeCategory === item
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </section>

      {/* Projects Grid */}
      <section className="px-5 sm:px-10 lg:px-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => navigate(`/projectdetail/${project.slug}`)}
              className="group rounded-3xl overflow-hidden bg-white shadow-lg cursor-pointer"
            >
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition duration-500"></div>

                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-sm px-4 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <p className="text-sm text-gray-200 mt-2">{project.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;