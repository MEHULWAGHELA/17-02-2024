const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"name must be required"],
    },
    email: {
        type: String,
        required: [true,"Email must be required"],
        unique: [true,"Email must be already used"]
    },
    age: {
        type: Number,
        required: [true,'age must be requried'],
    },
    status: {
        type: Boolean,
        default:true
    },
    password: {
        type: String,
        required: [true,'password is required'],
    },
}, { timestamps: true })

const User = mongoose.model("user", userSchema);

module.exports = User