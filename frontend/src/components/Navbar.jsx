import React, { useEffect, useState } from 'react'
import logo from "../assets/gravityLogo.png"
import {NavLink} from 'react-router-dom'
import {motion,transform,useScroll} from 'motion/react'
const Navbar = () => {
   const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > 0.2) {
        setShow(true);   // show navbar
      } else {
        setShow(false);  // hide navbar
      }
    });
  }, [scrollYProgress]);

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: show ? 0 : "-100%" }}
      transition={{ duration: 0.4 }}
    className='bg-white/80  fixed w-full flex justify-between py-5  px-20 items-center z-10 '>
      <div className='flex items-center gap-10'>
        <img className='h-15' src={logo} alt="Logo" />
        <h1 className='text-xl sm:text-2xl font-bold'>Gravity Design Studio</h1>
      </div>
      <div className='flex gap-10 text-md font-semibold'>
        <NavLink to='/' >Home</NavLink>
        <NavLink to='/about' >About Us</NavLink>
        <NavLink to='/services' >Our Services</NavLink>
        <NavLink to='/gallery' >Gallery</NavLink>
        <NavLink to='/contact' >Contact</NavLink>
        
      </div>
    </motion.div>
  )
}

export default Navbar