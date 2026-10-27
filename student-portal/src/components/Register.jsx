import { useState } from "react";
import  './CssRegister.css';
function Register(){
    const [form , setForm] = useState({
        name : '',
        registrationNo : '',
        passowrd : ''
    })

    const [input , setInput] = useState('');

    const handleChange = (e)=>{
        setForm(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const URL = 'https://localhost:4000/register';
    const createStudent = async() =>{
        try {
            const response = await fetch(URL,{
                'method': 'POST',
                'headers':{
                    'Content-Type' : 'application/json'
                },
                'body':JSON.stringify({
                    name : `${form.name}`,
                    registrationNo : `${form.registrationNo}`,
                    passowrd : `${form.passowrd}`
                })                
            });
            if(!response.ok){
                alert("error at resp");
            }
            const sentData = await response.json();
            alert(`Succefully sent ${sentData}`);
            setInput('');
            
        } catch (error) {
            alert('error');
            
        }
    }

    const handleCreate = (e)=>{
        e.preventDefault();
        createStudent();
    }


    return(
        <>
        <form onSubmit={handleCreate}>
            {/* <fieldset style ={{borderRadius : '0.7rem' , padding : '1.7rem', margin : '0.7rem'}}> */}
                {/* <legend>Register new student</legend> */}
                <label htmlFor="name">Name </label>
                <input type="text"
                name = "name"
                value = {form.name}
                placeholder="Julius"
                onChange={handleChange}
                id = 'name'
                 /> <br /> <br />

                <label htmlFor="reg">Registration Number </label>
                <input type="text"
                name = 'registrationNo'
                value = {setForm.registrationNo}
                placeholder="DIT/2025/40634"
                onChange={handleChange}
                id = "reg"
                 /> <br /> <br />

                <label htmlFor="password">Password </label>
                <input type="password" 
                placeholder="***"
                name = 'password'
                id = "password"
                onChange={handleChange}
                value={setForm.passowrd}
                />  <br /> <br />
                <button type = 'submit'>Create</button>
            {/* </fieldset> */}
        </form>
        </>
    )
}

export default Register;