import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import mainRoute from './router/mainRoute.js'
import cors from 'cors'
import Upload from './middleware/uploadImage.js'
dotenv.config()


const app=express()
connectDB()
app.use(express.json())

 const frontend={
    origin:"http://localhost:5173",
    credentials: true,
 }
app.use(cors(frontend))

app.get("/",(req,res)=>{
    res.send("This is backend..")
})
app.use("/api",mainRoute)

app.use(express.urlencoded({extended:true}))

app.use("/upload", express.static("upload"));
 
app.listen(2000,()=>{
    console.log("server Running...")
})