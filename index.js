const express = require("express");
const fs = require("fs/promises");
const app = express();
const connectToMongo = require("./db");
const port = process.env.PORT || 3000;
const Order = require("./models/Order");
const cors = require("cors");

app.options("*", cors());
app.use(cors());
app.use(express.json());
connectToMongo();
app.get("/prevorders", async (req, res) => {
  try {
    const notes = await Order.find({});
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/save", async (req, res) => {
  try {
    let { name, phone, orderData, paid, total } = req.body;
    const order = new Order({ name, phone, orderData, paid, total});
    const savedNote = await order.save();
    res.json(savedNote);
  } catch (err){
    res.status(500).json({ success: err});
  }
});

app.put('/edit/:id', async (req, res) => {
    let { name, phone, orderData, paid, total } = req.body;
    try {
        // Create a newNote object
        const newOrder = {};
        if (name) { newOrder.name = name };
        if (phone) { newOrder.phone = phone };
        if (orderData) { newOrder.orderData = orderData };
        if (paid) { newOrder.paid = paid };
        if (total) { newOrder.total = total };

        // Find the note to be updated and update it
        let order = await Order.findById(req.params.id);
        if (!order) { return res.status(404).send("Not Found") }
        note = await Order.findByIdAndUpdate(req.params.id, { $set: newOrder }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false});
    }
})
app.delete('/delete/:id', async (req, res) => {
  try {
      // Find the note to be delete and delete it
      let order = await Order.findById(req.params.id);
      if (!order) { return res.status(404).send("Not Found") }

      order = await Order.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", order: order });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
app.get('/fetchone/:id', async(req, res)=>{
  try{
    let order = await Order.findById(req.params.id);
  if(!order){return res.status(404).send('not found')}
  res.json(order)
  }catch(err){
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
})
app.listen(port, () => {console.log('started')});
