import { use, useState } from "react"
import {useNavigate} from 'react-router-dom';
function LoginForm() {
  const navigate = useNavigate();
  const [form , updateForm] = useState({
    admin : '',
    password : ''
  });
  const [err , setErr] = useState('')

  const handleData = (e)=> {
    updateForm((prev) => ({
        ...prev,
        [e.target.name] : e.target.value
    }))
  }

  const handleClick = (e) =>{
    e.preventDefault();
        if(!form.admin.includes('/')){
            alert("Invalid Admission Number");
            updateForm({
          admin: '',
          password:''
        });
            return;
        } else if(form.password < 3){
            alert('Invalid password');
            updateForm({
              admin:'',
          password: '',
        });
            return;
        } else{
            navigate('/student');
        }
  }

  async function SendData(){
    try {
      const URL = 'http://localhost:4000';
      const response = await fetch(URL , {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          admin : `${form.admin}`,
          password : `${form.password}`

        })
      });
      if(!response.ok){
        setErr('ERROR OCCURED AT RESPONSE!');
      }
      const data = await response.json();
      setErr(data);
      
    } catch (error) {
      setErr(`Error occured ${error}`);
      
    }

  }

  return (
    <>
    <form onSubmit={(e) => {
        e.preventDefault();
        if(!form.admin.includes('/')){
            alert("Invalid Admission Number");
            updateForm({
          admin: '',
          password: ''
        });
            return;
        } else if(form.password < 3){
            alert('Invalid password');
            updateForm({
          admin: '',
          password: '',
        });
            return;
        } else{
            navigate('/student');
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
              <td style={{textAlign : 'center'}} onClick={SendData}><button type = 'submit' onClick={handleClick}>Login</button></td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    </form>

    <p>errro here :{err}</p>
    </>
  )
}

export default LoginForm;
