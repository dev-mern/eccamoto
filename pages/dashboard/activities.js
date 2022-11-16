import { valueSetter } from 'dev-reactils';
import React, { useEffect, useState } from 'react';
import LoaderRound from '../../client/components/common/Loaders/LoaderRound/LoaderRound';
import PrivateRoute from '../../client/components/common/PrivateRoute';
import ActivitySlip from '../../client/components/dashboard/Activities/ActivitySlip';
import ActivityToken from '../../client/components/dashboard/Activities/ActivityToken';
import LayoutDashboard from '../../client/components/dashboard/LayoutDashboard';
import { fetchASummaryCard } from '../../client/fetcherServices/cardService';
import { fetchSlipList } from '../../client/fetcherServices/slipsServices';
import useAuth from '../../client/hooks/useAuth';
import { getDollarBagIcon, getRightMarkCompleteIcon } from '../../client/utils/icons';
import dashSt from "../../styles/dashboard.module.css";

const defaultTokens = [
    {title:"Completed surveys", number: 0, bg:"#F0E68C", icon: getRightMarkCompleteIcon(70,70), type:"survey",sign:"",isFraction:false},
    {title:"Total earnings", number: 0, bg:"#B0C4DE", icon: getDollarBagIcon(70,70), type:"earning", sign:"$",isFraction:true},
]

const Activities = () => {
    const {user} = useAuth();
    const [tokens,setTokens] = useState(defaultTokens);
    const [surveySlips,setSurveySlips] = useState([]);
    const [summaryCard,setSummaryCard] = useState({});
    const [isActivityLoading,setIsActivityLoading] = useState({card:true,slip:true});


    useEffect(()=>{
        if (user.user_id) {
            // total earning card
            const getSummaryCard = async() =>{
                valueSetter(setIsActivityLoading,true,'card');
                const summaryCardRes = await fetchASummaryCard(user.user_id);
                if (!summaryCardRes.error && summaryCardRes.data) {
                    setSummaryCard(summaryCardRes.data);
                    valueSetter(setIsActivityLoading,false,'card');
                }
            }
            // list of all servey slips by user id
            const getSlipsByUserID = async() =>{
                valueSetter(setIsActivityLoading,true,'slip');
                const slipsRes = await fetchSlipList(`user_id=${user.user_id}`);
                if (!slipsRes.error && slipsRes.data) {
                    // sort the data by updated date
                    const sortedData = slipsRes.data?.sort((a,b)=>(new Date(b.updatedAt) - new Date(a.updatedAt)));
                    console.log(sortedData,"SORTED");
                    setSurveySlips(slipsRes.data);
                    valueSetter(setIsActivityLoading,false,'slip');
                }
                await getSummaryCard();  // after finishing this task, call to get get summery card one-by-one
            }
            getSlipsByUserID();
            
            
        }
    },[user.user_id])

    useEffect(()=>{
        if (tokens.length && surveySlips.length) {
            const newTokens = tokens.map(tokenEl =>{
                if (tokenEl.type === "survey") {
                    tokenEl.number = surveySlips.filter(survey => survey.type === "complete").length;
                }else if (tokenEl.type === "earning") {
                    tokenEl.number = summaryCard.total_amount;
                }
                return tokenEl;
            })
            setTokens(newTokens);
        }
    },[surveySlips.length,summaryCard])
    
    console.log(surveySlips);

    return (
        <PrivateRoute>
            <LayoutDashboard>
                <div className={dashSt.activity_tokens}>
                    {
                        tokens?.map((token,tokenIdx) =><ActivityToken token={token} tokenIdx={tokenIdx} isActivityLoading={isActivityLoading} key={token.title}></ActivityToken>)
                    }
                </div>
                <div className={dashSt.activity_ad_container}>
                    <div className={dashSt.activity_slips_container}>
                        <div className={dashSt.slips_title_wrapper}>
                            <h3 className={dashSt.slips_title}>All activities</h3>
                        </div>
                        <div className={`${dashSt.activity_slip} ${dashSt.activity_slips_head}`}>
                            <div>Date</div>
                            <div>Transaction ID</div>
                            <div>Action</div>
                            <div style={{textAlign:"right"}}>Earn($)</div>
                        </div>
                        <div>
                            {
                                !isActivityLoading.slip 
                                ?    <div>
                                        {
                                            surveySlips?.map((slip,slipIdx) => <ActivitySlip slip={slip} slipIdx={slipIdx} key={`slip._id_${slipIdx}`}></ActivitySlip>)
                                        }
                                    </div>
                                : <div style={{display:"flex",justifyContent:"center",alignItems:"center", minHeight:"200px"}}><LoaderRound></LoaderRound></div>
                            }
                        </div>
                    </div>
                    <div className={dashSt.ads_container}>
                        <div className={dashSt.advertise}>
                            <h2>Advertise 1</h2>
                            <p> 336 x 280</p>
                        </div>
                        <div className={dashSt.advertise}>
                            <h2>Advertise 2</h2>
                            <p> 336 x 280</p>
                        </div>
                    </div>
                </div>
            </LayoutDashboard>
        </PrivateRoute>
    );
};

export default Activities;