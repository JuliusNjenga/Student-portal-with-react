const express = require('express');
const cors = require('cors');
const port = 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.post('/' , (req , res)=>{
    res.json({message : 'data recieved'});
    console.log(`we recieved admission number : ${req.body.admin} password ${req.body.password}`);

})

const server = app.listen(port , ()=>{
    console.log('SERVER RUNNIG A PORT : '  ,port);
})

server.on('error' , (err)=>{
    if(err.code === 'EADDRINUSE'){
        console.error(`PORT ${port} IS ALREADY IN USE err.message`);
    } else{
        console.error('SERVER ERROR');
    }
})