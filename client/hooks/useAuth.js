import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const useAuth = () => {
    const allAuthInfo = useContext(AuthContext)
    return allAuthInfo;
};

export default useAuth;