import { useState , useEffect } from 'react';
import Navigation from './Navigation.jsx';
import './Studentinfostyle.css';
// import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
function StudentCard(){
    // const [image , setImage] = useState('/student-image.jpg');
    const[err , setErr] = useState('');
    const [student , setStudent] = useState('');

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('Token'));
        fetch('http://localhost:4000' , {
            "method" : 'POST',
            "headers" :{
                'Authorization' : `BEARER ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setStudent(data))
        .catch(error => setErr(error));
        console.log(student);
    }, [])

    // const location = useLocation();
    // const studentdata = location.state?.createdStudent || location.state?.student || {};
    // const studentdata = location.state?.student?.student || location.state?.createdStudent || location.state?.student || {};
    // console.log(studentdata);


    return(
        <>
        <div className = 'student-card'>
            {/* <img src={image} alt=""image of the student/> */}
            {/* <p>Student name - {student.stundent_name}</p> */}
            {/* <p>Course - {student.course}</p>
            <p>Fees payable - {studentdata.fees_payable}</p>
            <p>Intake - {studentdata.intake}</p>
            <p>Semester - {studentdata.semester}</p> */}

        </div>

        {
            err && <div>{err}</div>
        }
        </>
    )
}

export default StudentCard;