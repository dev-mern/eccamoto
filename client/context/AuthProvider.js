import React from 'react';
import useAuthActions from '../hooks/useAuthActions';

export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
    const allUserInfo = useAuthActions();
    return (
        <AuthContext.Provider value={allUserInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;