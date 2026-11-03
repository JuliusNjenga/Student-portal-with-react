import { useState } from 'react';
import Navigation from './Navigation.jsx';
import './Studentinfostyle.css';
// import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
function StudentCard(){
    const [image , setImage] = useState('/student-image.jpg');
    const[err , setErr] = useState('');

    const location = useLocation();
    // const studentdata = location.state?.createdStudent || location.state?.student || {};
    const studentdata = location.state?.student?.student || location.state?.createdStudent || location.state?.student || {};
    // console.log(studentdata);


    return(
        <>
        <div className = 'student-card'>
            {/* <img src={image} alt=""image of the student/> */}
            <p>Student name - {studentdata.student_name}</p>
            <p>Course - {studentdata.course_id}</p>
            <p>Fees payable - {studentdata.fees_payable}</p>
            <p>Intake - {studentdata.intake}</p>
            <p>Semester - {studentdata.semester}</p>

        </div>

        {
            err && <div>{err}</div>
        }
        </>
    )
}

export default StudentCard;