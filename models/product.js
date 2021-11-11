const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {type: String,  required: true, unique: true},
    price: {type: Number, required: true},
    productImage: { type: String, required: true},
    quantity : { type: Number, required: true}

}, 
{ timestamps: true,})

module.exports = mongoose.model('Product', productSchema)