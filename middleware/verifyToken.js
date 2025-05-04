const jwt = require("jsonwebtoken")

const httpStatusCode = require('../utils/httpStatusCode')

const httpStatusText = require('../utils/httpStatusText')

const types = require('../utils/types')

const autherizationUtils = require('../utils/autherization')



const verifyAdminToken = (req , res , next)=>{

    const AuthHeader = req.headers['authorization'] || req.headers['AUTHORIZATION']

    if(!AuthHeader){

        return res.status(400).json({TextStatus : httpStatusText.FAIL , message : autherizationUtils , statusCode : httpStatusCode.BADREQUEST})

    }

    try{
        const AdminToken = AuthHeader.split(' ')[1]

        const currentAdmin = jwt.verify(AdminToken , process.env.JWT_SECRETE_KEY)

        if(currentAdmin.type === types.ADMIN){

           req.adminId = currentAdmin.id

        }
    
        next()

    }catch(error){
        return res.status(500).json({statusText : httpStatusText.ERROR , message : error.message , statusCode : httpStatusCode.ERROR})
    }
   

}



const verifyUserToken = (req , res , next)=>{

    const AuthHeader = req.headers['authorization'] || req.headers['AUTHORIZATION']

    if(!AuthHeader){

        return res.status(400).json({statusText : httpStatusText.FAIL , message :  'autherization is required' , statusCode : httpStatusCode.BADREQUEST})

    }

    try{
        const UserToken = AuthHeader.split(' ')[1]

        const currentUser = jwt.verify(UserToken , process.env.JWT_SECRETE_KEY)

        if(currentUser.type === types.USER){

            req.userId = currentUser.id

        }
    
        next()

    }catch(error){
        return res.status(500).json({statusText : httpStatusText.ERROR , message : error.message , statusCode : httpStatusCode.ERROR})
    }
   

}


const verifyOrderToken = (req , res , next)=>{

        const AuthHeader = req.headers['authorization'] || req.headers['AUTHORIZATION']

        if(!AuthHeader){
            return res.status(404).json({statusText : httpStatusText.FAIL , message :autherizationUtils, statusCode : httpStatusCode.NOTFOUND})

        }

        try{

            const OrderToken = AuthHeader.split(' ')[1]

            const currentOrder = jwt.verify(OrderToken , process.env.JWT_SECRETE_KEY)

            if(currentOrder.type === types.ORDER){

                req.orderId = currentOrder.id

            }

            next()

        }catch(error){

            return res.status(500).json({statusText : httpStatusText.ERROR , message : error.message , statusCode : httpStatusCode.ERROR})

        }

        

    
}

module.exports = {
    verifyAdminToken,
    verifyUserToken,
    verifyOrderToken
}