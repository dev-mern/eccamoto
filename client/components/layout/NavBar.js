import React from 'react';
import layoutST from "./layout.module.css";
import NavLink from 'next/link';
import useAuth from '../../hooks/useAuth';
import { logOutByClearCookie } from '../../fetcherServices/userServices';

const navList = [
    {title:"Home",path:"/"},
    {title:"Dashboard",path:"/dashboard"},
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
        <nav className={layoutST.navbar}>
            <div>
                <h3 style={{margin:"0"}}>Survey Logo</h3>
            </div>
            <div className={layoutST.navitems}>
                {
                    navList.map(navItem => <NavLink href={navItem.path} legacyBehavior key={navItem.title}>
                        <a className={layoutST.navitem}>{navItem.title}</a>
                    </NavLink>)
                }
                {
                    user.user_id 
                    ?   <span className={layoutST.navitem} style={{cursor:"pointer",color:"orange"}} onClick={logOutHandler}>Logout ({user.name})</span>
                    :   <NavLink href={"/login"} legacyBehavior>
                            <a className={layoutST.navitem}>Login</a>
                        </NavLink>
                }
            </div>
        </nav>
    );
};

export default NavBar;