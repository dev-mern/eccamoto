import React, { useEffect, useState } from 'react';
import { fetchASummaryCard } from '../../../fetcherServices/cardService';
import { fetchSlipList } from '../../../fetcherServices/slipsServices';
import { getDayAndMonth } from "../../../utils/commonUtils";
import useAuth from '../../../hooks/useAuth';
import EarningCard from './EarningCard';
import SlipGraph from './SlipGraph';
import SurveyListHighlight from './SurveyListHighlight';
import dashST from "../../../../styles/dashboard.module.css";

const ViewAreaDashboard = () => {
    const {user,isUserLoading} = useAuth();
    const [card,setCard] = useState({});
    const [slipsCompleteGraphData,setSlipsCompleteGraphData] = useState([]);


    
    // generate list of days(30 day)
    const graphDates = Array.from(Array(30).keys()).reverse().map(num => new Date(new Date().setDate(new Date().getDate() - num)).toISOString().split("T")[0]);

    const slipGetter = async(userID) =>{
        if (userID) {
            const slipList = await fetchSlipList(`user_id=${userID}&type=${"complete"}&status=1`);
            if (!slipList.error && slipList.data?.length) {
                const formattedData = [];
                slipList.data?.forEach(servey =>{
                    // check if the updateAt exist
                    const exIdx = formattedData.findIndex((formServey)=> formServey.updatedAt.split("T")[0] === servey.updatedAt.split("T")[0]);
                    
                    if (exIdx > -1) {
                        formattedData[exIdx].earns = Number((formattedData[exIdx].earns + servey.amount_usd)?.toFixed(2));
                    }else{
                        const {day,month} = getDayAndMonth(servey.updatedAt);
                        // formattedData.push({updatedAt:servey.updatedAt, date:`${month}-${day}`, earns: Number(servey.amount_usd.toFixed(2))});
                        formattedData.push({updatedAt:servey.updatedAt, date:`${day}`, earns: Number(servey.amount_usd.toFixed(2))});
                    }
                })
                
                // added empty data in which day the survey slips are not available
                const finalSurveyData = graphDates.map(dateEl =>{
                    const existData =  formattedData.find(formatEl =>{
                        if ((formatEl.updatedAt.split("T")[0] === dateEl)) {
                            return true;
                        }
                        return false;
                    });
                    
                    if(existData){
                        return existData;
                    }else{
                        const {day,month} = getDayAndMonth(dateEl);
                        // return {updatedAt: dateEl, date:`${month}-${day}`, earns: 0}
                        return {updatedAt: dateEl, date:`${day}`, earns: 0}
                    }
                })
                
                setSlipsCompleteGraphData(finalSurveyData)
            }
        }
    }

    // get summary card of the user
    const getSummeryCard = async(userID) =>{
        if (userID) {
            const card = await fetchASummaryCard(userID);
            if (!card.error && !card.message) {
                setCard(card.data);
            }
        }
    }
   
    useEffect(()=>{
        const executer = async() =>{
            await slipGetter(user.user_id);
            await getSummeryCard(user.user_id);
        }
        executer();
    },[user.user_id])


    return (
        <div className={dashST.overview_container}>
            <div>
                <SurveyListHighlight></SurveyListHighlight>
            </div>
            <div>
                <EarningCard card={card}></EarningCard>
                <div className={dashST.earning_card}>
                    <div className={dashST.earning_card_title}>
                        <h3>Earnings in last 30 days</h3>
                    </div>
                    <div className={dashST.earning_graph}>
                        <SlipGraph graphData={slipsCompleteGraphData}></SlipGraph>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAreaDashboard;