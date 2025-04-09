const jwt  = require('jsonwebtoken')

const auth = async(req,res,next)=>{
    const token = req.cookies.token
    try{
        if(!token){
            return res.status(404).send("Login please")
        }
        
        jwt.verify(token,process.env.JWT_S,(err,user)=>{
            if(err){
                res.status(404).send("Unauthorized")
            }
            req.user = user
            next()
        })

    }catch(error){
        res.status(404).json({error:error.message})
    }
}

module.exports = {auth}