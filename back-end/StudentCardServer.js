const express = require('express');
const port = 4000;
const route = express.Router();
route.get('/' , async(req , res)=>{
    try {
        const {admin} = req.params;
        const user = await pool.query(
            `SELECT s.student_id ,s.admission_number, s.password FROM STUDENT s
            JOIN STUDENT_DETAILS sd ON s.student_id = sd.student_id
            JOIN COURSES c ON sd.course_id = c.course_id
            WHERE admission_number = $1`,
            [admin]
        );

        if(user.rows.length === 0){
            return res.status(401).send({message: 'Student not found'});
        }
         return res.status(200).send({
            message: 'success',
            student: user.rows[0]
         })


        
    } catch (error) {
        return res.status(500).send({message : `Error at /StudentCard ${error}`})
        
    }

});
module.exports = route;