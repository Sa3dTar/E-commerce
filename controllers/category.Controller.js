const categories = require('../models/categories')
const httpStatusCode = require('../utils/httpStatusCode')
const httpStatusText = require('../utils/httpStatusText')
const categoryMessage = require('../utils/categoryMessages')
const { where } = require('sequelize')

const addCategory =async (req , res)=>{

    const {title , description} = req.body

    const existCategory =await categories.findOne({where : {title : title}})

    if(existCategory){

        return res.status(400).json({statusText : httpStatusText.FAIL , message : categoryMessage.EXISTCATEGORY, statusCode : httpStatusCode.BADREQUEST})

    }

    try{

        const newCategory =await categories.create({
            title ,
            description
        })
    
        return res.status(200).json({statusText : httpStatusText.SUCCESS ,message : categoryMessage.CREATEDSUCCESSFULLY, data : newCategory , statusCode : httpStatusCode.SUCCESSCODE})
    

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR, message : error.message , statusCode : httpStatusCode.ERROR})

    }

   
}



const GetAllCategories = async (req , res)=>{


    try{

         let query = req.query

         let limit = query.limit

         let page = query.page

         let skip = (page - 1) * 6

         const allCategories =await categories.findAll().skip(skip)

         return res.status(200).json({statusText : httpStatusText.SUCCESS , data : allCategories , statusCode : httpStatusCode.SUCCESSCODE})


    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR , message : error.message, statusCode : httpStatusCode.ERROR })

    }

}


const getSingleCategory =async (req , res)=>{

    try{

        const categoryId = req.params.categoryId

        const singleCategory = await categories.findOne({where : {id : categoryId}})
    
        return res.status(200).json({statusText : httpStatusText.SUCCESS , data : singleCategory , statusCode : httpStatusCode.SUCCESSCODE})
    

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR ,message : error.message , statusCode : httpStatusCode.ERROR })

    }

}

const updateCategory = async (req , res)=>{

    try{

        const categoryId = req.params.categoryId

        const singleCategory = await categories.findOne({where : {id : categoryId}})

        const updatedCategory = await singleCategory.update()

        return res.status(200).json({statusText : httpStatusText.SUCCESS, message : categoryMessage.UPDATECATEGORY , data : updatedCategory , statusCode : httpStatusCode.SUCCESSCODE})

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR ,message : error.message , statusCode : httpStatusCode.ERROR })

    }
  
}

const deleteCategory = async (req , res)=>{
 
    try{

        const categoryId = req.params.categoryId

        const singleCategory = await categories.findOne({where : {id : categoryId}})

        const deleetedCategory = singleCategory.destroy()

        return res.status(200).json({statusText : httpStatusText.SUCCESS , message : categoryMessage.DELETE , data : null , statusCode : httpStatusCode.SUCCESSCODE})

    }catch(error){

        return res.status(500).json({statusText : httpStatusText.ERROR ,message : error.message , statusCode : httpStatusCode.ERROR })

    }
        

}

module.exports = {
    addCategory,
    getSingleCategory,
    GetAllCategories,
    updateCategory,
    deleteCategory
}