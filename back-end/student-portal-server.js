const express = require('express');
const cors = require('cors');
const port = 4000;
const app = express();
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.post('/' ,(req , res)=>{
    try {
        const {admin , password} = req.body;
        const isAdminValid = !admin || !admin.includes('/') || !/\d/.test(admin);
        const isPasswordValid = !password || password.length < 3;
        if(isAdminValid || isPasswordValid){
            return res.status(400).send({message : 'ERROR IN CREDENTIALS'});            
        }
        
        const user = await pool.query(
            'SELECT * FROM STUDENT WHERE ADMISSION_NUMER = $1',
            [admin]
        )
        
    } catch (error) {
        return res.status(404).send({message : 'unable to send data' , error});
        
    }
});

app.get('/' , async(req , res)=>{
    try {
        const {admin} = req.body;
        const user = await pool.query(
            'SELECT * FROM STUDENT WHERE ADMISSION_NUMER = $1',
            [admin]
        )
        return res.status(200).send(user.rows);
        
    } catch (error) {
        return res.status(400).send({message : 'unable to retrive data'});
        
    }

});


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