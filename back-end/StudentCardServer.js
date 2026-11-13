const express = require('express');
const port = 4000;
const route = express.Router();
route.get('/StudentCard' , (req , res)=>{
    try {
        

        
    } catch (error) {
        return res.status(500).send({message : `Error at /StudentCard ${error}`)
        
    }

});
// module.exports = route;