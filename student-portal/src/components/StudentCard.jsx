// localStorage.removeItem('Token');
import { useState , useEffect } from 'react';
import Navigation from './Navigation.jsx';
import './Studentinfostyle.css';
// import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
function StudentCard(){
    // const [image , setImage] = useState('/student-image.jpg');
    const[err , setErr] = useState('');
    const [student , setStudent] = useState({});

    // useEffect(()=>{
    //     const token = JSON.parse(localStorage.getItem('Token'));
    //     const admin = token.formattedAdmin;
    //     fetch(`http://localhost:4000/StudentCard/${encodeURIComponent(admin)}` , {
    //         "method" : 'GET'
    //     })
    //     .then(res => res.json())
    //     .then(data => setStudent(data))
    //     .catch(error => setErr(error));
    //     console.log(student);
    // }, [])

    useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
        // Decode the JWT payload (the middle part)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const admin = payload.formattedAdmin;

        fetch(`http://localhost:4000/StudentCard/${encodeURIComponent(admin)}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => setStudent(data))
        .catch(error => setErr(error));
    }
}, []);



    return(
        <>
        <div className = 'student-card'>
            {/* <img src={image} alt=""image of the student/> */}
            <p>Student name - {student.student_name}</p>
            <p>Course - {student.student_course}</p>
            <p>Fees payable - {student.student_fees}</p>
            <p>Intake - {student.student_intake}</p>
            <p>Semester - {student.student_semester}</p>

        </div>

        {/* {
            err && <div>{err}</div>
        } */}
        </>
    )
}

export default StudentCard;