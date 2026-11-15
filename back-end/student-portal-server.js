const express = require('express');
const cors = require('cors');
const RegisterRoute = require('./RegisterServer.js');
const port = 4000;
const app = express();
const bcrypt = require('bcrypt');
const pool = require('./db.js');
const StudentCard = require('./StudentCardServer.js');
const jwt = require('jsonwebtoken');
// const { use } = require('react');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.post('/login' , async (req , res)=>{
    try {
        // console.log('code starts here');
        const {admin , password} = req.body;
        const formattedAdmin = admin.trim();
        const isAdminValid = !formattedAdmin || !formattedAdmin.includes('/') || !/\d/.test(formattedAdmin);
        const isPasswordValid = !password || password.length < 3;


        if(isAdminValid || isPasswordValid){
            return res.status(400).send({message : 'ERROR IN CREDENTIALS'});            
        }
         const user = await pool.query(
            `SELECT * FROM STUDENT
            WHERE admission_number = $1`,
            [formattedAdmin]
        )

        if(user.rows.length === 0){
            return res.status(404).send({message  :'student not found'})
        }

        const token =  jwt.sign(
           {formattedAdmin},
           process.env.JWT_TOKEN,
           {expiresIn: '1hr'}
        );

        const getHashedPassword = user.rows[0].password;
        const comparePassword =await bcrypt.compare(password , getHashedPassword);
        if(comparePassword){
            return res.status(200).send({ 
            message: `student found ${user.rows[0].admission_number}`,
            student: user.rows[0],
            admin: formattedAdmin,
            token: token
        })
        }else{
            return res.status(400).send({message: 'password mismatch'});
        }

        return res.status(500).send({message: 'student not found'})
   
    
        
    } catch (error) {
        // console.log('catch block');
        // const {admin , password} = req.body
        // console.log(admin , password);
        return res.status(400).send({message : 'unable to send data' , error});
        
    }
});

app.use('/StudentCard' , StudentCard);

app.use('/Register' , RegisterRoute);


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