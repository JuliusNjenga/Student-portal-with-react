import { Outlet , Navigate } from 'react-router-dom';
const ProtectiveRoutes = ()=>{
    const user = null;
    return user ? <Outlet /> : <Navigate to='/'/>
}

export default ProtectiveRoutes;