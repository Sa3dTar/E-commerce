const products = require('../models/products')
const httpStatusCode = require('../utils/httpStatusCode')
const httpStatusText = require('../utils/httpStatusText')
const productMessages = require('../utils/productMessages')
const { where } = require('sequelize')

const addProduct =async (req , res)=>{

    const {title , description, Price , quantity} = req.body

    const existProduct =await products.findOne({where : {title : title}})

    if(existProduct){

        return res.status(400).json({statusText : httpStatusText.FAIL , message : productMessages.EXISTPRODUCT, statusCode : httpStatusCode.BADREQUEST})

    }

    try{

        const newProduct =await products.create({
            title ,
            description,
            Price,
            quantity
        })
    
        return res.status(200).json({statusText : httpStatusText.SUCCESS ,message : productMessages.CREATEDSUCCESSFULLY, data : newProduct , statusCode : httpStatusCode.SUCCESSCODE})
    

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR, message : error.message , statusCode : httpStatusCode.ERROR})

    }

   
}



const GetAllProducts = async (req , res)=>{


    try{

         let query = req.query

         let limit = query.limit

         let page = query.page

         let skip = (page - 1) * 6

         const allProducts =await products.findAll().skip(skip)

         return res.status(200).json({statusText : httpStatusText.SUCCESS , data : allProducts , statusCode : httpStatusCode.SUCCESSCODE})


    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR , message : error.message, statusCode : httpStatusCode.ERROR })

    }

}


const getSingleProduct =async (req , res)=>{

    try{

        const productId = req.params.productId

        const singleProduct = await products.findOne({where : {id : productId}})

        if(singleProduct.quantity ===0){

            return res.status(200).json({statusText : httpStatusText.SUCCESS , message : productMessages.NOTAVAILABLE , statusCode : httpStatusCode.SUCCESSCODE})

        }
    
        return res.status(200).json({statusText : httpStatusText.SUCCESS , data : singleProduct , statusCode : httpStatusCode.SUCCESSCODE})
    

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR ,message : error.message , statusCode : httpStatusCode.ERROR })

    }

}

const updateProduct = async (req , res)=>{

    try{

        const productId = req.params.productId

        if(!productId){

            return res.status(404).json({statusText : httpStatusText.FAIL , message : productMessages.NOTFOUND , statusCode : httpStatusCode.NOTFOUND})

        }

        const singleProduct = await products.findOne({where : {id : productId}})

        const updatedProduct = await singleProduct.update()

        return res.status(200).json({statusText : httpStatusText.SUCCESS, message : productMessages.UPDATECATEGORY , data : updatedProduct , statusCode : httpStatusCode.SUCCESSCODE})

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR ,message : error.message , statusCode : httpStatusCode.ERROR })

    }
  
}

const deleteProduct = async (req , res)=>{
 
    try{

        if(!productId){

            return res.status(404).json({statusText : httpStatusText.FAIL , message : productMessages.NOTFOUND , statusCode : httpStatusCode.NOTFOUND})

        }

        const productId = req.params.productId

        const singleProduct = await products.findOne({where : {id : productId}})

        const deletedProduct = singleProduct.destroy()

        return res.status(200).json({statusText : httpStatusText.SUCCESS , message : productMessages.DELETE , data : deletedProduct , statusCode : httpStatusCode.SUCCESSCODE})

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR ,message : error.message , statusCode : httpStatusCode.ERROR })

    }
        

}

module.exports = {
    addProduct,
    getSingleProduct,
    GetAllProducts,
    updateProduct,
    deleteProduct
}