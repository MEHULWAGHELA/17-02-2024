const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testingfor')
    .then(() => console.log("Mongodb connected"))