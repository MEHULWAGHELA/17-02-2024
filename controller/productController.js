const Product = require("../model/product")

const getProduct = async (req, res) => {
    try {
        const product = await Product.find()
        res.status(200).json({
            message: "retrived data successfully",
            data: product
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}
const postProduct = async (req, res) => {
    try {
        const body={
            ...req.body,
            productImage:req.file.filename
        }
        const Data = await Product.create(body)
        res.status(201).json({
            message: "data added successfully",
            data: Data,
            success: true
        })
    }
    catch (error) {
        res.status(500).json({
            message: error,
            success: false
        })
    }
}
const deleteProduct = (req, res) => {
    res.send("retrived data successfully")
}
const updateProduct = (req, res) => {
    res.send("retrived data successfully")
}

module.exports = { getProduct, postProduct, deleteProduct, updateProduct }