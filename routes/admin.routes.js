const express = require("express")

const admincontroller = require('../controllers/authControllers/admin.Controller')

const validation = require('../middleware/validationSchema')

const router = express.Router()

router.route('/register')
             .post(validation.adminSchema,admincontroller.register)


router.route('/login')
             .post(validation.adminSchema,admincontroller.login)


module.exports = router