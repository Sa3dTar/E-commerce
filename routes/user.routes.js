const express = require('express')

const router = express.Router()

const userController = require('../controllers/authControllers/user.Controller')

const validation = require('../middleware/validationSchema')




router.route('/register')
             .post(validation.userSchema,userController.register)

router.route('/login')
             .post(validation.userSchema,userController.login)



module.exports =router