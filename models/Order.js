const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'id'
    },
    name:{
        type: String,
    },
    phone:{
        type: Number,
    },
    orderData:{
        type: Array,
    },
    date:{
        type: Date,
        
    },
    paid:{
        type: Boolean
    },
  });

  module.exports = mongoose.model('order', OrderSchema);