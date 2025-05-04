const express = require("express")

const paymentController = require('../controllers/Checkout.Controller')

const verifyToken = require('../middleware/verifyToken')
const { route } = require("./admin.routes")
const router = require("./admin.routes")


router.route('/:orderid')
             .post(verifyToken.verifyUserToken,paymentController.createPayment)

router.route('/:orderid/verifyPayment')
             .post(verifyToken.verifyUserToken,paymentController.verifyPaymentStatus)


module.exports = router
