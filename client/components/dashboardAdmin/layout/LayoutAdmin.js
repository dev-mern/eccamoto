import React from 'react';
import useAuth from '../../../hooks/useAuth';
import adminLayoutST from "./layoutAdmin.module.css";
import NavAdminDash from './NavAdminDash';
import NavHorizontalAdmin from './NavHorizontalAdmin';

const LayoutAdmin = ({children,hztlNavAdmin}) => {
    const {user} = useAuth();
    return (
        <div className={adminLayoutST.adLayout_container}>
            <aside className={adminLayoutST.adLayout_sideNav_wrapper}>
                <NavAdminDash user={user}></NavAdminDash>
            </aside>
            <div className={adminLayoutST.adLayout_viewArea}>
                <div className={adminLayoutST.adLayout_viewArea_wrapper}>
                    <section>
                        <NavHorizontalAdmin hztlNavAdmin={hztlNavAdmin}></NavHorizontalAdmin>
                    </section>
                    <section className={adminLayoutST.adLayout_taskArea}>
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default LayoutAdmin;