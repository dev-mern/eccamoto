import React from 'react';
import LoaderST from './LoaderBlink.module.css';

const LoaderBlink = () => {
    return (
        <span class={LoaderST.loader}></span>
    );
};

export default LoaderBlink;