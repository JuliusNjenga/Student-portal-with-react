import { Outlet , Navigate } from 'react-router-dom';
const ProtectiveRoutes = ()=>{
    const token = localStorage.getItem('Token');
    const user = true;
    return user ? <Outlet /> : <Navigate to='/'/>
}

export default ProtectiveRoutes;