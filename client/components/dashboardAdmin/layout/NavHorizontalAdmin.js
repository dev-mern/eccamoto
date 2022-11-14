import { useRouter } from 'next/router';
import React from 'react';
import NavLink from 'next/link';
import adminLayoutST from "./layoutAdmin.module.css";

const hztlNavAdminDemo = [
    {name:"home",path:"/admin/dashboard/announcements"},
]

const NavHorizontalAdmin = ({hztlNavAdmin}) => {
    const router = useRouter();
    return (
        <nav className={adminLayoutST.hztlNavAd_container}>
            {
                hztlNavAdmin?.map(adminNavItem => <NavLink href={adminNavItem.path} key={adminNavItem.name} passHref={true} legacyBehavior>
                    <a 
                        className={
                            router.pathname === adminNavItem.path 
                            ? `${adminLayoutST.ad_sideNav_item} ${adminLayoutST.ad_sideNav_item_active}` 
                            : adminLayoutST.ad_sideNav_item
                        }
                        style={{
                            backgroundColor: router.pathname === adminNavItem.path  && "#045F5F",
                            padding:"8px 14px",
                            textTransform:"capitalize"
                        }}
                    >
                        {adminNavItem.name}
                    </a>
                </NavLink>)
            }
        </nav>
    );
};

export default NavHorizontalAdmin;