const cookieParser = require("cookie-parser");

const cors = require('cors');
const express = require("express");
require("dotenv").config();

const app = express();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie middleware
app.use(cookieParser())
app.use(cors());


const userRouter = require('./routes/userRoutes')
const weatherRouter = require('./routes/weatherRoutes')
const favoritesRouter = require('./routes/favoritesRoutes')

app.use('/api',userRouter)
app.use('/api',weatherRouter)
app.use('/api',favoritesRouter)

app.get('/api/hi',(req,res)=>{
res.status(200).json({message:"hiii"})
})



app.listen("3000", () => {
  console.log("listening port 3000");
});

