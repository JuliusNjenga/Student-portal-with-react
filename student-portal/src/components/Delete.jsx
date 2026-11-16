import { useState } from "react";

function Delete(){
    const [form , Updateform] = useState({
        admin: '',
        password: '',
    });

    const handleChange = (e)=>{
        Updateform(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        } ))

    }

    const URL = 'http://localhost:4000/Delete';

    const Delete = async(e) =>{
        e.preventDefault();
        try {
            const response = await fetch(URL , {
            "method" : "DELETE",
            "headers" : {
                "Content-Type" : "application/json"
            },
            "body": JSON.stringify({
                admin : `${form.admin}`,
                password : `${form.password}`
            })
        })
        if(!response.ok){
            alert(`Error at response ${response.status}`);
        }
        const data = response.json();
        alert(`Student deleted ${data.message}`);
        Updateform({
            admin:'',
            password:''
        });
            
        } catch (error) {
            alert("Error at delete block");
            
        }
    }
    return(
        <>
        <form onSubmit={Delete}>
            <h2 style = {{marginTop: '0.2rem'}}>Sorry to see you leave!</h2>

            <label htmlFor="admin">Admission Number</label>
            <input type="text" 
            placeholder="DIT/2025/40634"
            value = {form.admin}
            onChange={handleChange}
            name = 'admin'
            id = "admin"
            /> <br /> <br />

            <label htmlFor="password">Password</label>
            <input type="password" 
            placeholder="****"
            value = {form.password}
            name = "password"
            id="password"
            onChange={handleChange}
            /> <br /> <br />

            <button type = 'submit'>Delete</button>
        </form>
        </>
    )
}

export default Delete;