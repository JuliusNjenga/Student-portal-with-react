const express = require('express');
const cors = require('cors');
const port = 4000;
const app = express();
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.post('/' , async (req , res)=>{
    try {
        const {admin , password} = req.body;
        const isAdminValid = !admin || !admin.includes('/') || !/\d/.test(admin);
        const isPasswordValid = !password || password.length < 3;
        if(isAdminValid || isPasswordValid){
            return res.status(400).send({message : 'ERROR IN CREDENTIALS'});            
        }
        
        const user = await pool.query(
            // 'SELECT * FROM STUDENT WHERE ADMISSION_NUMBER = $1',
            // [admin]

            `SELECT s.id, s.admission_number, s.password, 
                    d.student_name AS name, d.course, d.fees_payable AS fees, d.intake, d.semester 
             FROM student s
             JOIN student_details d ON s.id = d.student_id
             WHERE s.admission_number = $1`, 
            [admin]
        )

        if(user.rows.length === 0){
            return res.status(404).send({message  :'student not found'})
        }
        
        const student = user.rows[0];
        res.status(200).send(student);
        
    } catch (error) {
        return res.status(404).send({message : 'unable to send data' , error});
        
    }
});

// app.get('/studentcard' , async(req , res)=>{
//     try {
//         const {admin} = req.body;
//         const user = await pool.query(
//             'SELECT * FROM STUDENT WHERE ADMISSION_NUMER = $1',
//             [admin]
//         )
//         return res.status(200).send(user.rows);
        
//     } catch (error) {
//         return res.status(400).send({message : 'unable to retrive data'});
        
//     }

// });

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