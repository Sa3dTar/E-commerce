const { where } = require('sequelize')
const users = require('../../models/users')
const httpStatusCode = require('../../utils/httpStatusCode')
const httpStatusText = require('../../utils/httpStatusText')
const userMessages = require('../../utils/userMessages')
const bcrypt = require('bcryptjs')
const generateJwt = require('../../middleware/generateJwt')
const types = require('../../utils/types')

const jwt = require('jsonwebtoken')

const register =async (req , res)=>{
    const {full_name , email , password , address} = req.body

    const oldUser =await users.findOne({where : {email : email}})

    if(oldUser){
        return res.status(400).json({statusText : httpStatusText.FAIL, message : userMessages.FAILEDREGISTERED, statusCode : httpStatusCode.BADREQUEST })
    }

    try{

        const hashedPassword = await bcrypt.hash(password , 10)

        const  newUser = await users.create({
           full_name,
           email,
           password : hashedPassword,
           address
        })

         await newUser.save()

         const token = generateJwt.generateUserJWT({id : newUser.id , type : types.USER })

         console.log(token)

         return res.status(200).json({statusText : httpStatusText.SUCCESS , message: userMessages.SUCCESSREGISTERED, statusCode: httpStatusCode.SUCCESSCODE })

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR , message : error.message , statusCode : httpStatusCode.ERROR})

    }

}


const login = async (req , res)=>{

    const {email , password} = req.body


    try{
       
         const existUser =await users.findOne({where : {email : email}})

         const matchedPassword =await bcrypt.compare(password , existUser.password)

         if(existUser &&  matchedPassword){

            const token = generateJwt.generateUserJWT({id : existUser.id , type : types.USER})

            console.log(token)
   
            return res.status(200).json({statusText : httpStatusText.SUCCESS , message : userMessages.SUCCESSLOGIN , statusCode : httpStatusCode.SUCCESSCODE})
            
         }
         else{
            return res.status(400).json({statusText : httpStatusText.FAIL , message : userMessages.FAILEDLOGIN, statusCode : httpStatusCode.BADREQUEST})

         }

        
        

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR , message : error.message, statusCode : httpStatusCode.ERROR})

    }

}


module.exports = {
    register,
    login
}