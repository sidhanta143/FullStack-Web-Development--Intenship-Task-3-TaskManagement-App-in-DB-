
const express=require('express');
const app=express();
require('dotenv').config();
require('./models/db');
 const PORT=process.env.PORT ||3000;
const cors=require('cors');
 const TaskRouter=require('./Routes/TaskRouter');
 
const bodyParser = require('body-parser');
app.get('/',(req,res)=>{
   res.send("hello sidhanta");
    
});

app.use(cors());
app.use(bodyParser.json());
app.use('/tasks',TaskRouter);

app.listen(PORT,()=>{
    console.log(`The server is running on: http://localhost:${PORT}`);
    
})