const orders = require('../models/orders')
const httpStatusCode = require('../utils/httpStatusCode')
const httpStatusText = require('../utils/httpStatusText')
const orderMessages = require('../utils/orderMessages')
const productMessages = require('../utils/productMessages')
const { where } = require('sequelize')
const products = require('../models/products')

const addOrder =async (req , res)=>{

    const {quantity , productId} = req.body

    const product = await products.findOne({where : {id : productId}})

    if(product.quantity === 0){

        return res.status(404).json({statusText : httpStatusText.FAIL , message : productMessages.NOTAVAILABLE  , statusCode : httpStatusCode.NOTFOUND})

    }

    if(product.quantity < req.body.quantity){

        return res.status(400).json({statusText : httpStatusText.FAIL , message :productMessages.LESSQUANTITY ,statusCode : httpStatusCode.BADREQUEST})

    }
    

    const productPrice = product.Price

    const totalPrice = quantity * productPrice

    console.log(totalPrice)


    try{

        const newOrder =await orders.create({
            quantity ,
            total_Price : totalPrice,
            productId
        })

        const decreaseQuantity = product.quantity - newOrder.quantity

        const updateProduct = product.update({quantity : decreaseQuantity})
    
        return res.status(200).json({statusText : httpStatusText.SUCCESS ,message : orderMessages.SUCCESSORDER, data : newOrder , statusCode : httpStatusCode.SUCCESSCODE})
    

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR, message : error.message , statusCode : httpStatusCode.ERROR})

    }

   
}





const getOrder =async (req , res)=>{

    try{

        const orderId = req.params.orderId

        const singleOrder = await orders.findOne({where : {id : orderId}})
    
        return res.status(200).json({statusText : httpStatusText.SUCCESS , data : singleOrder , statusCode : httpStatusCode.SUCCESSCODE})
    

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR ,message : error.message , statusCode : httpStatusCode.ERROR })

    }

}

const updateOrder = async (req , res)=>{

    try{

        const orderId = req.params.orderId

        const singleOrder = await orders.findOne({where : {id : orderId}})

        const updatedOrder = await singleOrder.update()

        return res.status(200).json({statusText : httpStatusText.SUCCESS, message : orderMessages.UPDATEORDER , data : updatedCategory , statusCode : httpStatusCode.SUCCESSCODE})

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR ,message : error.message , statusCode : httpStatusCode.ERROR })

    }
  
}

const deleteOrder = async (req , res)=>{
 
    try{

        const orderId = req.params.orderId

        const singleOrder = await orders.findOne({where : {id : orderId}})

        const deletedOrder = singleOrder.destroy()

        return res.status(200).json({statusText : httpStatusText.SUCCESS , message : orderMessages.DELETEORDER , data : null , statusCode : httpStatusCode.SUCCESSCODE})

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR ,message : error.message , statusCode : httpStatusCode.ERROR })

    }
        

}

module.exports = {
    addOrder,
    getOrder,
    updateOrder,
    deleteOrder
}