import { handleFormSubmit, handleInput, valueSetter } from 'dev-reactils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { fetchGet, fetchPatch, fetchPost } from '../../../utils/fetchers';
import announceST from "../../../../pages/admin/dashboard/announcements/announcement.module.css";
import LoaderBlink from '../../common/Loaders/LoaderBlink/LoaderBlink';
import LoaderCrossRound from '../../common/Loaders/LoaderCrossRound/LoaderCrossRound';

const AddNotice = ({setAllNotices}) => {
    const router = useRouter();
    const {notice_id} = router.query;
    const [newNotice,setNewNotice] = useState({notice_id:0,title:"",status:"",description:[],date: new Date()});
    const [noticeErr,setNoticeErr] = useState({});
    const [noticeEditLoading,setnoticeEditLoading] = useState({getNotice:false,updateNotice:false});

   
    const handleNewsAdd = async(e) =>{
        e.preventDefault();
        valueSetter(setnoticeEditLoading,true,"updateNotice");
        if (newNotice.date && newNotice.title && newNotice.notice_id && newNotice.status && newNotice.description.length) {
            setNoticeErr({});
            if (notice_id) {
                // fetch to UPDATE the new notice data
                const updatedNoticeRes = await fetchPatch(`/api/v1/notices/${notice_id}`,newNotice);
                if (!updatedNoticeRes.error && updatedNoticeRes.data?.notice_id) {
                    // slice the array and replace the new updated notice doc
                    setAllNotices(pre =>{
                        const temp = [...pre];
                        const existIdx = temp.findIndex(tempEl => tempEl.notice_id === updatedNoticeRes.data.notice_id);
                        temp.splice(existIdx,1,updatedNoticeRes.data);
                        return temp;
                    })
                    setNewNotice({notice_id:0,title:"",status:"",description:[],date: new Date()})
                    router.push({pathname: router.pathname},undefined,{shallow:true});
                }else{
                    if (updatedNoticeRes.message instanceof Object) {
                        setNoticeErr(updatedNoticeRes.message);
                    }else{
                        setNoticeErr({common:updatedNoticeRes.message});
                    }
                }
                
            }else{
                // fetch to ADD the new notice data
                const updatedNoticeRes = await fetchPost("/api/v1/notices",newNotice);
                if (!updatedNoticeRes.error && updatedNoticeRes.data?._id) {
                    // added successfully
                    valueSetter(setAllNotices,updatedNoticeRes.data,null,{arrayReplace:false});
                    setNewNotice({notice_id:0,title:"",status:"",description:[],date: new Date()});
                }else{
                    if (updatedNoticeRes.message instanceof Object) {
                        setNoticeErr(updatedNoticeRes.message);
                    }else{
                        setNoticeErr({common:updatedNoticeRes.message});
                    }
                }

            }
        }else{
            setNoticeErr({common:"All fields are required!"});
        }
        valueSetter(setnoticeEditLoading,false,"updateNotice");
    }

    const handleDetailsChange = (e) =>{
        if (e.keyCode === 13 || e.key === 'Enter') {
            valueSetter(setNewNotice,[...newNotice[e.target.name],e.target.value.replace( /[\r\n]+/gm, "")],e.target.name);
            e.target.value = "";
        }
    }

    const noticeByIdGetter = async(noticeID) =>{
        valueSetter(setnoticeEditLoading,true,"getNotice"); 
        const existNotice = await fetchGet(`/api/v1/notices?notice_id=${noticeID}`);
        if (!existNotice.error && existNotice.data?.length) {
            setNewNotice(existNotice.data[0]);
        }else{
            setNoticeErr({common:existNotice.message});
        }
        valueSetter(setnoticeEditLoading,false,"getNotice"); 
    }

     // bring the notice by id to update
     useEffect(()=>{
         if (notice_id) {
            const exicuterFn = async() =>{
                await noticeByIdGetter(notice_id);
            }
            exicuterFn();
        }
    },[notice_id])

    const deleteEditedpara = (delteIdx) =>{
        const temp = {...newNotice};
        temp.description.splice(delteIdx,1);
        setNewNotice(temp);
    }
// console.log(newNotice);

    return (
        <div className={announceST.addNotice_container}>
            {
                !noticeEditLoading.getNotice && 
                <form onSubmit={handleNewsAdd} className={announceST.addNotice_form}>
                    <div>
                        <div>
                            <div className={announceST.addNotice_field}>
                                <p>Title</p>
                                <input onChange={e=>handleInput(e,setNewNotice)} type="text" name='title' value={newNotice.title} placeholder='Type the TITLE of the notice' required />
                            </div>
                            <p className={announceST.addNotice_err}>{noticeErr.title}</p>
                        </div>
                        <div className={announceST.addNotice_field_parts}>
                            <div>
                                <div className={announceST.addNotice_field_part}>
                                    <p>Date :</p>
                                    <input onChange={e=>handleInput(e,setNewNotice)} type="date" name='date' value={new Date(newNotice.date).toISOString().split("T")[0]} placeholder='Date' required />
                                </div>
                                <p className={announceST.addNotice_err}>{noticeErr.date}</p>
                            </div>
                            <div>
                                <div className={announceST.addNotice_field_part}>
                                    <p>ID :</p>
                                    <input onChange={e=>handleInput(e,setNewNotice)} type="number" name='notice_id' value={Number(newNotice.notice_id)} disabled={notice_id ? true : false} placeholder='Notice ID, eg. 1234' required />
                                </div>
                                <p className={announceST.addNotice_err}>{noticeErr.notice_id}</p>
                            </div>
                            <div>
                                <div className={announceST.addNotice_field_part}>
                                    <p>Status :</p>
                                    <select onChange={e=>valueSetter(setNewNotice,e.target.value,e.target.name)} value={newNotice.status} name="status" id="" required>
                                        <option value="">Select Status</option>
                                        <option  value="active">Active</option>
                                        <option  value="in-active">In-Active</option>
                                    </select>
                                </div>
                                <p className={announceST.addNotice_err}>{noticeErr.status}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className={ newNotice.description?.length? announceST.addNotice_paras:""}>
                                {
                                    newNotice.description.map((para,paraIdx) => <div className={announceST.addNotice_para_wrap} key={`paraIdx_${paraIdx}`}>
                                        <button className={announceST.addNotice_para_delBtn} onClick={()=>deleteEditedpara(paraIdx)}>X</button>
                                        <p className={announceST.addNotice_para}>{para}</p>
                                    </div>)
                                }
                            </div>
                            <textarea onKeyUp={handleDetailsChange} className={announceST.addNotice_textarea} name="description" placeholder='Write the details of the notice here. Press "enter" to make para based notice...........' id=""></textarea>
                        </div>
                        <p className={announceST.addNotice_err}>{noticeErr.description}</p>
                    </div>
                    {
                        !noticeEditLoading.updateNotice 
                        ?   <button className={announceST.addNotice_submit_btn} type='submit'>Save</button>
                        :   <div style={{display:"flex",justifyContent:"center"}}><LoaderBlink></LoaderBlink></div>
                    }
                    
                    <p className={announceST.addNotice_err}>{noticeErr.common}</p>
                </form>
            }
            
            <div>
                {
                    noticeEditLoading.getNotice && <div style={{position:"relative", height:"50px", width:"80px", margin:"100px auto"}}><LoaderCrossRound></LoaderCrossRound></div>
                }
            </div>
        </div>
    );
};

export default AddNotice;