import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import ScrollToTop from './components/ScrollToTop'
import AdminDashboardPage from './pages/Admin/AdminDashboardPage'
import AdminPage from './pages/Admin/AdminPage'
import AdminGalleryPage from './pages/Admin/AdminGalleryPage'
import AdminProjectPage from './pages/Admin/AdminProjectPage'
import AdminServicePage from './pages/Admin/AdminServicePage'
import InquiryAdminPage from './pages/Admin/AdminInqueryPage'
import AdminReviewPage from './pages/Admin/AdminReview'
import AdminTeamPage from './pages/Admin/AdminTeamPage'
import WhatsAppButton from './components/WhatsAppButton'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminAccess from './components/AdminAccess' // ✅ import
import ErrorPage from './pages/ErrorPage'
import AdminHomeVideoPage from './pages/Admin/AdminHomeVideoPage'


const App = () => {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div>
      <ScrollToTop />

      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/services' element={<ServicesPage />} />
        <Route path='/projectdetail/:id' element={<ProjectDetailsPage />} />
        <Route path='/gallery' element={<GalleryPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/login' element={<AdminLoginPage />} />
        <Route path="*" element={<ErrorPage />} />
        {/* ✅ Protected Admin Routes */}
        <Route
          path='/admin'
          element={
            <AdminAccess>
              <AdminPage />
            </AdminAccess>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path='admindashboard' element={<AdminDashboardPage />} />
          <Route path='admingallery' element={<AdminGalleryPage />} />
          <Route path='adminproject' element={<AdminProjectPage />} />
          <Route path='adminservice' element={<AdminServicePage />} />
          <Route path='admininquery' element={<InquiryAdminPage />} />
          <Route path='adminreview' element={<AdminReviewPage />} />
          <Route path='adminteam' element={<AdminTeamPage />} />
          <Route path="adminhomevideo" element={<AdminHomeVideoPage />} />
        </Route>

      </Routes>

      <WhatsAppButton />
      {!isAdminPage && <Footer />}
    </div>
  )
}

export default App