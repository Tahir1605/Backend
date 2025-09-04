import express from 'express';
import upload from '../middlewares/multer.js';
import { addData } from '../controllers/empController.js';

const empRoutes = express.Router();

empRoutes.post("/add",upload.array('images',5),addData)

export default empRoutes