import { useState } from 'react';
import Navigation from './Navigation.jsx';
import './Studentinfostyle.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
function StudentCard({name , course , fees, intake, semester}){
    const [image , setImage] = useState('/student-image.jpg');
    const[err , setErr] = useState('');

    const location = useLocation();
    const student = location.state?.student || {};
    console.log(student);

    // useEffect(()=>{
    //   console.log(success);
    // },[success]);

    async function GetData(){
    try {
      const response = await fetch(URL);
      if(!response.ok){
        setErr(`Error retrieving data ${response.status}`);
      }
      const data = await response.json();
      name = data.name;
      course = data.course;
      
    } catch (error) {
      setErr(`Error retrieving data${error}`);      
    }
  }


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
            err && <div>{error}</div>
        }
        </>
    )
}

export default StudentCard;