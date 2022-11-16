import React from 'react';
import loaderST from './LoaderTriangle.module.css';

const LoaderTriangle = () => {
    return (
        <div className={loaderST.custom_loader}></div>
    );
};

export default LoaderTriangle;