const { type } = require('os')
const db = require('../config/database')
const validator = require('validator')

const {Sequelize , DataTypes} = require('sequelize')
const { default: isEmail } = require('validator/lib/isEmail')
const { title } = require('process')

const orders = db.define('orders', {
    quantity : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    total_Price : {
        type : DataTypes.DECIMAL(10,2),
        allowNull : false,

    }
})

module.exports = orders