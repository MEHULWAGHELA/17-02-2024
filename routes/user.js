const tokenVerify = require('../Authorization/tokenVerify');
const { getUser, postUser, deleteUser, updateUser, loginUser, filterUser } = require('../controller/userController');

const router = require('express').Router();

router.get('/getuser', tokenVerify, getUser)
router.post('/postuser', postUser)
/* if we want to delete using params we can write like this 
{{HOST}}:{{PORT}}/api/user/deleteuser/65d1d1b1e298264c4f3c8056
router.delete('/deleteuser/:id', deleteUser)
*/
router.delete('/deleteuser', deleteUser)
router.post('/updateuser', updateUser)
router.post('/loginuser', loginUser)
router.get('/filteruser/:age', filterUser)

module.exports = router