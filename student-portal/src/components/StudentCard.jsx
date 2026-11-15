import { useState , useEffect } from 'react';
import Navigation from './Navigation.jsx';
import './Studentinfostyle.css';
// import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
function StudentCard(){
    // const [image , setImage] = useState('/student-image.jpg');
    const[err , setErr] = useState('');
    const [student , setStudent] = useState({});

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('Token'));
        const admin = token.formattedAdmin;
        fetch('http://localhost:4000/StudentCard' , {
            "method" : 'POST',
            "headers" :{
                // 'Authorization' : `BEARER ${token}`
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify({
                admin
            })
        })
        .then(res => res.json())
        .then(data => setStudent(data))
        .catch(error => setErr(error));
        console.log(student);
    }, [])



    return(
        <>
        <div className = 'student-card'>
            {/* <img src={image} alt=""image of the student/> */}
            <p>Student name - {student.student_name}</p>
            {/* <p>Course - {}</p>
            <p>Fees payable - {}</p>
            <p>Intake - {}</p>
            <p>Semester - {}</p> */}

        </div>

        {/* {
            err && <div>{err}</div>
        } */}
        </>
    )
}

export default StudentCard;