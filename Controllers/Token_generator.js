const jwt = require("jsonwebtoken")
const generateToken=(user)=>{
    return  jwt.sign({email:user.email,id:user.id}, process.env.JWT_KEY/* we can aslo expore the session accoring ,{expiresIn:'1h'}*/);

}



module.exports.generateToken = generateToken;
 