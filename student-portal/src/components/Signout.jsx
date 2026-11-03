import {useNavigate} from 'react-router-dom';
function Signout(){
    const navigate = useNavigate();
      function handleClick(){
            localStorage.removeItem('Token');
            navigate('/');
        }
    return(
        <>
        <div style = {{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , flexDirection : 'column' , margin : '7rem'}}>
            <h1>Leaving so soon!</h1>
            <button onClick={handleClick}>Leave</button>
        </div>
        </>
    )

}
export default Signout;