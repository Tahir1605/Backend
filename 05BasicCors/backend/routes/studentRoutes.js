import express from 'express'
import { login, register } from '../controllers/studentCon.js'

const studentRoutes = express.Router()
studentRoutes.post('/register',register)
studentRoutes.post('/login',login)
export default studentRoutes