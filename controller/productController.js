const Product = require("../model/product")

const getProduct = (req, res) => {
    res.send("retrived data successfully")
}
const postProduct = async (req, res) => {
    try {
        const Data = await Product.create(req.body)
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