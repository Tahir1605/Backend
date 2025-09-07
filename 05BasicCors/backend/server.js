import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/connection.js'
import studentRoutes from './routes/studentRoutes.js'
dotenv.config()

const port = process.env.PORT || 4000

const app = express()

connectDB()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req , res) => {
    res.send("Server is running")
})

app.use('/api/student',studentRoutes)

app.listen(port,() => {
    console.log(`Server is running at http://localhost:${port}`)
})