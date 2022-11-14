import React from 'react';
import AdminProtectRoute from '../../../client/components/common/AdminProtectRoute';
import LayoutAdmin from '../../../client/components/dashboardAdmin/layout/LayoutAdmin';


const hztlNavHome = [
    {name:"Overview",path:"/admin/dashboard"},
]


const AdminDashboard = () => {
    // theam color: rgb(40,46,56)
    // card them bg: #313844
    return (
        <AdminProtectRoute>
            <LayoutAdmin hztlNavAdmin={hztlNavHome}>
                <h1>Admin Dashboard Home</h1>
            </LayoutAdmin>
        </AdminProtectRoute>
    );
};

export default AdminDashboard;



