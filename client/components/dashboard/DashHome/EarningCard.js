import React from 'react';
import dashST from "../../../../styles/dashboard.module.css";

const EarningCard = ({card}) => {
    return (
        <div className={dashST.earning_card}>
            <div className={dashST.earning_card_title}>
                <h3>Earnings</h3>
            </div>
            <h1 className={dashST.earning_card_amount}>${card?.total_amount?.toFixed(3) ?? 0}</h1>
            <p className={dashST.earning_card_text}>When you reach 10 USD you can cash out your earnings</p>
        </div>
    );
};

export default EarningCard;