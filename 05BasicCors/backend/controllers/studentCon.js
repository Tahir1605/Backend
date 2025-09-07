import Student from "../models/studentModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}
const register = async (req , res) => {
    try {

        const {name , email , password} = req.body;

        const existingUser = await Student.findOne({email})
        if(existingUser){
            return res.json({
                success:false,
                message:"User already exit"
            })
        }

        const hashPassword = await bcrypt.hash(password,10)

        const newStudent = new Student({
            name,
            email,
            password:hashPassword
        })

        await newStudent.save()

        res.json({
            success:true,
            message:"User Register Successfully"
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message || "Internal server error"
        })
    }
}

const login = async (req , res) => {
    try {

        const {email , password} = req.body;

        const existingUser = await Student.findOne({email});
        if(!existingUser){
            return res.json({
                success:false,
                message:"User Does not exists"
            })
        }

        const isMatch = await bcrypt.compare(password , existingUser.password);

        if(isMatch){
            const token = createToken(existingUser._id)
            res.json({
                success:true,
                message:`Welcome ${existingUser.name} !`,
                token
            })
        }else{
            res.json({
                success:false,
                message:"Invalid credential"
            })
        }
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message || "Internal error"
        })
    }
}

export {register , login}