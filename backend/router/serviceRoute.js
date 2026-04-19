import express from 'express'
import { createService, deleteService, findService } from '../controller/servicesController.js'
import Upload from '../middleware/uploadImage.js'


const serviceRoute=express.Router()

serviceRoute.post("/create",Upload.single("image"),createService)
serviceRoute.delete("/delete/:id",deleteService)
serviceRoute.get("/find",findService)


export default serviceRoute