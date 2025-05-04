const { where } = require('sequelize')
const admins = require('../../models/admins')
const httpStatusCode = require('../../utils/httpStatusCode')
const httpStatusText = require('../../utils/httpStatusText')
const adminMessage = require('../../utils/adminMessages')
const bcrypt = require('bcryptjs')
const generateJwt = require('../../middleware/generateJwt')
const types = require('../../utils/types')

const jwt = require('jsonwebtoken')

const register =async (req , res)=>{
    const {full_name , email , password} = req.body

    const oldAdmin =await admins.findOne({where : {email : email}})

    if(oldAdmin){
        return res.status(400).json({statusText : httpStatusText.FAIL, message : adminMessage.FAILEDREGISTERED, statusCode : httpStatusCode.BADREQUEST })
    }

    try{

        const hashedPassword = await bcrypt.hash(password , 10)

        const  newAdmin = await admins.create({
           full_name,
           email,
           password : hashedPassword
        })

         await newAdmin.save()

         const token = generateJwt.generateAdminJWT({id : newAdmin.id , type : types.ADMIN })

         console.log(token)

         return res.status(200).json({statusText : httpStatusText.SUCCESS , message: adminMessage.SUCCESSREGISTERED, statusCode: httpStatusCode.SUCCESSCODE })

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR , message : error.message , statusCode : httpStatusCode.ERROR})

    }

}


const login = async (req , res)=>{

    const {email , password} = req.body


    try{
       
         const existAdmin =await admins.findOne({where : {email : email}})

         const matchedPassword =await bcrypt.compare(password , existAdmin.password)

         if(existAdmin &&  matchedPassword){

            const token = generateJwt.generateAdminJWT({id : existAdmin.id , type : types.ADMIN})

            console.log(token)
   
            return res.status(200).json({statusText : httpStatusText.SUCCESS , message : adminMessage.SUCCESSLOGIN , statusCode : httpStatusCode.SUCCESSCODE})
            
         }
         else{
            return res.status(400).json({statusText : httpStatusText.FAIL , message : adminMessage.FAILEDLOGIN, statusCode : httpStatusCode.BADREQUEST})

         }

        
        

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR , message : error.message, statusCode : httpStatusCode.ERROR})

    }

}


module.exports = {
    register,
    login
}