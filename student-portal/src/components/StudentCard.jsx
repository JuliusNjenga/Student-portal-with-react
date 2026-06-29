import { useState } from 'react';
import Navigation from './Navigation.jsx';
import './Studentinfostyle.css';
function StudentCard({name , course , fees, intake, semester}){
    const [image , setImage] = useState('/student-image.jpg')
    return(
        <>
        <div className = 'student-card'>
            <img src={image} alt=""image of the student/>
            <p>Student name - {name}</p>
            <p>Course - {course}</p>
            <p>Fees payable - {fees}</p>
            <p>Intake - {intake}</p>
            <p>Semester - {semester}</p>

        </div>
        </>
    )
}

export default StudentCard;