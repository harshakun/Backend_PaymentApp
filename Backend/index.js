const express=require('express');
const app=express();
const cors=require('cors');

app.use(express.json());
app.use(cors());
const mainrouter=require('./routes/index');



app.use("/api/v1",mainrouter);


app.listen(3000);