import { useRouter } from 'next/router';
import React from 'react';
import useAuth from '../../hooks/useAuth';

const AdminProtectRoute = ({children}) => {
    const {user,isUserLoading} = useAuth();
    const router = useRouter();
    
    if (isUserLoading) {
        return <p>Loading...........</p>
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