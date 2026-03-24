import React from "react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";



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







const ProjectDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-5">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <button
          onClick={() => navigate("/projects")}
          className="px-6 py-3 bg-black text-white rounded-full"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="absolute bottom-10 left-0 right-0 px-5 sm:px-10 lg:px-20 text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm mb-4"
          >
            {project.category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold"
          >
            {project.title}
          </motion.h1>

          <p className="mt-3 text-gray-200 text-sm sm:text-base">
            {project.location} • {project.year}
          </p>
        </div>
      </section>

      {/* Overview + Info */}
      <section className="py-20 px-5 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left */}
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-semibold mb-6"
            >
              Project Overview
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 leading-8 text-lg"
            >
              {project.description}
            </motion.p>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-3xl p-8 shadow-sm"
          >
            <h3 className="text-2xl font-semibold mb-6">Project Info</h3>

            <div className="space-y-5">
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <h4 className="text-lg font-medium">{project.client}</h4>
              </div>

              <div>
                <p className="text-sm text-gray-500">Location</p>
                <h4 className="text-lg font-medium">{project.location}</h4>
              </div>

              <div>
                <p className="text-sm text-gray-500">Area</p>
                <h4 className="text-lg font-medium">{project.area}</h4>
              </div>

              <div>
                <p className="text-sm text-gray-500">Year</p>
                <h4 className="text-lg font-medium">{project.year}</h4>
              </div>

              <div>
                <p className="text-sm text-gray-500">Service</p>
                <h4 className="text-lg font-medium">{project.service}</h4>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge and Solution */}
      <section className="py-20 px-5 sm:px-10 lg:px-20 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">The Challenge</h2>
            <p className="text-gray-600 leading-8">{project.challenge}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">The Solution</h2>
            <p className="text-gray-600 leading-8">{project.solution}</p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-5 sm:px-10 lg:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-semibold mb-10 text-center"
        >
          Project Gallery
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {project.gallery.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              className="overflow-hidden rounded-3xl"
            >
              <img
                src={img}
                alt={`${project.title} ${index + 1}`}
                className="h-[350px] w-full object-cover hover:scale-105 transition duration-700"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-black text-white py-20 px-5 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Interested in a similar project?
        </h2>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Let’s design a space that reflects your vision with elegance and purpose.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
          >
            Contact Us
          </button>

          <button
            onClick={() => navigate("/projects")}
            className="px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition"
          >
            Back to Projects
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailsPage;