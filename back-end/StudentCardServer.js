const express = require('express');
const port = 4000;
const pool = require('./db.js');
const route = express.Router();
route.get('/:admin' , async(req , res)=>{
    try {
        const {admin} = req.params;
        const user = await pool.query(
            `SELECT s.*, sd.*, c.* FROM STUDENT s
            JOIN STUDENT_DETAILS sd ON s.student_id = sd.student_id
            JOIN COURSES c ON sd.course_id = c.course_id
            WHERE ADMISSION_NUMBER = $1`,
            [admin]
        );

        if(user.rows.length === 0){
            return res.status(401).send({message: 'Student not found'});
        }

        const studentData = user.rows[0];

         return res.status(200).send({
            message: 'success',
            student_name : studentData.student_name,
            student_intake : studentData.intake,
            student_semester : studentData.semester,
            student_fees : studentData.fees_payable,
            student_course : studentData.course_name

         })


        
    } catch (error) {
        return res.status(500).send({message : `Error at /StudentCard ${error}`})
        
    }

});
module.exports = route;