import Auth from "../models/authModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

const registerUser = async (req, res) => {
    try {

        console.log(req.body)
        const { name, email, password } = req.body

        const existingUser = await Auth.findOne({ email });

        if (existingUser) {

            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Auth({

            name,
            email,
            password: hashedPassword
        })

        await newUser.save();

        res.json({
            success: true,
            message: "User Register Successfully"
        })

    } catch (error) {

        res.json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const existingUser = await Auth.findOne({ email });

        if (!existingUser) {
            return res.json({

                success: false,
                message: "User not exists"
            })
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (isMatch) {
            const token = createToken(existingUser._id);
            return res.json({ 
                success: true,
                token 
            });
        }
        else {
            return res.json({ 
                success: false,
                message: 'Invalid credentials' });
        }


    } catch (error) {

          res.json({
            success:false,
            message:error.message || "Internal server error"
          })
    }
}

export { registerUser, loginUser }