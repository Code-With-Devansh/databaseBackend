
const express = require("express");
const fs = require("fs/promises");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.post("/save", async (req, res) => {
  
  })
app.post("/save", async (req, res) => {
  try{
  let D = new Date();
  fileName = D.toLocaleTimeString().replaceAll(":", "-");
  val = await fs.readdir("orderData");
  let date = D.toLocaleDateString().replaceAll("/", "-");
  if (val.indexOf(date) == -1) {
    fs.mkdir(`orderData/${date}`);
  }
  await fs.appendFile(`orderData/${date}/${fileName}.txt`, JSON.stringify(req.body));
  res.json({success: true})
}
catch{
  res.status(500).json({success: false})
}
});
app.get('/prevorders', async(req, res)=>{
  let D = new Date();
  let date = D.toLocaleDateString().replaceAll("/", "-");
  try{
  allFiles = await fs.readdir(`orderData/${date}`)
  arr = []
  for(let i = 0; i<allFiles.length; i++){
      data = await fs.readFile(`orderData/${date}/${allFiles[i]}`, 'utf-8')
      data = JSON.parse(data)
      let {name, total, paid} = data
      arr.push({name, total, paid, id: `${date}/${allFiles[i]}`})
  }
  res.json({data: arr})
    }
    catch{
      res.json({data:[]})
    }
})
app.post('/edit', async(req, res)=>{
  try{
  file = await fs.readFile(`orderData/${req.body.id}`)
  original = JSON.parse(file)
  newdat = req.body.data
  fs.writeFile(`orderData/${req.body.id}`, JSON.stringify({...original, ...newdat}))
  res.json({success: true})
  }
  catch{
    res.status(500).json({success: false})
  }
})
app.get('/reset', async(req, res)=>{
  try{
  files = await fs.readdir('orderData')
  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    await fs.rm(`orderData/${element}`, { recursive: true, force: true })
  }
  res.json({success: true})
  }
  catch{
    res.status(500).json({success: false})
  }
})

app.listen(port, () => {
});