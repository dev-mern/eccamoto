import React from 'react';
import NavLink from 'next/link';
import dashST from "../../../styles/dashboard.module.css";


const ViewNavDashboard = ({user}) => {

    const viewNavList = [
        {name:"Home",path:"/"},
        {name: user.name ?? "Profile",path:""},
    ]
    
    return (
        <nav className={`${dashST.viewNav}`}>
            <div className={`${dashST.viewNav_brand}`}>Brand</div>
            <div style={{display:"flex"}}>
                {
                    viewNavList.map(navViewItem =><NavLink href={navViewItem.path} key={navViewItem.name} passHref={true} legacyBehavior>
                        <a className={`${dashST.navItem} ${dashST.navItem_hover}`} key={navViewItem.name} >
                            {/* <span>{dashNav.icon}</span> */}
                            <span>{navViewItem.name}</span>
                        </a>
                    </NavLink>)
                }
            </div>
        </nav>
    );
};

export default ViewNavDashboard;