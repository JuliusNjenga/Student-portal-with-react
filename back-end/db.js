const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database : 'STUDENT-PORTAL',
    password: 'Kenyaleo2020'
})
pool.on('error' , (err) =>{
    return res.status(404).send({message : 'ERROR ON CREATING POOL MODULE'});
})

module.exports = pool;