import express from 'express';
import upload from '../middlewares/multer.js';
import { addClient , deleteClient, fetchClient, updateClient } from '../controllers/clientController.js';
import validation from '../middlewares/validation.js';

const clientRouter = express.Router();

clientRouter.post("/add",upload.single('image'), validation ,addClient)
clientRouter.get("/fetch",fetchClient)
clientRouter.delete("/delete/:id",deleteClient)
clientRouter.put("/update/:id",upload.single('image'),updateClient)

export default clientRouter