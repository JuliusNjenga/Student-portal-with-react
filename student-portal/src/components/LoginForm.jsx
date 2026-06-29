import { useState } from "react"
import {useNavigate} from 'react-router-dom';
function LoginForm() {
    const navigate = useNavigate();
  const [form , updateForm] = useState({
    admin : '',
    password : ''
  });

  const handleData = (e)=> {
    updateForm((prev) => ({
        ...prev,
        [e.target.name] : e.target.value
    }))
  }

  const handleClick = () =>{
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
               /></td>
            </tr>

            <tr>
              <td><label htmlFor = 'password'>Password : </label></td>
              <td><input type="password"
              onChange={handleData}
              name = 'password'
              value = {form.password}
              id='password'
              required              
              /></td>
            </tr>

            <tr>
              <td style={{textAlign : 'center'}}><button type = 'submit' onClick={handleClick}>Login</button></td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    </form>
    </>
  )
}

export default LoginForm;
