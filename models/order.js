const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    
    userId: { type: String, required: true},
    productId: {type: String,  required: true},
    quantity: {type: Number, default: 1},
    price : { type: Number, require: true},
    

}, { timestamps:true})

module.exports = mongoose.model('Order', orderSchema)