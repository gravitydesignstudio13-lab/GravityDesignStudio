
import React from "react";
import { motion } from "motion/react";

const ContactPage = () => {
  return (
    <div className="bg-[#f8f6f2] text-gray-900">
      {/* Hero Section */}
      <section className="min-h-[45vh] flex flex-col justify-center items-center text-center px-5 pt-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-4"
        >
          Contact Us
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight"
        >
          Let’s discuss your next design project
        </motion.h1>

        <p className="mt-5 text-gray-600 max-w-2xl leading-8">
          Whether you’re planning an interior transformation, architectural concept,
          or 3D visualization, we’d love to hear about your vision.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="px-5 sm:px-10 lg:px-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Phone",
              value: "+977 98XXXXXXXX",
              sub: "Call us for direct consultation",
            },
            {
              title: "Email",
              value: "gravitydesignstudio@gmail.com",
              sub: "Send us your project details anytime",
            },
            {
              title: "Location",
              value: "Kathmandu, Nepal",
              sub: "Available for residential & commercial projects",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                {item.title}
              </p>
              <h3 className="text-xl font-semibold mb-2">{item.value}</h3>
              <p className="text-gray-600">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form + Side Content */}
      <section className="px-5 sm:px-10 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <p className="uppercase tracking-[0.2em] text-sm text-gray-500 mb-4">
              Start a Conversation
            </p>

            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-6">
              Tell us about your space, style, and goals.
            </h2>

            <p className="text-gray-600 leading-8 mb-8">
              Share a few details about your project and our team will get back to
              you with the next steps. We focus on thoughtful design, practical
              planning, and elegant visual outcomes.
            </p>

            <div className="bg-black text-white rounded-[2rem] p-8">
              <p className="uppercase tracking-[0.2em] text-sm text-gray-400 mb-4">
                Working Hours
              </p>
              <div className="space-y-3 text-gray-300">
                <p>Sunday - Friday: 10:00 AM - 6:00 PM</p>
                <p>Saturday: Closed</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-sm border border-gray-100"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Phone</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Service</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black">
                  <option>Interior Design</option>
                  <option>Architecture Design</option>
                  <option>3D Visualization</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm text-gray-600 mb-2">Message</label>
              <textarea
                rows="6"
                placeholder="Tell us about your project"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-black text-white py-4 rounded-full hover:bg-gray-800 transition"
            >
              Send Inquiry
            </button>
          </motion.form>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="px-5 sm:px-10 lg:px-20 pb-20">
        <div className="bg-white rounded-[2rem] p-10 text-center shadow-sm border border-gray-100">
          <p className="uppercase tracking-[0.2em] text-sm text-gray-500 mb-4">
            Let’s Create Something Beautiful
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Ready to bring your vision to life?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-8">
            We design spaces that blend beauty, function, and personality. Reach out
            and let’s start shaping your next project together.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;