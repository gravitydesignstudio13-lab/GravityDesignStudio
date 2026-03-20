import React from 'react'
import {motion} from 'motion/react'
import video from "../assets/herovideo.mp4"
import { RiScrollToBottomLine } from "react-icons/ri";
import building from "../assets/building.png"
import { NavLink, useNavigate } from 'react-router-dom';
import interior from '../assets/interior.png'

const HomePage = () => {
 const nav=useNavigate()
  return (
    <div >
      <section id='section1' className='h-screen w-full bg-green-50   '>
    <video
       autoPlay
       muted
       loop
       className='absolute top-0 left-0 h-full w-full object-cover'
       >
        <source src={video} type="video/mp4" />
       </video> 
       <div className='absolute top-0 left-0 flex flex-col inset-0 justify-center items-center '>
        <motion.h1
        style={{ fontFamily: "Dancing Script, cursive" }}
        className='text-white drop-shadow-lg text-3xl sm:text-5xl lg:text-7xl'
        animate={{
          x:[-100,0],
          opacity:[0,1]
        }}
        transition={{
          duration:2,
          delay:1
        }}
        >
          Welcome To
        </motion.h1>
        <motion.h1
        style={{ fontFamily: "Dancing Script, cursive" }}
        className='text-blue-500 text-4xl sm:text-6xl lg:text-8xl'
         animate={{
          x:[200,0],
          opacity:[0,1]
        }}
        transition={{
          duration:2,
          delay:1
        }}
        >
          Gravity Design Studio
        </motion.h1>
        <motion.a
        animate={{
          y:[0,30,30,0]
          
        }}
        transition={{
          duration:2,
          repeat:Infinity
        }}
        className='absolute bottom-20 text-white text-2xl'
        href='#section2'
        ><RiScrollToBottomLine size={30}/></motion.a>
       </div>
      </section>
      <section id='section2' className='h-[20vh] w-full flex flex-col items-center md:px-10   pt-10 '>  
     <h1 className='text-2xl sm:text-3xl lg:text-5xl '>About Gravity Design Studio</h1>
     <p className='text-lg text-center mt-5 font-serif '>We design modern and beautiful spaces that bring your ideas to life. Our goal is to create interiors that are stylish, comfortable, and functional for everyday living.</p>
      </section>
      <section  className=' grid grid-cols-1 md:grid-cols-2'>
        
      <div className=' p-5 flex justify-center items-center'>
        <motion.img
        initial={{
          x:-100,
          opacity:0
        }}
        whileInView={{
           x:0,
          opacity:1

        }}
        transition={{
          duration:1
        }}
        viewport={{
          amount:0.5
        }}
        src={building} alt="img" className='h-100 object-cover rounded-2xl' />
      </div>
      <motion.div
      initial={{
          opacity:0
        }}
        whileInView={{
           
          opacity:1

        }}
        transition={{
          duration:2,
        }}
        viewport={{
          amount:0.5
        }}
      className=' p-5 md:p-10 md:pt-30 '>
        <h1 className='font-semibold text:xl  md:text-2xl'>At Gravity Design Studio, we create modern and functional spaces that blend style, comfort, and creativity. Our designs are tailored to reflect your vision while ensuring elegance and practicality in every detail.</h1>
        <motion.button
        initial={{
          scale:0
        }}
        whileInView={{
           
          scale:1

        }}
        transition={{
          duration:1,
          
        }}
        viewport={{once:true}}
         whileHover={{
          scale:1.1
        }}
        whileTap={{
          scale:0.9
        }}
       onClick={()=>{
        nav("/projects")
       }}
        className='p-2 px-4 text-xl bg-green-300 rounded-full mt-10 hover:bg-green-400 '>View Oure Work</motion.button>
      </motion.div>

      </section>
<section className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-white px-5 py-14 md:px-10">
  <div className="text-center max-w-3xl mx-auto mb-12">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">
      We provide modern and creative design solutions tailored to your needs.
    </h1>
    <p className="text-gray-600 mt-4 text-base sm:text-lg">
      Discover our range of design services crafted to bring beauty, comfort, and functionality to every space.
    </p>
  </div>

  <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="group bg-white p-4 rounded-[30px] shadow-md hover:shadow-2xl transition duration-300">
      <div className="overflow-hidden rounded-[24px]">
        <NavLink to="/services">
          <img
            className="h-64 object-cover w-full group-hover:scale-110 transition duration-500"
            src={interior}
            alt="Interior Design"
          />
        </NavLink>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 my-4">Interior Design</h1>
      <p className="text-gray-600 mb-5 leading-7">
        Beautiful and functional interiors designed to match your lifestyle and vision.
      </p>
      <button
        onClick={() => {
          nav("/services");
        }}
        className="bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-600 hover:to-blue-400 transition duration-300 shadow-md w-full p-3 rounded-full text-white text-lg font-medium"
      >
        View All
      </button>
    </div>

    <div className="group bg-white p-4 rounded-[30px] shadow-md hover:shadow-2xl transition duration-300">
      <div className="overflow-hidden rounded-[24px]">
        <NavLink to="/services">
          <img
            className="h-64 object-cover w-full group-hover:scale-110 transition duration-500"
            src={interior}
            alt="Architecture Design"
          />
        </NavLink>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 my-4">Architecture Design</h1>
      <p className="text-gray-600 mb-5 leading-7">
        Creative architectural concepts that combine elegance, structure, and practicality.
      </p>
      <button
        onClick={() => {
          nav("/services");
        }}
        className="bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-600 hover:to-blue-400 transition duration-300 shadow-md w-full p-3 rounded-full text-white text-lg font-medium"
      >
        View All
      </button>
    </div>

    <div className="group bg-white p-4 rounded-[30px] shadow-md hover:shadow-2xl transition duration-300">
      <div className="overflow-hidden rounded-[24px]">
        <NavLink to="/services">
          <img
            className="h-64 object-cover w-full group-hover:scale-110 transition duration-500"
            src={interior}
            alt="3D Visualization"
          />
        </NavLink>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 my-4">3D Visualization</h1>
      <p className="text-gray-600 mb-5 leading-7">
        Realistic 3D concepts that help you clearly imagine your future project before execution.
      </p>
      <button
        onClick={() => {
          nav("/services");
        }}
        className="bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-600 hover:to-blue-400 transition duration-300 shadow-md w-full p-3 rounded-full text-white text-lg font-medium"
      >
        View All
      </button>
    </div>

    <div className="group bg-white p-4 rounded-[30px] shadow-md hover:shadow-2xl transition duration-300">
      <div className="overflow-hidden rounded-[24px]">
        <NavLink to="/services">
          <img
            className="h-64 object-cover w-full group-hover:scale-110 transition duration-500"
            src={interior}
            alt="Space Planning"
          />
        </NavLink>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 my-4">Space Planning</h1>
      <p className="text-gray-600 mb-5 leading-7">
        Smart layout planning that maximizes comfort, utility, and beauty in every corner.
      </p>
      <button
        onClick={() => {
          nav("/services");
        }}
        className="bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-600 hover:to-blue-400 transition duration-300 shadow-md w-full p-3 rounded-full text-white text-lg font-medium"
      >
        View All
      </button>
    </div>
  </div>
</section>
     
        
        
       
      
      
       

<section className="w-full bg-white px-5 py-14 md:px-10">
  <div className="text-center mb-10">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
      Our Recent Projects
    </h1>
    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
      Explore some of our latest interior, architectural, and creative design works.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="group bg-gray-50 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <div className="overflow-hidden">
        <img
          src={interior}
          alt="Modern Living Room"
          className="h-72 w-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>
      <div className="p-5">
        <p className="text-sm text-blue-500 font-medium">Interior Design</p>
        <h2 className="text-xl font-semibold mt-1">Modern Living Room</h2>
        <p className="text-gray-600 mt-2 text-sm">
          A stylish and comfortable living space designed with a modern aesthetic.
        </p>
      </div>
    </div>

    <div className="group bg-gray-50 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <div className="overflow-hidden">
        <img
          src={interior}
          alt="Luxury Bedroom"
          className="h-72 w-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>
      <div className="p-5">
        <p className="text-sm text-blue-500 font-medium">Architecture</p>
        <h2 className="text-xl font-semibold mt-1">Luxury Bedroom</h2>
        <p className="text-gray-600 mt-2 text-sm">
          Elegant bedroom design focused on calmness, comfort, and premium style.
        </p>
      </div>
    </div>

    <div className="group bg-gray-50 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <div className="overflow-hidden">
        <img
          src={interior}
          alt="Office Space"
          className="h-72 w-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>
      <div className="p-5">
        <p className="text-sm text-blue-500 font-medium">3D Visualization</p>
        <h2 className="text-xl font-semibold mt-1">Office Space Concept</h2>
        <p className="text-gray-600 mt-2 text-sm">
          A creative office concept balancing productivity, elegance, and function.
        </p>
      </div>
    </div>
  </div>

  <div className="flex justify-center mt-10">
    <button
      onClick={() => nav("/projects")}
      className="bg-gradient-to-r from-blue-500 to-blue-300 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md hover:scale-105 transition"
    >
      View All Projects
    </button>
  </div>
</section>

<section className="w-full bg-gradient-to-b from-white to-gray-100 px-5 py-16 md:px-10 lg:px-20">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
    
    <div>
      <p className="text-blue-500 font-semibold tracking-widest uppercase mb-3">
        Why Choose Us
      </p>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 leading-tight">
        Designing spaces that feel beautiful, functional, and timeless.
      </h1>

      <p className="text-gray-600 mt-6 text-lg leading-8 max-w-xl">
        At Gravity Design Studio, we focus on creating interiors and architectural
        solutions that balance creativity, comfort, and practicality. Every project
        is crafted with attention to detail and a vision that reflects your style.
      </p>

      <button
        onClick={() => nav("/contact")}
        className="mt-8 bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-600 hover:to-blue-400 text-white px-7 py-3 rounded-full text-lg font-medium shadow-md transition duration-300"
      >
        Get In Touch
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="bg-white rounded-[28px] p-6 shadow-md hover:-translate-y-2 hover:shadow-xl transition duration-300">
        <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-4">
          ✨
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Creative Design</h2>
        <p className="text-gray-600 leading-7">
          Unique concepts tailored to match your vision and lifestyle.
        </p>
      </div>

      <div className="bg-white rounded-[28px] p-6 shadow-md hover:-translate-y-2 hover:shadow-xl transition duration-300">
        <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-4">
          📐
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Smart Planning</h2>
        <p className="text-gray-600 leading-7">
          Thoughtful layouts that maximize beauty, comfort, and usability.
        </p>
      </div>

      <div className="bg-white rounded-[28px] p-6 shadow-md hover:-translate-y-2 hover:shadow-xl transition duration-300">
        <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-4">
          🏆
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Quality Focus</h2>
        <p className="text-gray-600 leading-7">
          Every detail is handled carefully to ensure elegant final results.
        </p>
      </div>

      <div className="bg-white rounded-[28px] p-6 shadow-md hover:-translate-y-2 hover:shadow-xl transition duration-300">
        <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-4">
          🤝
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Client First</h2>
        <p className="text-gray-600 leading-7">
          We work closely with clients to turn ideas into meaningful spaces.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="w-full bg-white px-5 py-16 md:px-10 lg:px-20">
  <div className="text-center mb-12">
    <p className="text-blue-500 font-semibold tracking-widest uppercase mb-2">
      Testimonials
    </p>
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800">
      What Our Clients Say
    </h1>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-gradient-to-br from-gray-100 to-white p-6 rounded-[28px] shadow-md hover:shadow-xl transition">
      <p className="text-gray-600 leading-7">
        “Amazing work! My home looks completely different now. Highly recommend.”
      </p>
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800">Ram Sharma</h3>
        <p className="text-sm text-gray-500">Home Owner</p>
      </div>
    </div>

    <div className="bg-gradient-to-br from-gray-100 to-white p-6 rounded-[28px] shadow-md hover:shadow-xl transition">
      <p className="text-gray-600 leading-7">
        “Very professional team with creative ideas. Loved the final design.”
      </p>
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800">Sita Karki</h3>
        <p className="text-sm text-gray-500">Client</p>
      </div>
    </div>

    <div className="bg-gradient-to-br from-gray-100 to-white p-6 rounded-[28px] shadow-md hover:shadow-xl transition">
      <p className="text-gray-600 leading-7">
        “They delivered on time and exceeded expectations. Great experience.”
      </p>
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800">Ramesh Thapa</h3>
        <p className="text-sm text-gray-500">Business Owner</p>
      </div>
    </div>
  </div>
</section>

<section className="w-full px-5 py-20 md:px-10 lg:px-20">
  <div className="bg-gradient-to-r from-blue-500 to-blue-300 rounded-[40px] p-10 md:p-16 text-center text-white relative overflow-hidden">

 
    <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>

    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
      Ready to Transform Your Space?
    </h1>

    <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
      Let’s bring your ideas to life with modern, creative, and functional design solutions tailored just for you.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4">
      
      
      <button
        onClick={() => nav("/contact")}
        className="bg-white text-blue-500 px-8 py-3 rounded-full text-lg font-medium shadow-md hover:scale-105 transition"
      >
        Get Free Consultation
      </button>

  
      <button
        onClick={() => nav("/projects")}
        className="border border-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white hover:text-blue-500 transition"
      >
        View Our Work
      </button>

    </div>
  </div>
</section>
      </div>
  )
}

export default HomePage

      