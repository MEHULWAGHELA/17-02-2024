const User = require("../model/User");

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
    try {
        const user = await User.findByIdAndDelete(req.query.id)
        res.status(200).json({
            message: "user deleted successfully",
            data: user,
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

const updateUser = async (req, res) => {
    try {
        const olduser = await User.findByIdAndUpdate({_id:req.query.id},{$set:req.body})
        const updatedUSer=await User.findById(req.query.id)
        res.status(200).json({
            message: "user updated successfully",
            data: updatedUSer,
            olduser:olduser,
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

module.exports = { getUser, postUser, deleteUser, updateUser }