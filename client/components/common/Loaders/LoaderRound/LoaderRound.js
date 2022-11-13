import React from 'react';
import loaderST from "./LoaderRound.module.css";

const LoaderRound = () => {
    return (
        <span className={loaderST.loader}></span>
    );
};

export default LoaderRound;