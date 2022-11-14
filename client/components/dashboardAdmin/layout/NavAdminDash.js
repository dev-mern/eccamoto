import React from 'react';
import NavLink from 'next/link';
import adminLayoutST from "./layoutAdmin.module.css";
import { getAdminPannelIcon, getAnnouncementIcon, getHomeIcon } from '../../../utils/icons';
import { useRouter } from 'next/router';

const adminNavItems = [
    {name:"Home",path:"/admin/dashboard",icon: getHomeIcon(20,20)},
    {name:"Announce",path:"/admin/dashboard/announcements",icon: getAnnouncementIcon(20,20)},
]

const NavAdminDash = ({user}) => {
    const router =useRouter();
    return (
        <nav>
            <div className={adminLayoutST.ad_sideNav_logo}>
                <h1 style={{textAlign:"center"}}>Logo</h1>
            </div>
            <div className={adminLayoutST.ad_sideNav_items}>
                {
                    adminNavItems.map(adminNavItem => <NavLink href={adminNavItem.path} key={adminNavItem.name} passHref={true} legacyBehavior>
                        <a className={router.pathname === adminNavItem.path ? `${adminLayoutST.ad_sideNav_item} ${adminLayoutST.ad_sideNav_item_active}` : adminLayoutST.ad_sideNav_item}>
                            {adminNavItem.icon}
                            {adminNavItem.name}
                        </a>
                    </NavLink>)
                }
                <div>
                    <div>
                        <NavLink href={"/dashboard"} passHref={true} shallow={true} legacyBehavior>
                            <a className={`${adminLayoutST.ad_sideNav_item}`}>
                                <span>{getAdminPannelIcon(20,20)}</span>
                                <span>User Board</span>
                            </a>
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavAdminDash;