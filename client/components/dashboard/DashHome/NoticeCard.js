import React from 'react';
import dashST from "../../../../styles/dashboard.module.css";

const NoticeCard = ({notice,noticeIdx,openNotice,noticeHandler}) => {
    
    return (
        <div className={dashST.notice_card} onClick={()=>noticeHandler(noticeIdx)}>
            <div className={dashST.notice_card_title}>
                <h4>{notice.title}</h4>
                <p>{notice.date.split("T")[0]}</p>
            </div>
            {
                openNotice === `notice_${noticeIdx}` && <div className={dashST.notice_card_description}>
                    {
                        notice.description?.map((para,paraIdx) => <p key={`para_${paraIdx}`}>{para}</p>)
                    }
                </div>
            }
        </div>
    );
};

export default NoticeCard;