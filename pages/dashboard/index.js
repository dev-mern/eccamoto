import React from 'react';
import PrivateRoute from '../../client/components/common/PrivateRoute';
import ViewAreaDashboard from '../../client/components/dashboard/DashHome/ViewAreaDashboard';
import LayoutDashboard from '../../client/components/dashboard/LayoutDashboard';

// dynamic imports 


const UserDashboard = () => {
    return (
        <PrivateRoute>
            <LayoutDashboard>
                <ViewAreaDashboard></ViewAreaDashboard>
            </LayoutDashboard>
        </PrivateRoute>
    );
};

export default UserDashboard;