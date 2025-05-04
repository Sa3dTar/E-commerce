require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()

app.use(bodyParser.json())

app.use(cors())


const db = require('./config/database')

const admin = require('./models/admins')
const user = require('./models/users')
const category = require('./models/categories')
const product = require('./models/products')
const order = require('./models/orders')

category.hasMany(product, {as : 'productId'})
product.belongsTo(category)

product.hasOne(order , {as : 'productId'})
order.belongsTo(product)

db.sync({force : false}) 


const adminRoutes = require('./routes/admin.routes')
const userRoutes = require('./routes/user.routes')
const categoryRoutes = require('./routes/category.routes')
const productRoutes = require('./routes/product.routes')
const orderRoutes = require('./routes/order.routes')
const paymentRoutes = require('./routes/payment.routes')


app.use('/api/admin',adminRoutes)
app.use('/api/user',userRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/product' ,productRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/payment',paymentRoutes)


app.listen(process.env.PORT)