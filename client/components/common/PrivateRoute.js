import { useRouter } from 'next/router';
import React from 'react';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({children}) => {
    const {user,isUserLoading} = useAuth();
    const router = useRouter();

    if (isUserLoading) {
        return <p>Loading...........</p>
    }
    
    if (!isUserLoading && !user.user_id) {
        router.push("/login")
    }

    if (user.user_id) {
        return children;
    }

};

export default PrivateRoute;