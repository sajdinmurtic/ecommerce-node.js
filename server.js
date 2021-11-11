const express = require('express')
const mongooose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const productRoute = require('./routes/products')
const orderRoute = require('./routes/orders')
const userRoute = require('./routes/user')

dotenv.config()

mongooose.connect(process.env.MONGO_URL)
.then(()=> console.log('Connection successfull'))
.catch((err)=> {
    console.log(err)
})

app.use(express.json())
app.use('/users', userRoute)
app.use('/products', productRoute)
app.use('/orders', orderRoute)

app.listen(process.env.PORT || 5000, ()=> {
    console.log('Server is running')
})

