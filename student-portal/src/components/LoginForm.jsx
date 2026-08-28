import { useState } from "react"
import {useNavigate} from 'react-router-dom';

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
      const data = await response.json();
      return data;
      
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
      <fieldset>
        <legend>STUDENT PORTAL</legend>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor = 'admin'>Admission Number : </label></td>
              <td><input type="text"
              onChange={handleData}
              id = 'admin'
              name = 'admin'
              value = {form.admin}
              placeholder="DIT/2025/40634"
               /></td>
            </tr>

            <tr>
              <td><label htmlFor = 'password'>Password : </label></td>
              <td><input type="password"
              onChange={handleData}
              name = 'password'
              value = {form.password}
              id='password'
              placeholder="123"
              required              
              /></td>
            </tr>

            <tr>
              <td><button type = 'submit' id= 'btn'>Login</button></td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    </form>

    {/* <p id='error'>{err}</p> */}

    {
      err && <div id = 'error'>{err}</div>
    }

    </>
  )
}

export default LoginForm;