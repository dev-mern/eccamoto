import React, { useEffect } from 'react';
import dashST from '../../../../styles/dashboard.module.css';
import { getDollarBagIcon, getRightMarkCompleteIcon } from '../../../utils/icons';
import LoaderRound from '../../common/Loaders/LoaderRound/LoaderRound';

const ActivityToken = ({token,tokenIdx,isActivityLoading}) => {
    
    useEffect(()=>{
        // set token.number as o if it is undefined
        document.documentElement.style.setProperty(`--tokenNumberEnd_${tokenIdx+1}`,parseInt(token.number))
        document.documentElement.style.setProperty(`--tokenNumberStart_${tokenIdx+1}`,parseInt(token.number))
    },[dashST.tokenAnimation,token.number])
    


    return (
        <div className={`${dashST.activity_card}`}>
            <div className={dashST.activity_card_icon} style={{backgroundColor: token.bg}}>
                {token.icon}
            </div>
            <div className={dashST.activity_card_details}>
                {
                    !isActivityLoading.card
                    ?   <div className={`${dashST.activity_card_number}`}>
                            <span>{token.sign}</span>
                            <span className={`tokenAnimation_${tokenIdx+1}`}></span>
                            {
                                token.isFraction && token.number > 0 && <span className={dashST.token_fraction}>{(token.number - parseInt(token.number)).toFixed(3).slice(1,5)}</span>
                            }
                        </div>
                    : <LoaderRound></LoaderRound>
                }
                
                <div>
                    <p className={dashST.activity_card_title}>{token.title}</p>
                </div>
            </div>
        </div>
    );
};

export default ActivityToken;