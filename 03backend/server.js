import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connection.js';
import empRoutes from './routes/empRoutes.js';
dotenv.config()

const port = process.env.PORT || 5000;
const app = express()
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req , res) => {
    res.send("Server is running ....")
})

app.use("/api/emp",empRoutes)

app.listen(port,() => {
    console.log(`Server running at http://localhost:${port}`)
})