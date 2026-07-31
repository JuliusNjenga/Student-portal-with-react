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
      }
      
    } catch (error) {
      setErr(`Error occured ${error}`);      
    }

  }

  async function GetData(){
    try {
      const response = await fetch(URL);
      if(!response.ok){
        setErr(`Error retrieving data ${response.status}`);
      }
      const data = await response.json();
      
    } catch (error) {
      setErr(`Error retrieving data${error}`);      
    }
  }

  return (
    <>
    <form onSubmit={(e) => {
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
        } else{
            navigate('/studentcard');
        }
        SendData();
        updateForm({
          admin: '',
          password: '',
        });
    }}>
      <fieldset>
        <legend>STUDENT PORTAL</legend>
        <table border={'2px solid black'}>
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
              <td style={{textAlign : 'center'}}><button type = 'submit'>Login</button></td>
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
