import React, { useEffect, useState } from 'react';
import { fetchASummaryCard } from '../../../fetcherServices/cardService';
import { fetchSlipList } from '../../../fetcherServices/slipsServices';
import { getDayAndMonth } from "../../../utils/commonUtils";
import useAuth from '../../../hooks/useAuth';
import EarningCard from './EarningCard';
import SlipGraph from './SlipGraph';
import SurveyListHighlight from './SurveyListHighlight';
import dashST from "../../../../styles/dashboard.module.css";
import NoticeCard from './NoticeCard';
import { fetchNoticesService } from '../../../fetcherServices/noticesFetchService';
import { valueSetter } from 'dev-reactils';



const ViewAreaDashboard = () => {
    const {user,isUserLoading} = useAuth();
    const [card,setCard] = useState({});
    const [slipsCompleteGraphData,setSlipsCompleteGraphData] = useState([]);
    const [notices,setNotices] = useState([]);
    const [noticesErrLoad,setNoticesErrLoad] = useState({error:"",loading:false});
    const [openNotice,setOpenNotice] = useState(null);
    const [limitedNotice,setlimitedNotice] = useState({notices:[],number:4});
    
    // generate list of days(30 day)
    const graphDates = Array.from(Array(30).keys()).reverse().map(num => new Date(new Date().setDate(new Date().getDate() - num)).toISOString().split("T")[0]);

    const slipGetter = async(userID) =>{
        if (userID) {
            const slipList = await fetchSlipList(`user_id=${userID}&status=1`);
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
            if (!notices.length) {
                await getNoticesList();
            }
        }
        executer();
    },[user.user_id])

    const noticeHandler = (noticeIdx) =>{
        const newNotice = `notice_${noticeIdx}`;
        newNotice === openNotice ? setOpenNotice(null) : setOpenNotice(newNotice);
    }

    
    // fetch the notices
    const getNoticesList = async() =>{
        valueSetter(setNoticesErrLoad,true,'loading');
        valueSetter(setNoticesErrLoad,"",'error');
        const noticesRes = await fetchNoticesService("status=active");
        console.log(noticesRes.data.length,"fount");
        if (noticesRes.data instanceof Array) {
            setNotices(noticesRes.data)
            valueSetter(setNoticesErrLoad,noticesRes.message,'error'); // delete this
        }else{
            valueSetter(setNoticesErrLoad,noticesRes.message,'error');
        }
        valueSetter(setNoticesErrLoad,false,'loading');
        
    }

    // limit the notice by user click
    useEffect(()=>{
        const filteredNotices = notices.slice(0,limitedNotice.number);
        setlimitedNotice({...limitedNotice,notices:filteredNotices});
        console.log(filteredNotices);
    },[notices.length,limitedNotice.number])
    
    return (
        <div className={dashST.overview_container}>
            <div>
                <div className={`${dashST.overview_noticeboard}`}>
                    <div className={`${dashST.earning_card_title}`}>
                        <h3>Notice Board</h3>
                    </div>
                    <div className={`${dashST.overview_notices}`}>
                        {
                            notices.length
                            ?   <div>
                                    {
                                        // notices.map((notice,noticeIdx) => <NoticeCard notice={notice} openNotice={openNotice} noticeHandler={noticeHandler} noticeIdx={noticeIdx} key={notice.notice_id}></NoticeCard>)
                                        limitedNotice.notices.map((notice,noticeIdx) => <NoticeCard notice={notice} openNotice={openNotice} noticeHandler={noticeHandler} noticeIdx={noticeIdx} key={notice.notice_id}></NoticeCard>)
                                    }
                                </div>
                            :   <div> 
                                    <p style={{textAlign:"center", marginTop:"2rem"}}>{noticesErrLoad.loading ? "Loading........." : "No notice available at this moment"}</p> 
                                </div>
                        }
                        {
                            (limitedNotice.number < notices.length) && <button style={{border:"none", marginLeft:"auto",display:"block",cursor:"pointer", padding:"1px 8px", borderRadius:"2px"}} onClick={()=>setlimitedNotice({...limitedNotice,number:limitedNotice.number+1})}>more...</button>
                        }
                        
                    </div>
                    {
                        noticesErrLoad.error && <p style={{textAlign:"right", margin:"0", color:"red"}}>Error: {noticesErrLoad.error}</p>
                    }
                </div>
                <SurveyListHighlight user={user}></SurveyListHighlight>
            </div>
            <div>
                <EarningCard card={card}></EarningCard>
                <div className={dashST.earning_card}>
                    <div className={dashST.earning_card_title}>
                        <h3>Earnings in last 30 days</h3>
                    </div>
                    <div className={dashST.earning_graph}>
                        {
                            slipsCompleteGraphData.length 
                            ?   <SlipGraph graphData={slipsCompleteGraphData}></SlipGraph>
                            :   <div style={{height:"100%", display:"flex",justifyContent:"center",alignItems:"center"}}><p>You have no earning in last 30 days</p></div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAreaDashboard;