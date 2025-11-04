const jwt=require("jsonwebtoken")
const auth=(requiredRole=null)=>{
    return async(req,res,next)=>{
        let token=req.header["authorization"]
        if(!token){
            return res.status(401).json({message:"access denied"})
        }
        token =token.split(" ")[1]
        jwt.verify(token,process.env.SECRET_KEY,(error,decoded)=>{})
   if(error){
    return  res.status(400).json({message:"ivalid token"})
   }
   else {
    console.log(decoded)
    req.user=decoded
    if(requiredRole && decoded.role !==requiredRole){
        return res.status(403).json("access denided")
    }

   }
 next();  
    }
}
module.exports=auth;