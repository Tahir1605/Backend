import express from 'express'
import dotenv from 'dotenv'
import emailRoutes from './routes/emailRoutes.js'
import cors from 'cors'

dotenv.config()
const port = process.env.PORT || 5000

const app = express()



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get("/",(req , res) => {
    res.send("<h1>Server is running......</h1>")
})
app.use('/api/email',emailRoutes)
app.listen(port,() => {
    console.log(`Server is running at http://localhost:${port}`)
})