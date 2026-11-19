const express = require('express');
const cors = require('cors');
const route = express.Router();
const pool = require('./db.js');
const bcrypt = require('bcrypt');
const port = 4000;

route.delete('/' , async(req , res)=>{
    try {
        const {admin , password} = req.body;
        const getUser = await pool.query(
            `SELECT s.*, sd.* FROM STUDENT s
            JOIN STUDENT_DETAILS sd ON s.student_id = sd.student_id
            WHERE ADMISSION_NUMBER = $1`,
            [admin]
        );
        if(getUser.rows.length === 0){
            return res.status(400).send({message : 'no student found'});
        }

        const getPassword = getUser.rows[0].password;
        const comparePassword = await bcrypt.compare(password , getPassword);
        if(!comparePassword){
            return res.status(400).send({message : 'password mismatch'});
        }
        const DeleteStudent = `DELETE FROM STUDENT WHERE STUDENT_ID = $1`;
        const Delete = await pool.query(DeleteStudent , [getUser.rows[0].student_id]);
        
        return res.status(200).send({ message: 'Student succefully deleted'})
        
    } catch (error) {
        console.log('error caught' , error)
        return res.status(500).send({message: 'Server /delete Error'});        
    }
});

module.exports = route;