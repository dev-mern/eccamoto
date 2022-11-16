import React from 'react';
import loaderST from './LoaderTriangle.module.css';

const LoaderTriangle = () => {
    return (
        <div class={loaderST.custom_loader}></div>
    );
};

export default LoaderTriangle;