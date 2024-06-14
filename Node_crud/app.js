const express = require('express');
const app = express();
const PORT =  3003;
const mongoose=require('mongoose');
// const dotenv = require('dotenv');
const userRoutes=require("./routes/user-route");
var cors =require("cors");

app.use(cors());
app.use(express.json());
// dotenv.config();

app.get('/', (req, res) => {
  res.send('running')
})

app.use(userRoutes);


async function connectDb(){
  await mongoose.connect("mongodb://localhost:27017",{
    dbNAme:"UsersDb",
  });
}
connectDb().catch((err)=>console.error(err))


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})