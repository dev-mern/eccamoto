import React from 'react';
import loaderST from "./LoaderMeter.module.css";

const LoaderMeter = () => {
    return (
        <span className={loaderST.loader}></span>
    );
};

export default LoaderMeter;