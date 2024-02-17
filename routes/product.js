const { getProduct, postProduct, deleteProduct, updateProduct } = require('../controller/productController');

const router=require('express').Router();

const multer=require('multer');
const path=require('path');
/* for file upload we have to make storage i which we have to give to options filename and destination, what is file name and where we wants to store image 
1=> in this we wants to upload image in uploads folder
2=> for unique name for all image which we store we add current date + file original name*/

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({storage})

router.get('/getproduct',getProduct)

/* productImage is name from the frontend side key which we send in body. Here we use multer as a middleware*/
/* if we write array we can upload multiple file.. i f we wants to add single file we have to write upload.single */
// router.post('/postproduct',upload.array('productImage'),postProduct)
router.post('/postproduct',upload.single('productImage'),postProduct)
router.delete('/deleteproduct',deleteProduct)

router.post('/updateproduct',updateProduct)

module.exports=router