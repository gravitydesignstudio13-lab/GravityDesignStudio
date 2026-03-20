import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
dotenv.config()


const app=express()

connectDB()
app.get("/",(req,res)=>{
    res.send("This is backend..")
})



app.listen(2000,()=>{
    console.log("server Running...")
})