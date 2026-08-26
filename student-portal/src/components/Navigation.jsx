import { Link } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import './Navigationstyle.css';
function Navigation(){
    return(
        <>
        <div className ='toggle_menu'>
            <span></span>
            <span></span>
            <span></span>
        </div>
            <nav>
                <Link to = '/'>Home</Link>
                <Link to = '/studentcard'>Student Information</Link>
                <Link to='/fees'>Fees</Link>
                <Link to='/unitreg'>Unit registration</Link>
                <Link to ='/signout'>Sign out</Link>
            </nav>

        </>
    )
}

export default Navigation;