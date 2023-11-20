const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://foodcourtbackend-main-db-0d5124721c1:N3Mt9NCVjwUa9MmjgcQCp8A4w9qkGp@prod-us-central1-1.lfuy1.mongodb.net/foodcourtbackend-main-db-0d5124721c1"

const connectToMongo = async()=>{
    await mongoose.connect(mongoURI)
    console.log("Connected to Mongo Successfully");
    
}

module.exports = connectToMongo;