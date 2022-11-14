import React from 'react';
import NavLink from 'next/link';
import dashNavST from "../../../styles/dashboard.module.css";
import { getActivityIcon, getAdminPannelIcon, getOverviewIcon, getReportIcon } from '../../utils/icons';
import { navigateWithLoadPage } from '../../utils/commonUtils';

const dashNavList = [
    {isLink: false,name:"Overview",path:"/dashboard",icon:getOverviewIcon(20,20)},
    {isLink: false,name:"Survey",path:"/dashboard/surveys",icon:getReportIcon(22,22)},
    {isLink: true,name:"Activities",path:"/dashboard/activities",icon:getActivityIcon(22,22)},
]

const SideNavDashboard = ({user}) => {
    
    return (
        <nav>
            <NavLink href={""} passHref={true} legacyBehavior>
                <a className={`${dashNavST.navItem} ${dashNavST.navItem_brand}`}>
                    <span>{getOverviewIcon(24,24)}</span>
                    <h2 style={{margin:0}}>Eccamoto</h2>
                </a>
            </NavLink>
            <hr style={{width:"90%",margin:"0 auto"}} />
            <div className={`${dashNavST.navItems}`}>
                <div>
                    {
                        dashNavList.map(dashNav => {
                            if (dashNav.isLink) {
                                return <NavLink href={dashNav.path} key={dashNav.name} passHref={true} shallow={true} legacyBehavior>
                                    <a className={`${dashNavST.navItem} ${dashNavST.navItem_hover}`} key={dashNav.name}>
                                        <span>{dashNav.icon}</span>
                                        <span>{dashNav.name}</span>
                                    </a>
                                </NavLink>
                            }else{
                                return <span  onClick={()=>navigateWithLoadPage(dashNav.path)} className={`${dashNavST.navItem} ${dashNavST.navItem_hover}`} key={dashNav.name}>
                                        <span>{dashNav.icon}</span>
                                        <span>{dashNav.name}</span>
                                    </span>
                            }
                        })
                    }
                </div>
                
                <div>
                    {
                        user.role === "admin" && <NavLink href={"/admin/dashboard"} passHref={true} shallow={true} legacyBehavior>
                            <a className={`${dashNavST.navItem} ${dashNavST.navItem_hover}`}>
                                <span>{getAdminPannelIcon(20,20)}</span>
                                <span>Admin Pannel</span>
                            </a>
                        </NavLink>
                    }
                </div>
            </div>
        </nav>
    );
};

export default SideNavDashboard;