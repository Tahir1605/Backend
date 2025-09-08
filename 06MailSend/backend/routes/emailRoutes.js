import express from 'express'
import sendEmail from '../controllers/emailControler.js'

const emailRoutes = express.Router()

emailRoutes.post('/sendEmail',sendEmail)

export default emailRoutes