import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'

export const registerController = async(req,res) =>{

    try {
        console.log(req.body)
        const {name,email,password,phone,address} = req.body
        console.log(password)
        if(!name){
            return res.send({error:'Name is required'})
        }
        if(!email){
            return res.send({error:'email is required'})
        }
        if(!password){
            return res.send({error:'password is required'})
        }
        if(!phone){
            return res.send({error:'phone is required'})
        }
        if(!address){
            return res.send({error:'address is required'})
        }

        const existingUser = await userModel.findOne({email:email})

        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"Already Registered, Please Login"
            })
        }
        console.log("Asdfoasf",password)

        const hashedPassword = await hashPassword(password)
        console.log("adsoifjapsjfpisajfpiasjpf",hashedPassword)
        const user = await new userModel({name,email,phone,address,password:hashedPassword}).save()
        res.status(201).send({
            success:true,
            message:'User registered successfully',
            user
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Error in Registration",
            error
        })
    }
};

export const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid Email or passowrd"
            })
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email Not registered."
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Wrong passowrd"
            })
        }
        //token
        const token = await JWT.sign({_id:user.id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        })
        res.status(200).send({
            success:true,
            message:"login Success",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }
}


export const testController = (req,res)=>{
    res.send("Adsfih")
}