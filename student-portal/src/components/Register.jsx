import { useState, useEffect } from "react";
import  './CssRegister.css';
import { useNavigate } from "react-router-dom";
function Register(){
    const [form , setForm] = useState({
        name : '',
        admin : '',
        course :'',
        password : ''
    });

    const [courses , setCourses] = useState([]);

    const [input , setInput] = useState('');

    const handleChange = (e)=>{
        setForm(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
    const navigate = useNavigate();

    const URL = 'http://localhost:4000/Register';

    useEffect(()=>{
        fetch(URL)
        .then(res => res.json())
        .then(data => setCourses(data.courses))
        .catch(error => alert(`Error at get useEffect get courses ${error}`))
    }, []);

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
                    course : `${form.course}`,
                    password : `${form.password}`
                })                
            });
            if(!response.ok){
                alert(`error at response ${response.status} ${response.message}`);
                return;
            }
            const sentData = await response.json();
            alert(`Succefully sent name ${form.name} admission number ${form.admin}`);
            console.log(sentData);
            navigate('/studentcard' , {state : {createdStudent : sentData.student}});
            setForm({
                name: '',
                admin:'',
                course : '',
                password:''
            });
            
        } catch (error) {
            alert('error');
            return;
            
        }
    }

    const handleCreate = (e)=>{
        e.preventDefault();
        const nameNoWhiteSpace = form.name.trim();
        const validateCredentials = 
        nameNoWhiteSpace && nameNoWhiteSpace.length >= 3 && /^[a-zA-Z\s]+$/.test(nameNoWhiteSpace)
        &&
        form.admin && /\d/.test(form.admin) && form.admin.includes('/')
        &&
        form.password && form.password.length >= 3;
        if(!validateCredentials){
            alert("error in credentials");
            setForm({
                name:'',
                admin:'',
                course : '',
                password:''
            })
            return;
        }
        createStudent();
        setForm({
            name : '',
            admin:'',
            course : '',
            password:''
        });
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

                    <select name = 'course' value = {form.course} onChange={handleChange}>
                        <option value ='' disabled selected>Select course</option>
                        {
                            courses.map((i , index)=>(
                                <option key = {index} value = {i.course_id}>{i.course_name}</option>
                            ))
                        }
                    </select>
                  <br /> <br />



                <label htmlFor="password">Password </label>
                <input type="password" 
                placeholder="***"
                name = 'password'
                id = "password"
                onChange={handleChange}
                value={form.password}
                required
                />  <br /> <br />
                <button type = 'submit'>Create</button>
        </form>
        </>
    )
}

export default Register;