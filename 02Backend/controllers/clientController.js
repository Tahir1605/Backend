import fs from 'fs'
import imagekit from '../config/imageKit.js';
import Client from '../models/client.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt'

const addClient = async (req, res) => {
    try {

        const errors = validationResult(req)
        const errMessage = errors.array().map(err => err.msg)

        if(!errors.isEmpty()){
            return res.json({
                success:false,
                message:errMessage
            })
        }

        const { name, email, password } = req.body;
        const imageFile = req.file;

        //upload image to imagekit

        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/uploads"
        })

        // optimize through imagekit URL transformation

        const optimizeImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },  //Auto compression
                { format: 'webp' },   // Convert to modern format
                { width: '1280' }     // width resizing
            ]
        });

        const image = optimizeImageUrl;

        const existingClient = await Client.findOne({ email })
        if (existingClient) {
            return res.json({
                success: false,
                message: "Client Already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newClient = new Client({
            name,
            email,
            password: hashPassword,
            image
        })

        await newClient.save();

        res.json({
            success: true,
            message: "New Client is created"
        })


    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

const fetchClient = async (req, res) => {
    try {

        const client = await Client.find();

        if (!client.length > 0) {
            return res.json({
                success: false,
                message: "Data not found"
            })
        }

        res.json({
            success: true,
            data: client
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Data could not found"
        })
    }
}

const deleteClient = async (req, res) => {
    try {

        const { id } = req.params;
        const deleteClient = await Client.findByIdAndDelete(id);

        if (!deleteClient) {
            return res.json({
                success: false,
                message: "Client not found"
            })
        }

        res.json({
            success: true,
            message: "Client deleted successfully"
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

const updateClient = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, email, password } = req.body;

        const updateClient = await Client.findById(id);
        if (!updateClient) {
            return res.json({
                success: false,
                message: "Client not found"
            })
        }

        if (name) updateClient.name = name
        if (email) updateClient.email = email
        if (password) {
            const hashPassword = await bcrypt.hash(password, 10)
            updateClient.password = hashPassword
        }

        if (req.file) {

            //update image to imagekit

            const fileBuffer = fs.readFileSync(imageFile.path)
            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: imageFile.originalname,
                folder: "/uploads"
            })

            // optimize through imagekit URL transformation

            const optimizeImageUrl = imagekit.url({
                path: response.filePath,
                transformation: [
                    { quality: 'auto' },  //Auto compression
                    { format: 'webp' },   // Convert to modern format
                    { width: '1280' }     // width resizing
                ]
            });

            updateClient.image = optimizeImageUrl;

        }

        await updateClient.save()

        res.json({
            success: true,
            message: "Client updated successfully",
            updatedData: updateClient
        })


    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Internal Server error"
        })
    }
}

export { addClient, fetchClient, deleteClient, updateClient }