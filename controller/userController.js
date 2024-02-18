const User = require("../model/User");
const jwt = require('jsonwebtoken');
const SECRETKEY = process.env.SECRETKEY;
const getUser = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({
            message: "retrived data successfully",
            data: users
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

const postUser = async (req, res) => {
    try {
        const Data = await User.create(req.body)
        res.status(201).json({
            message: "data added successfully",
            data: Data,
            success: true
        })
    }
    catch (error) {
        if (error.name === "MongoServerError" && error.code === 11000) {
            res.status(400).json({
                message: "Email must be unique",
                success: false
            })
        }
        else {
            res.status(500).json({
                message: error,
                success: false
            })
        }
    }
}

const deleteUser = async (req, res) => {
    // console.log(req.params.id) we can get parmas like this and this key id id which we write routes path 
    // const user = await User.findByIdAndDelete(req.params.id)
    try {
        const user = await User.findByIdAndDelete(req.query.id)
        if (user) {
            res.status(200).json({
                message: "user deleted successfully",
                data: user,
                success: true
            })
        }
        else {
            res.status(400).json({
                message: "user not found",
                query: req.query.id,
                param: req.params,
                success: false
            })
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: true
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const olduser = await User.findByIdAndUpdate({ _id: req.query.id }, { $set: req.body })
        const updatedUSer = await User.findById(req.query.id)
        res.status(200).json({
            message: "user updated successfully",
            data: updatedUSer,
            olduser: olduser,
            success: true
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: true
        })
    }
}
const loginUser = async (req, res) => {
    try {
        const userAvailable = await User.find({ email: req.body.email, password: req.body.password });
        if (userAvailable) {
            /* if we want to make token of only email then we can make it like this
            const token = jwt.sign({ email:req.body.email }, SECRETKEY, { expiresIn: "300s" })
             */
            let user = req.body
            const token = jwt.sign({ user }, SECRETKEY)
            res.status(200).json({
                message: "user login successfully",
                token: token,
                success: true
            })
        }
        else {
            res.status(200).json({
                message: "No any user available for this credential",
                data: [],
                success: true
            })

        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: true
        })
    }
}
const filterUser = async (req, res) => {
    try {
        const dataSet =await User.aggregate([
            {
                "$match":{
                    age:Number(req.params.age)
                }
            },
            {
                "$group":{
                    /* _id is key by which we can make group.. this make group according staus. in this we have two status active and true by that it make two groups */
                    _id:"$status",
                    data:{"$push":"$name"},
                    allData:{"$push":"$$ROOT"}
                }
            }
        ])
        res.status(200).json({
            message: "retrived data successfully",
            data: dataSet
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

module.exports = { getUser, postUser, deleteUser, updateUser, loginUser, filterUser }