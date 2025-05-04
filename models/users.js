const { type } = require('os')
const db = require('../config/database')
const validator = require('validator')

const {Sequelize , DataTypes} = require('sequelize')
const { default: isEmail } = require('validator/lib/isEmail')

const users = db.define('users', {
    full_name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
        validator :[validator.isEmail ,'email is required']

    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    address : {
        type : DataTypes.TEXT,
        allownull : false
    }
})

module.exports = users