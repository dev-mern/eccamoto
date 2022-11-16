import React from 'react';
import dashSt from '../../../../styles/dashboard.module.css';
import { getTikMarkCompleteIcon } from '../../../utils/icons';

const ActivitySlip = ({slip,slipIdx}) => {
    
    return (
        <div className={dashSt.activity_slip} style={{backgroundColor: slipIdx%2 === 1 ? "#E5E4E2" : "#fff"}}>
            <div>{slip.updatedAt.split("T")[0]}</div>
            <div>{slip.trans_id}</div>
            <div>{getTikMarkCompleteIcon(15,15)} <span style={{marginLeft:"5px",textTransform:"capitalize"}}>{slip.type}</span></div>
            <div style={{textAlign:"right"}}>{slip.amount_usd.toFixed(2)}</div>
        </div>
    );
};

export default ActivitySlip;