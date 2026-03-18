import React from 'react'
import {motion} from 'motion/react'
import video from "../assets/herovideo.mp4"
import { RiScrollToBottomLine } from "react-icons/ri";
import building from "../assets/building.png"

const HomePage = () => {
 
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
          duration:1,
          delay:0.8
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
       
        className='p-2 px-4 text-xl bg-green-300 rounded-full mt-10 hover:bg-green-400 '>View Oure Work</motion.button>
      </motion.div>

      </section>

      <section className='h-screen w-full bg-gray-200'>

      </section>
      </div>
  )
}

export default HomePage

      