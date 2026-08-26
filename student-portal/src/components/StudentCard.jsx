import { useState } from 'react';
import Navigation from './Navigation.jsx';
import './Studentinfostyle.css';
// import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
function StudentCard(){
    const [image , setImage] = useState('/student-image.jpg');
    const[err , setErr] = useState('');

    const location = useLocation();
    const student = location.state?.student || {};
    console.log(student);


    return(
        <>
        <div className = 'student-card'>
            {/* <img src={image} alt=""image of the student/> */}
            <p>Student name - {student.name}</p>
            <p>Course - {student.course}</p>
            <p>Fees payable - {student.fees}</p>
            <p>Intake - {student.intake}</p>
            <p>Semester - {student.semester}</p>

        </div>

        {
            err && <div>{err}</div>
        }
        </>
    )
}

export default StudentCard;