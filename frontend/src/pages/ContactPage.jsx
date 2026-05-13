import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  CheckCircle,
  ArrowRight,
  
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;

const ContactPage = () => {
  const [services, setServices] = useState([]);

  const getServices = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/service/find`);

      if (res?.data?.success && Array.isArray(res.data.data)) {
        setServices(res.data.data);
      } else if (Array.isArray(res.data)) {
        setServices(res.data);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.log("GET SERVICES ERROR =", error);
      setServices([]);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Phone",
      value: "+977 9844425728",
      sub: "Call us for direct consultation",
      action: "tel:+9779844425728",
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      value: "gravitydesignstudio13@gmail.com",
      sub: "Send us your project details anytime",
      action: "mailto:gravitydesigns1@yahoo.com",
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      value: "Bishalnagar-5, Kathmandu",
      sub: "Available for residential & commercial projects",
      action: null,
    },
  ];

  const faqs = [
    {
      q: "How long does a typical project take?",
      a: "Project timelines vary based on scope. A residential interior typically takes 2-4 months, while larger architectural projects may take 6-12 months.",
    },
    {
      q: "Do you provide free consultation?",
      a: "Yes, we offer an initial free consultation to understand your project requirements and provide preliminary advice.",
    },
    {
      q: "What areas do you serve?",
      a: "Our services extend throughout Nepal, delivering exceptional design solutions wherever you are.",
    },
  ];

  const openMap = () => {
  window.open(
    "https://www.google.com/maps?q=Gravity+Design+Studio+Pvt.+Ltd.+Kathmandu",
    "_blank"
  );
};
  return (
    <div className="bg-[#f8f6f2] min-h-screen">
      {/* Hero Section - Premium */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2a1f1a] via-[#3b2f2f] to-[#2a1f1a] pt-32 pb-20 px-6 sm:px-12 lg:px-24">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"
          >
            <MessageCircle size={14} className="text-amber-400" />
            <span className="text-white/80 text-sm tracking-wide">Get In Touch</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
          >
            Let's Discuss Your <span className="text-amber-400">Next Design Project</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-24 h-1 bg-gradient-to-r from-amber-400 to-transparent mx-auto mt-6"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg"
          >
            Whether you're planning an interior transformation, architectural concept,
            or 3D visualization, we'd love to hear about your vision.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards - Enhanced */}
      <section className="px-6 sm:px-12 lg:px-24 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.action}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  item.action ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#7a4f1d] flex items-center justify-center mb-4 group-hover:bg-[#7a4f1d] group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                  {item.title}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.value}
                </h3>
                <p className="text-sm text-gray-500">{item.sub}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Form + Info */}
      <section className="px-6 sm:px-12 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Enhanced Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#7a4f1d]/10 text-[#7a4f1d] text-sm font-medium tracking-wide mb-4">
                  Start a Conversation
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  Tell us about your <br />
                  <span className="text-[#7a4f1d]">space, style, and goals.</span>
                </h2>
                <div className="w-16 h-1 bg-[#7a4f1d] mt-6"></div>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg">
                Share a few details about your project and our team will get back to
                you with the next steps. We focus on thoughtful design, practical
                planning, and elegant visual outcomes.
              </p>

         

              {/* Working Hours Card */}
              <div className="bg-gradient-to-br from-[#3b2f2f] to-[#2a221f] rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Clock size={20} className="text-amber-400" />
                  </div>
                  <h3 className="text-lg font-semibold">Working Hours</h3>
                </div>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Sunday - Friday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-amber-400">Closed</span>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MessageCircle size={20} className="text-[#7a4f1d]" />
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <p className="font-semibold text-gray-800 mb-1">{faq.q}</p>
                      <p className="text-sm text-gray-500">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - Enhanced Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Formik
                initialValues={{
                  fullName: "",
                  email: "",
                  phone: "",
                  service: "",
                  message: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.fullName) errors.fullName = "Full name is required";
                  if (!values.email) {
                    errors.email = "Email is required";
                  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = "Invalid email address";
                  }
                  if (!values.phone) errors.phone = "Phone is required";
                  if (!values.service) errors.service = "Service is required";
                  if (!values.message) errors.message = "Message is required";
                  return errors;
                }}
                onSubmit={async (values, { resetForm, setSubmitting }) => {
                  try {
                    const req = await axios.post(
                      `${BACKEND_URL}/api/inquiry/create`,
                      values
                    );
                    toast.success(req?.data?.message || "Inquiry sent successfully");
                    resetForm();
                  } catch (error) {
                    toast.error(error?.response?.data?.message || "Something went wrong");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">Send us a Message</h3>
                      <p className="text-gray-500 text-sm mt-1">We'll get back to you within 24 hours</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="fullName"
                          placeholder="Enter your full name"
                          className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:border-[#7a4f1d] ${
                            touched.fullName && errors.fullName
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                        />
                        {touched.fullName && errors.fullName && (
                          <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:border-[#7a4f1d] ${
                            touched.email && errors.email
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                        />
                        {touched.email && errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="phone"
                          placeholder="Enter your phone number"
                          className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:border-[#7a4f1d] ${
                            touched.phone && errors.phone
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                        />
                        {touched.phone && errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="service"
                          className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:border-[#7a4f1d] ${
                            touched.service && errors.service
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                        >
                          <option value="">Select a service</option>
                          {Array.isArray(services) &&
                            services.map((item, index) => (
                              <option key={item._id || index} value={item.title}>
                                {item.title}
                              </option>
                            ))}
                        </Field>
                        {touched.service && errors.service && (
                          <p className="text-red-500 text-xs mt-1">{errors.service}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <Field
                        as="textarea"
                        rows="5"
                        name="message"
                        placeholder="Tell us about your project, requirements, and timeline..."
                        className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:border-[#7a4f1d] resize-none ${
                          touched.message && errors.message
                            ? "border-red-500"
                            : "border-gray-200"
                        }`}
                      />
                      {touched.message && errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-6 w-full bg-gradient-to-r from-[#7a4f1d] to-[#5a3a12] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <Send size={18} />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4">
                      By submitting, you agree to our privacy policy. We'll never share your information.
                    </p>
                  </Form>
                )}
              </Formik>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-6 sm:px-12 lg:px-24 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 bg-gradient-to-br from-[#f8f6f2] to-white">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#7a4f1d]/10 text-[#7a4f1d] text-sm font-medium tracking-wide mb-4">
                  Visit Us
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">We'd Love to Meet You</h3>
                <p className="text-gray-600 mb-6">
                  Visit our studio in Bishalnagar to discuss your project in person.
                  We recommend booking an appointment for a dedicated consultation.
                </p>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin size={20} className="text-[#7a4f1d] mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Bishalnagar-5, Kathmandu</p>
                    <p className="text-sm text-gray-500">Near City Center Mall</p>
                  </div>
                </div>
                <button
                onClick={openMap}
                className="flex items-center gap-2 text-[#7a4f1d] font-medium hover:gap-3 transition-all">
                  Get Directions
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="h-64 md:h-auto bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.871069092253!2d85.33537227540307!3d27.721266824877492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19f4458ed4bb%3A0xc9eec53aeaaf5a7b!2sGravity%20Design%20Studio%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1777559266419!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Gravity Design Studio Location"
                  className="w-full h-full min-h-[300px]"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 sm:px-12 lg:px-24 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#7a4f1d] to-[#5a3a12] rounded-3xl p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to bring your vision to life?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              We design spaces that blend beauty, function, and personality. Reach out
              and let's start shaping your next project together.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6 text-white/60 text-sm">
              <CheckCircle size={16} />
              <span>Free Consultation</span>
              <span className="w-1 h-1 rounded-full bg-white/40"></span>
              <CheckCircle size={16} />
              <span>No Obligation</span>
              <span className="w-1 h-1 rounded-full bg-white/40"></span>
              <CheckCircle size={16} />
              <span>Expert Advice</span>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ContactPage;