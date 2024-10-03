const express = require("express");

const dotenv = require('dotenv');
const mongoose =require('mongoose');
const vendorRoutes = require('../backend/routes/vendorRoutes')
const bodyParser =require('body-parser');
const eventRoutes = require('../backend/routes/eventRoutes')
const path = require('path')

const app = express()
 const PORT =4000;
 
 dotenv.config();

 mongoose.connect(process.env.MONGO_URI)
 .then(()=>console.log("MONGODB CONNECTED SUCCESSFULLY"))
 .catch((error)=>console.log(error))

app.use(bodyParser.json());
 app.use('/vendor', vendorRoutes);
app.use('/event', eventRoutes);
app.use('/uploads', express.static('uploads'));


 app.listen(PORT,() => {

    console.log(`server started and running at ${PORT}`);
 })

 app.use('/home',(req, res)=>{
    res.send("<h1> Welcome to EventTicketingPlatform");
 })