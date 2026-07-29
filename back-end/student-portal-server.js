const express = require('express');
const cors = require('cors');
const port = 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.post('/' , async(req , res)=>{
    try {
        const {adimn , password} = req.body;
        const isAdminValid = admin && admin.includes('/') && /\d/.test(admin);
        const isPasswordValid = passowrd && password.length > 3;
        if(isAdminValid || isPasswordValid){
            
        }

        
    } catch (error) {
        return res.status(404).send({message : 'unable to send data' , error});
        
    }
    

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