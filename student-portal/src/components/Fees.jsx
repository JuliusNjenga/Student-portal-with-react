import './Feesstyle.css';
import {useLocation} from 'react-router-dom';
function Fees(){
    // const studentdata = location.state?.student || location.state?.createdStudent ||{};
    // console.log(studentdata);
    return(
        <>
        <div className = 'fees'>
            <p>Total fees - </p>
            <p>Fees paid - </p>
            <p>Fees pending - </p>
            {/* <p>print fee sturcture - </p> */}


        </div>
        </>
    )
}

export default Fees;