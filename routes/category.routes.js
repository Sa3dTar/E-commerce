const express = require("express")

const categoryController = require('../controllers/category.Controller')

const verifyToken = require('../middleware/verifyToken')

const validation = require('../middleware/validationSchema')


const router = express.Router()

router.route('/')
             .post(verifyToken.verifyAdminToken,validation.categorySchema,categoryController.addCategory)
             .get(categoryController.GetAllCategories)

router.route('/:categoryId')
             .get(categoryController.getSingleCategory)
             .patch(verifyToken.verifyAdminToken,validation.categorySchema,categoryController.updateCategory)
             .delete(verifyToken.verifyAdminToken,categoryController.deleteCategory)


module.exports = router