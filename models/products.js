const { type } = require('os')
const db = require('../config/database')
const validator = require('validator')

const {Sequelize , DataTypes} = require('sequelize')
const { default: isEmail } = require('validator/lib/isEmail')


const products = db.define('products', {
    title : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    description :{
        type : DataTypes.TEXT,
        allowNull : false

    },
    Price : {
        type : DataTypes.DECIMAL(10 ,2),
        allowNull : false,

    },
    quantity : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
})

module.exports = products