const router = require('express').Router()
const Order = require('../models/order')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res)=> {
try {
    const orders = await Order.find()
    res.status(200).json(orders)
}catch(err) {
    res.status(500).json(err)
}
})
   
router.post('/', auth, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
       const savedOrder = await newOrder.save()
       res.status(200).json(savedOrder)
    } catch(err) {
        res.status(500).json(err)
    
    }})

router.get('/find/:userId', auth, async (req, res)=> {
    try {
        const orders = await Order.find({ userid: req.params.userId})
        res.status(200).json(orders)
    } catch(err) {
        res.status(500).json(err)
    }
})
router.delete('/:id', auth, async (req, res)=> {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('Order has been deleted')
    }catch(err) {
        res.status(500).json(err)
    }
})

 module.exports = router