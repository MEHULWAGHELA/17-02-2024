const jwt = require('jsonwebtoken');
const { getUser } = require('../controller/userController');
const SECRETKEY = process.env.SECRETKEY

const tokenVerify = (req, res,next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "token missing"
        })
    }
    if (token) {
        try {
            jwt.verify(token.split(" ")[1], SECRETKEY,(err,decode)=>{
                next()
            })
        }
        catch (error) {
            return res.status(401).json({
                message: "unauthorised user"
            })
        }
    }
}

module.exports = tokenVerify