const route = require('express');
const route = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db.js');
const route = express.Route();
const port  = 4000;
route.use(express());
route.post('/Register' , async(req , res)=>{
    try {
        const {name , registrationNo , password} = req.body;
        const validateCredentials = 
        name.trim() && name.length > 3 && !/\d/.test(name) && !/\W/.test(name)
        &&
        registrationNo.trim() && /\d/.test(registrationNo) && !/\W/.test(registrationNo) && registrationNo.includes('/')
        &&
        password.trim() && password.length > 3

        if(!validateCredentials){
            return res.status(400).send({message : 'Invalid credentials'});
        }
        const hashPassword = bcrypt.hash(password , 10);
        const insertStudent = await pool.query(
            `INSERT INTO STUDENT (REGISTRATIONNO HASHPASSWORD) VALUES = $1 , $2 RETURNING *`,
            [admission_number , password]
        )
        
    } catch (error) {
        console.error(`route register didnt run ${error}`);
        
    }

});
module.exports = route;