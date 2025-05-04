const express = require("express")

const orderController = require('../controllers/order.Controller')

const verifyToken = require('../middleware/verifyToken')

const validation = require('../middleware/validationSchema')


const router = express.Router()

router.route('/')
             .post(verifyToken.verifyUserToken,orderController.addOrder)

router.route('/:orderId')
             .get(verifyToken.verifyUserToken,orderController.getOrder)
             .patch(verifyToken.verifyUserToken,verifyToken.verifyOrderToken,orderController.updateOrder)
             .delete(verifyToken.verifyUserToken,verifyToken.verifyOrderToken,orderController.deleteOrder)


module.exports = router