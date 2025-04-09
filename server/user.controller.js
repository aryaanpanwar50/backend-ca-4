const User = require('./user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const register = async(req,res)=>{
    const{username,password} = req.body
    try{
        const hash = await bcrypt.hash(password,10)
        const newUser = new User({
            username,
            password:hash
        })

        await newUser.save()
        res.status(201).json({message:"User created successfully",newUser})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const login = async(req,res)=>{
    const{username,password} = req.body
    try{
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).send("The user does not exsist")
        }

        const match = await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(404).send("Invalid password")
        }

        const token =  jwt.sign({username,password},process.env.JWT_S)
        res.cookie("token",token,({httpsOnly:true}))
        res.status(200).json({message:"Login Successfully",user})

    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const profile = async(req,res)=>{
    try{
        const user = req.user.username
        res.status(201).json({user})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}



const time = async(req,res)=>{
    try{
        const time = await new Date().toISOString().replace("T"," ").split(".")[0]
        res.status(200).json({Time:time})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

module.exports = {register,login,time,profile}