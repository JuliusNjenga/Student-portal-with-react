const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db.js');
const route = express.Router();
const port  = 4000;
route.use(express.json());
route.use(cors());
route.post('/' , async(req , res)=>{
    try {
        const {name , admin, password} = req.body;
        const validateCredentials = 
        name && name.length > 3 && !/\d/.test(name) && !/\W/.test(name)
        &&
        admin && /\d/.test(admin) && /\W/.test(admin) && admin.includes('/')
        &&
        password && password.length > 3

        if(!validateCredentials){
            return res.status(400).send({message : 'Invalid credentials'});
        }
        const hashPassword = await bcrypt.hash(password , 10);
        const insertStudent = await pool.query(
            `INSERT INTO STUDENT (ADMISSION_NUMBER, PASSWORD) VALUES ($1 , $2) RETURNING *`,
            [admin , hashPassword]
        )
        return res.status(200).send({
            message : 'Succefully enrolled',
            student : insertStudent.rows[0]
        })
    } catch (error) {
        console.error(`route register didnt run ${error}`);
        
    }

});
module.exports = route;