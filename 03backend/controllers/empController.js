import fs from 'fs'
import imagekit from '../config/imageKit.js';
import Emp from '../models/empModel.js';

const addData = async (req, res) => {
    try {

        const { username } = req.body;
        const imageFiles = req.files; // because we’re using upload.array()

        if (!imageFiles || imageFiles.length === 0) {
            return res.json({
                success: false,
                message: "No files uploaded",
            });
        }

        const uploadPromises = imageFiles.map(file => {
            const fileBuffer = fs.readFileSync(file.path);

            return imagekit.upload({
                file: fileBuffer,
                fileName: file.originalname,
                folder: "/empImages",
            });
        });

        const results = await Promise.all(uploadPromises);

        // ✅ Optimize ImageKit URLs
        const optimizedUrls = results.map(r =>
            imagekit.url({
                path: r.filePath,
                transformation: [
                    { quality: "auto" },  // Auto compression
                    { format: "webp" },   // Convert to WebP
                    { width: "1280" },    // Resize
                ],
            })
        );

        const emp = new Emp({
            username,
            images: optimizedUrls,
        });

        await emp.save();

        res.json({
            success: true,
            message: "Employee created successfully",
            data: emp,
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message || "Internal server error",
        });

    }
}

export { addData }