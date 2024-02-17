require('dotenv').config();
require('./config/db')
const PORT = process.env.PORT;
const express = require('express');
const app = express();
const routes=require('./routes')

/* if we not write this we can not get req .body in json formate */
app.use(express.json())
app.use('/api',routes)

/* by using this we can get that image at front end side as url */
/* http://localhost:8000/uploads/1708189016733.jpg
sample url for this file */
// if we write like this we dont have use path name with uploads
// we can directly image or any file by http://localhost:8000/productImages/1708189016733.jpg
// app.use(express.static('uploads'))
/* when we find by url it is go in statis file uplados folder which we define as a static folder */
app.use(express.static('uploads'))
app.get('/', (req, res) => {
    res.send("Hello From backend side")
})

app.listen(PORT, () => {
    console.log('listen on port' + " " + PORT)
})