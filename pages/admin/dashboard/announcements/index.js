import React from 'react';
import AdminProtectRoute from '../../../../client/components/common/AdminProtectRoute';
import LayoutAdmin from '../../../../client/components/dashboardAdmin/layout/LayoutAdmin';
import NavHorizontalAdmin from '../../../../client/components/dashboardAdmin/layout/NavHorizontalAdmin';

export const hztlNavAnnouncement = [
    {name:"Announcement",path:"/admin/dashboard/announcements"},
    {name:"notice",path:"/admin/dashboard/announcements/notice"},
]

const Announcements = () => {
    return (
        <AdminProtectRoute>
            <LayoutAdmin hztlNavAdmin={hztlNavAnnouncement}>
                <section>
                    <h1>Announce ement</h1>
                </section>
            </LayoutAdmin>
        </AdminProtectRoute>
    );
};

export default Announcements;