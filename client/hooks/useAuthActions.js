import React, { useEffect, useState } from 'react';
import { loggedInWithCredential } from '../fetcherServices/userServices';

const useAuthActions = () => {
    const [user,setUser] = useState({});
    const [userError,setuserError] = useState({});
    const [isUserLoading,setIsUserLoading] = useState(true);

    useEffect(()=>{
        // onAuthStateChanged, persist user from cookie, infuture, use localstorage as persistance
        const fetchUser = async()=>{
            setIsUserLoading(true);
            setuserError("");
            const user = await loggedInWithCredential();
            // console.log(user);
            if (user.status) {
                setUser(user.data);
                setuserError("");
            }else if (user.message) {
                setUser({})
                setuserError(user.message);
            }
            setIsUserLoading(false);
        }
        fetchUser();
    },[])


    return {
        user,
        setUser,
        isUserLoading,
        setIsUserLoading,
        userError,
        setuserError,
    }
};

export default useAuthActions;