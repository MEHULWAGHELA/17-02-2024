const { getUser, postUser, deleteUser, updateUser } = require('../controller/userController');

const router=require('express').Router();



router.get('/getuser',getUser)
router.post('/postuser',postUser)
router.delete('/deleteuser',deleteUser)
router.post('/updateuser',updateUser)

module.exports=router