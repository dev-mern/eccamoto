import { valueSetter } from 'dev-reactils';
import React, { useEffect, useState } from 'react';
import NavLink from "next/link";
import announceST from "./announcement.module.css";
import { hztlNavAnnouncement } from '.';
import AdminProtectRoute from '../../../../client/components/common/AdminProtectRoute';
import LayoutAdmin from '../../../../client/components/dashboardAdmin/layout/LayoutAdmin';
import { fetchNoticesDeleteService, fetchNoticesService } from '../../../../client/fetcherServices/noticesFetchService';
import AddNotice from '../../../../client/components/dashboardAdmin/announcement/AddNotice';
import LoaderCrossRound from '../../../../client/components/common/Loaders/LoaderCrossRound/LoaderCrossRound';
import LoaderBlink from '../../../../client/components/common/Loaders/LoaderBlink/LoaderBlink';

const Notice = () => {
    const [allNotices,setAllNotices] = useState([]);
    const [err,setErr] = useState({notices:"",});
    const [isLaoding,setIsLaoding] = useState({notices:true,notice_del:false});
    const [openNotice,setOpenNotice] = useState(null);

    useEffect(()=>{
        const asyncExecuter = async() =>{
            await noticeGetter();
        }
        asyncExecuter();
    },[])

    const noticeGetter = async() =>{
        valueSetter(setErr,"","notices");
        valueSetter(setIsLaoding,true,"notices");
        const notices = await fetchNoticesService();
        if (!notices.error && notices.data?.length) {
            setAllNotices(notices.data);
        }else{
            valueSetter(setErr,notices.message,"notices");
        }
        valueSetter(setIsLaoding,false,"notices");
    }
    
    const handleNoticeDelete = async(notice_id,noticeIdx) =>{
        const isConfirmDelete = window.confirm("Are you sure to delete the notice?");
        if (isConfirmDelete) {
            valueSetter(setIsLaoding,true,"notice_del");
            const deleteRes = await fetchNoticesDeleteService(notice_id);
            console.log(deleteRes);
            if (deleteRes.data?.acknowledged && deleteRes.data?.deletedCount > 0) {
                // splice the notice from state
                const tempNotices = [...allNotices];
                tempNotices.splice(noticeIdx,1);
                setAllNotices(tempNotices);
            }else{
                alert(deleteRes.message ?? `Failed to delete the notice.`)
            }
            valueSetter(setIsLaoding,false,"notice_del");
        }
        
    }
    
    return (
        <AdminProtectRoute>
            <LayoutAdmin hztlNavAdmin={hztlNavAnnouncement}>
                <div>
                    <section className={announceST.notices_container}>
                        <div className={announceST.notices_title}>
                            <h3>Add A Notice</h3>
                        </div>
                        <AddNotice setAllNotices={setAllNotices}></AddNotice>
                    </section>
                    <section className={announceST.notices_container}>
                        <div className={announceST.notices_title}>
                            <h3>List of Notices</h3>
                        </div>
                        <div className={announceST.notices}>
                            <div className={announceST.notice_head} style={{fontWeight:"700", background:"#413839"}}>
                                <p style={{marginLeft:"auto"}}>ID</p>
                                <p>Date</p>
                                <p>Status</p>
                                <p>Title</p>
                                <p>Action</p>
                            </div>
                            {
                                !isLaoding.notices && allNotices.map((notice,noticeIdx) => <div 
                                        className={`${announceST.notice} ${announceST[openNotice === notice.notice_id ? "notice_details_open" : "notice_details_close"]}`} 
                                        onClick={()=>notice.notice_id === openNotice ? setOpenNotice(null): setOpenNotice(notice.notice_id)} 
                                        key={notice.notice_id}
                                    >
                                        <div className={announceST.notice_head}>
                                            <p className={announceST.notice_head_inner} style={{marginLeft:"auto"}}>{notice.notice_id}</p>
                                            <p className={announceST.notice_head_inner} style={{margin:"auto"}}>{notice.date?.split("T")[0]}</p>
                                            <p className={announceST.notice_head_inner} style={{margin:"auto"}}><span style={{padding:"0px 8px",borderRadius:"5px",background: notice.status === "active" ? "#196F3D" : "#873600"}}>{notice.status}</span></p>
                                            <p className={announceST.notice_head_inner}>{notice.title}</p>
                                            <p style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                                                <NavLink 
                                                    href={{pathname: "/admin/dashboard/announcements/notice", query:{notice_id: notice.notice_id}}} passHref={true} 
                                                    legacyBehavior
                                                ><button className={announceST.notice_edit}>Edit</button></NavLink>
                                                {
                                                    !isLaoding.notice_del 
                                                    ?   <button className={announceST.notice_delete} onClick={()=>handleNoticeDelete(notice.notice_id,noticeIdx)}>Delete</button>
                                                    :   <div style={{cursor:"default"}}><LoaderBlink></LoaderBlink></div>
                                                }
                                                
                                            </p>
                                        </div>
                                        <div>
                                            {
                                                notice.description?.map((para,paraIdx) => <p key={`para_${paraIdx}`}>{para}</p>)
                                            }
                                        </div>
                                </div>)
                            }
                            <div>
                                {
                                    isLaoding.notices && <div style={{position:"relative", height:"200px", display:"flex", justifyContent:"center", alignItems:"center"}}><LoaderCrossRound></LoaderCrossRound></div>
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </LayoutAdmin>
        </AdminProtectRoute>
    );
};

export default Notice;
