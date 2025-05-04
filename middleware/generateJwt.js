const jwt = require('jsonwebtoken')
 
const generateAdminJWT = (payload)=>{

    return jwt.sign(payload , process.env.JWT_SECRETE_KEY , {expiresIn : '1y'})

}

const generateUserJWT = (payload)=>{

    return jwt.sign(payload , process.env.JWT_SECRETE_KEY , {expiresIn : '1y'})

}

const generateOrderJWT = (payload)=>{

    return jwt.sign(payload , process.env.JWT_SECRETE_KEY, {expiresIn : '2h'})

}


module.exports = {
    generateAdminJWT , 
    generateUserJWT , 
    generateOrderJWT
}