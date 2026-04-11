import express from 'express'
import serviceRoute from './serviceRoute.js'
import projectRouter from './projectRoutes.js'
import galleryRouter from './galleryRoute.js'
import inquiryRoute from './inqueryRoute.js'
import reviewRoute from './reviewRoute.js'
import teamRoute from './teamRoute.js'
import adminRoute from './userRoute.js'
import projectTypeRouter from './projectTypeRoute.js'



const mainRoute=express.Router()

mainRoute.use("/service",serviceRoute)
mainRoute.use("/project",projectRouter)
mainRoute.use("/gallery",galleryRouter)
mainRoute.use("/inquiry",inquiryRoute)
mainRoute.use("/review",reviewRoute)
mainRoute.use("/team",teamRoute)
mainRoute.use("/admin",adminRoute)
mainRoute.use("/project-type",projectTypeRouter)
export default mainRoute