import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connection.js'
import authRouter from './routes/authRoute.js'
dotenv.config()

const port = process.env.PORT || 5000

const app = express()

connectDB()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req , res) => {
    res.send("<h1> Server is running ...... </h1>")
})

app.use('/api/auth',authRouter)

app.listen(port,() => {
    console.log(`Server running at http://localhost:${port}`)
})
