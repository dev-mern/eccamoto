import { useRouter } from 'next/router';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import LoaderTriangle from './Loaders/LoaderTriangle/LoaderTriangle';

const AdminProtectRoute = ({children}) => {
    const {user,isUserLoading} = useAuth();
    const router = useRouter();
    
    if (isUserLoading) {
        return <div style={{width:"100vw", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}><LoaderTriangle /></div>
    }
    
    if (!isUserLoading && !user.user_id) {
        router.push("/login")
    }

    if (user.user_id && user.role === 'admin') {
        return children;
    }
    if (user.user_id && user.role === 'user') {
        router.push("/dashboard")
    }
};

export default AdminProtectRoute;