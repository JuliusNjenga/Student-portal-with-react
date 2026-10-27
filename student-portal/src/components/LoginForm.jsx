import { useState } from "react"
import {useNavigate} from 'react-router-dom';
import './CssLoginForm.css';

function LoginForm() {
  const navigate = useNavigate();
  const [form , updateForm] = useState({
    admin : '',
    password : ''
  });
  const [err , setErr] = useState('');

  const handleData = (e)=> {
    updateForm((prev) => ({
        ...prev,
        [e.target.name] : e.target.value
    }))
  }

  const URL = 'http://localhost:4000';

  async function SendData(){
    try {
      const response = await fetch(URL , {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          admin : `${form.admin.toUpperCase()}`,
          password : `${form.password}`

        })
      });
      if(!response.ok){
        setErr(`ERROR OCCURED AT RESPONSE! ${response.status}`);
        return false;
      }
      const student = await response.json();
      return student;
      
    } catch (error) {
      setErr(`Error occured ${error}`);  
      return false;
    }

  }

  return (
    <>
    <form onSubmit={async(e) => {
        e.preventDefault();
        if(!form.admin.toUpperCase() || !form.admin.includes('/') || !/\d/.test(form.admin)){
            setErr("Invalid Admission Number");
            updateForm({
          admin: '',
          password: ''
        });
            return;
        } else if(!form.password || form.password.length < 3){
            setErr('Invalid password');
            updateForm({
          admin: '',
          password: '',
        });
            return;
        }
        const success = await SendData();
        if(success){
          navigate('/studentcard' , {state : {student : success}});
          
        }
        updateForm({
          admin: '',
          password: '',
        });
    }}>
      {/* <fieldset style ={{borderRadius : '0.7rem' , padding : '1.7rem', margin : '0.7rem'}}>  */}
        {/* <legend>Login here</legend> */}
          <div className="form_items">
              <label htmlFor = 'admin'>Admission Number </label>
              <input type="text"
              onChange={handleData}
              id = 'admin'
              name = 'admin'
              value = {form.admin}
              placeholder="DIT/2025/40634"
               /> <br /> <br />
            
              <label htmlFor = 'password'>Password </label>
              <input type="password"
              onChange={handleData}
              name = 'password'
              value = {form.password}
              id='password'
              placeholder="***"
              required              
              /> <br /> <br />
            </div>
            
              <button type = 'submit' id= 'btn'>Login</button>

      {/* </fieldset> */}
    </form>

    {/* <p id='error'>{err}</p> */}

    {
      err && <div id = 'error'>{err}</div>
    }

    </>
  )
}

export default LoginForm;