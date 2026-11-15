import { Outlet , Navigate } from 'react-router-dom';
const ProtectiveRoutes = ()=>{
    const token = localStorage.getItem('Token');
    // console.log(token);
    // const token = true;
    // const user = true;
    return token ? <Outlet /> : <Navigate to='/'/>
}

export default ProtectiveRoutes;