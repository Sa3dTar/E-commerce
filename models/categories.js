const { type } = require('os')
const db = require('../config/database')
const validator = require('validator')

const {Sequelize , DataTypes} = require('sequelize')
const { default: isEmail } = require('validator/lib/isEmail')
const { title } = require('process')

const categories = db.define('categories', {
    title : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    description : {
        type : DataTypes.TEXT,
        allowNull : false,
        unique : true,

    }
})

module.exports = categories