import React from 'react';
import layoutST from "./layout.module.css";

const Footer = () => {
    return (
        <div className={layoutST.footer}>
            <div>
                <p style={{margin:0}}>Copyright &copy; {new Date().getFullYear()} ToDoSurvey</p>
                <p style={{margin:0}}>Enjoy the rest of your {new Date().toLocaleString("en-us",{weekday:"long"})}</p>
            </div>
            <div>
                {/* <p></p> */}
            </div>
        </div>
    );
};

export default Footer;