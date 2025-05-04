require('dotenv').config()

const sequelize = require('sequelize')

const db = new sequelize(
    process.env.DATABASE_NAME,
    process.env.DB_USERNAME,
    process.env.PASSWORD,
    {
        host : process.env.HOST,
        dialect : 'mysql'
    }
)

module.exports = db