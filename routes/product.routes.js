const express = require("express")

const productController = require('../controllers/product.Controller')

const verifyToken = require('../middleware/verifyToken')

const validation = require('../middleware/validationSchema')


const router = express.Router()

router.route('/')
            .post(verifyToken.verifyAdminToken,validation.productSchema,productController.addProduct)
            .get(productController.GetAllProducts)

router.route('/:productid')
            .get(productController.getSingleProduct)
            .patch(verifyToken.verifyAdminToken,validation.productSchema,productController.updateProduct)
            .delete(verifyToken.verifyAdminToken,validation.productSchema,productController.deleteProduct)

module.exports = router