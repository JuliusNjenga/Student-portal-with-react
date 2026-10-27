import { useState } from "react";
import  './CssRegister.css';
function Register(){
    const [form , setForm] = useState({
        name : '',
        admin : '',
        password : ''
    })

    const [input , setInput] = useState('');

    const handleChange = (e)=>{
        setForm(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const URL = 'http://localhost:4000/Register';
    const createStudent = async() =>{
        try {
            const response = await fetch(URL,{
                'method': 'POST',
                'headers':{
                    'Content-Type' : 'application/json'
                },
                'body':JSON.stringify({
                    name : `${form.name}`,
                    admin : `${form.admin}`,
                    password : `${form.password}`
                })                
            });
            if(!response.ok){
                alert(`error at response ${response.status} ${response.message}`);
            }
            const sentData = await response.json();
            alert(`Succefully sent name ${form.name} admission number ${form.admin}`);
            console.log(sentData);
            setForm({
                name: '',
                admin:'',
                password:''
            })
            
        } catch (error) {
            alert('error');
            
        }
    }

    const handleCreate = (e)=>{
        e.preventDefault();
        const validateCredentials = 
        form.name.trim() && form.name.length >= 3 && !/\d/.test(form.name) && !/\W/.test(form.name)
        &&
        form.admin.trim() && /\d/.test(form.admin) && /\W/.test(form.admin) && form.admin.includes('/')
        &&
        form.password.trim() && form.password.length >= 3;
        if(!validateCredentials){
            alert("error in credentials");
            setForm({
                name:'',
                admin:'',
                password:''
            })
            return;
        }
        createStudent();
        setForm({
            name : '',
            admin:'',
            password:''
        })
    }


    return(
        <>
        <form onSubmit={handleCreate}>
                <label htmlFor="name">Name </label>
                <input type="text"
                name = "name"
                value = {form.name}
                placeholder="Julius"
                onChange={handleChange}
                id = 'name'
                 /> <br /> <br />

                <label htmlFor="reg">Admission Number </label>
                <input type="text"
                name = 'admin'
                value = {form.admin}
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
                value={form.password}
                />  <br /> <br />
                <button type = 'submit'>Create</button>
        </form>
        </>
    )
}

export default Register;