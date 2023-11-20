const mongoose = require('mongoose');

const mongoURI = process.env.URI;

const connectToMongo = async()=>{
    await mongoose.connect(mongoURI)
    console.log("Connected to Mongo Successfully");
    
}

module.exports = connectToMongo;