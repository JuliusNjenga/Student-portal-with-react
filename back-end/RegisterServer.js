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
        const formattedadmin = admin.toUpperCase();
        const validateCredentials = 
        name && formattedName.length >= 3 && /^[a-zA-Z\s]+$/.test(name)
        &&
        formattedadmin && /\d/.test(formattedadmin) && formattedadmin.includes('/')
        &&
        password && password.length >= 3

        if(!validateCredentials){
            return res.status(400).send({message : 'Invalid credentials'});
        }
        const hashPassword = await bcrypt.hash(password , 10);
        const insertStudent = await pool.query(
            `INSERT INTO STUDENT (ADMISSION_NUMBER, PASSWORD) VALUES ($1 , $2) RETURNING *`,
            [formattedadmin , hashPassword]
        );
        const student_id = insertStudent.rows[0].student_id;
        await pool.query(`
            INSERT INTO STUDENT_DETAILS(STUDENT_ID ,STUDENT_NAME) VALUES($1 , $2)`,
            [student_id ,name]
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