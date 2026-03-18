import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
     
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/projects' element={<ProjectsPage/>}/>
        <Route path='/services' element={<ServicesPage/>}/>
        <Route path='/projectdetail' element={<ProjectDetailsPage/>}/>
        <Route path='/gallery' element={<GalleryPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        
        
        

      </Routes>
      <Footer/>
    </div>
  )
}

export default App