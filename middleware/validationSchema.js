const {validationResult,body} = require('express-validator')

const adminSchema = [
    body('full_name')
    .notEmpty()
    .withMessage('full name is required')
    .isLength({min : 7})
    .withMessage('minimum length of character is 7'),
    body('email')
    .notEmpty().
    withMessage('email is required'),
    body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({min : 10})
    .withMessage("the minimum length is 10")
]

const userSchema = [
    body('full_name')
    .notEmpty()
    .withMessage('full name is required')
    .isLength({min : 7})
    .withMessage('minimum length of character is 7'),
    body('email')
    .notEmpty()
    .withMessage('email is required'),
    body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({min : 10})
    .withMessage("the minimum length is 10"),
    body('address')
    .notEmpty()
    .withMessage('address is required')
    .isLength({min : 10})
    .withMessage('minimum length is 10')
]

const categorySchema = [
    body('title')
    .notEmpty()
    .withMessage('title is required'),
    body('description')
    .notEmpty()
    .withMessage('description is required')
]

const productSchema = [
    body('title')
    .notEmpty()
    .withMessage('title is required'),
    body('description')
    .notEmpty()
    .withMessage('description is required'),
    body('price')
    .notEmpty()
    .withMessage('price is required'),
    body('quantity')
    .notEmpty()
    .withMessage('quantity is required')
]


module.exports = {
    adminSchema,
    userSchema,
    categorySchema,
    productSchema
}