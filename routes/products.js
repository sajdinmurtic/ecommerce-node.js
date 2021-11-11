const router = require('express').Router()
const Product = require('../models/product')
const auth = require('../middleware/auth')

router.get('/', async (req, res)=> {
    try {
        const products = await Product.find(req.body.id)
        res.status(200).json(products)
    }catch(err) {
        res.status(500).json(err)
    }
    })
       
    router.post('/', auth, async (req, res) => {
        const newProduct = new Product(req.body)
        try {
           const savedProduct = await newProduct.save()
           res.status(200).json(savedProduct)
        } catch(err) {
            res.status(500).json(err)
        
        }})
    
    router.get('/find/:id', async (req, res)=> {
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        } catch(err) {
            res.status(500).json(err)
        }
    })
    router.delete('/:id', auth, async (req, res)=> {
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).json('Product has been deleted')
        }catch(err) {
            res.status(500).json(err)
        }
    })
    
module.exports = router