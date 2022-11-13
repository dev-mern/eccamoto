import React from 'react';
import NavLink from 'next/link';
import useAuth from '../../hooks/useAuth';
import { logOutByClearCookie } from '../../fetcherServices/userServices';

const navList = [
    {title:"Home",path:"/"},
    {title:"About",path:"/about"},
    {title:"Dashboard",path:"/dashboard"},
    {title:"Survey",path:"/survey"},
]

const NavBar = () => {
    const {user, setUser,isUserLoading,} = useAuth();
    const logOutHandler = async() =>{
        const logoutRes = await logOutByClearCookie();
        if (logoutRes.status) {
            setUser({})
        }
    }
    return (
        <nav style={{display:"flex", justifyContent:"space-between", padding:"20px auto"}}>
            <div>
                <h3>Survey Logo</h3>
            </div>
            <div style={{}}>
                {
                    navList.map(navItem => <NavLink href={navItem.path} legacyBehavior key={navItem.title}>
                        <a style={{background:"skyblue",padding:"5px 14px",margin:"10px 2px",}}>{navItem.title}</a>
                    </NavLink>)
                }
                {
                    user.user_id 
                    ?   <button onClick={logOutHandler}>Logout ({user.name})</button>
                    :   <NavLink href={"/login"} legacyBehavior>
                            <a style={{background:"skyblue",padding:"5px 14px",margin:"10px 2px",}}>Login</a>
                        </NavLink>
                }
            </div>
        </nav>
    );
};

export default NavBar;