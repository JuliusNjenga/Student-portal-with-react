import { Outlet , Navigate } from 'react-router-dom';
const ProtectiveRoutes = ()=>{
    // const token = JSON.parse(localStorage.getItem('Token'));
    // console.log(token);
    // const token = true;
    const user = true;
    return user ? <Outlet /> : <Navigate to='/'/>
}

export default ProtectiveRoutes;