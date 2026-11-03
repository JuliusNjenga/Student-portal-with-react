const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db.js');
const route = express.Router();
const port  = 4000;
const jwt = require('jsonwebtoken');
require('dotenv').config();
route.use(express.json());
route.use(cors());

route.get('/' , async(req, res)=>{
    try {
        const getCourses = await pool.query(
            `SELECT * FROM COURSES ORDER BY COURSE_NAME ASC`
        );
        return res.status(200).send({
            message: 'Successfully fetched',
            courses : getCourses.rows
        })
        
    } catch (error) {
        console.log(`Error at get /register`);
        return res.status(501).send({
            message: `Error at get /register`
        });
        
    }
});

route.post('/' , async(req , res)=>{
    try {
        const {name , course , admin, password} = req.body;
        const formattedName = name.trim();
        const validateCredentials = 
        formattedName && formattedName.length >= 3 && /^[a-zA-Z\s]+$/.test(formattedName)
        &&
        admin && /\d/.test(admin) && admin.includes('/')
        &&
        password && password.length >= 3

        if(!validateCredentials){
            return res.status(400).send({message : 'Invalid credentials'});
        }
        const hashPassword = await bcrypt.hash(password , 10);
        const token = await jwt.sign(
            {admin},
            process.env.JWT_TOKEN,
            {expiresIn : '1hr'}
        )
        
        const insertStudent = await pool.query(
            `INSERT INTO STUDENT (ADMISSION_NUMBER, PASSWORD) VALUES ($1 , $2) RETURNING *`,
            [admin , hashPassword]
        );

        
        // const insertName = await pool.query(
        //     `INSERT INTO STUDENT_DETAILS (STUDENT_NAME) VALUES($1)`,
        //     [name]
            
        // );
        // const insertCourse = await pool.query(
        //     `INSERT INTO COURSES(COURSE_NAME) VALUES($1)`,
        //     [course]
        // )
        const student_id = insertStudent.rows[0].student_id;
        const student_details_table = await pool.query(`
            INSERT INTO STUDENT_DETAILS(STUDENT_ID ,STUDENT_NAME , COURSE_ID) VALUES($1 , $2 , $3) RETURNING *`,
            [student_id ,formattedName , course]
        )
        return res.status(200).send({
            message : 'Succefully enrolled',
            student : {
                student_name : formattedName,
                course : course,
                // name: formattedName,
                fees_payable: student_details_table.rows[0].fees_payable,
                semester : student_details_table.rows[0].semester,
                intake : student_details_table.rows[0].intake,
                admission_number : admin
            }
        })
    } catch (error) {
        console.error(`route register didnt run ${error}`);
        
    }

});

module.exports = route;