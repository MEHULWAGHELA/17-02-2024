const router=require('express').Router();
const product=require('./product')
const user=require('./user')

router.use('/product',product)
router.use('/user',user)

module.exports=router