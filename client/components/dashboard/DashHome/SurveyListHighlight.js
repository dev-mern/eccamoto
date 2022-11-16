import Script from 'next/script';
import React, { useEffect, useState } from 'react';

const SurveyListHighlight = ({user}) => {
    const [your_app_id,set_your_app_id] = useState(14946);
    const [user_id,set_user_id] = useState(null);

    const script1 = {
        div_id: "fullscreen", // string // Entry point for the script
        theme_style: 1, // int // Theme: Select 1 for fullscreen, 2 for sidebar, 3 for sidebar single item
        order_by: 2, // int // Sort surveys (optional): Select 1 for best score (default), 2 for best money, 3 for best conversion rate
        limit_surveys: 6 // int // Limit the number of surveys displayed (optional). Default is 12.
    };
    const script2 = {
        div_id: "sidebar",
        theme_style: 1,
        order_by: 1,
    };
    
    const script3 = {
        div_id: "survey_Offer_card",
        theme_style: 3,
        display_mode: 1 //(optional): 1 show text "no surveys", 2 make element invisible, 3 dont render the element
        // Display_mode option only affects the behaviour of the box (theme style 3) if no surveys are found
    };
    const script4 = {
        div_id: "notification",
        theme_style: 4,
        position: 5, //number // default 1 // 1 = top center, 2 = top left, 3 top right, 4 bottom left, 5 bottom right, 6 bottom center
        text: "",
        link: "",
        newtab: true
    };
    
    const script5 = {
        div_id: "notification2",
        theme_style: 4,
        position: 6, //number // default 1 // 1 = top center, 2 = top left, 3 top right, 4 bottom left, 5 bottom right, 6 bottom center
        text: "",
        link: `https://wall.cpx-research.com/index.php?app_id=${your_app_id}&ext_user_id=${user_id}`,
        newtab: true
    };
    

    const config = {
        general_config: {
            app_id: your_app_id, //number
            ext_user_id: user_id, // string
            email: "", // string
            username: "", // string
            secure_hash: "", // string if enabled on publisher area
            subid_1: "", // string
            subid_2: "", // string
        },
        style_config: {
            text_color: "#2b2b2b", // string // hex, rgba, colorcode
            survey_box: {
                topbar_background_color: "#ffaf20", // string // hex, rgba, colorcode
                box_background_color: "white", // string // hex, rgba, colorcode
                rounded_borders: true, // boolean true || false
                stars_filled: "black", // string // hex, rgba, colorcode
            },
        },
        script_config: [script1, script2, script3,script4,script5], // Object Array
        debug: false, // boolean
        useIFrame: true, //boolean    
        iFramePosition: 1, // 1 right (default), 2 left
        functions: {
            no_surveys_available: () =>{
                console.log("no surveys available function here");
            }, // Function without parameter, NEVER USE window.alert... because of infinite loop
            count_new_surveys: (countsurveys) =>{
                console.log("count surveys function here, count:", countsurveys);
            },
            get_all_surveys: (surveys) =>{
                console.log("get all surveys function here, surveys: ", surveys);
            },
            get_transaction: (transactions) =>{
                console.log("transaction function here, transaction: ", transactions);
            }
      }  
    };

    useEffect(()=>{
        // set the user id 
        set_user_id(user.user_id);
        // and add the new config to windows
        window.config = config;
    },[config,user.user_id])

    return (
        <div>
            <div>
                <div>
                    <Script  
                        type="text/javascript" 
                        src="https://cdn.cpx-research.com/assets/js/script_tag_v2.0.js"
                    ></Script>
                </div>
                <div style={{margin: "auto"}} id="fullscreen"></div>
            </div>
        </div>
    );
};

export default SurveyListHighlight;