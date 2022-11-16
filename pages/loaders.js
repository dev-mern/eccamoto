import React from 'react';
import LoaderBlink from '../client/components/common/Loaders/LoaderBlink/LoaderBlink';
import LoaderCrossRound from '../client/components/common/Loaders/LoaderCrossRound/LoaderCrossRound';
import LoaderDotCut from '../client/components/common/Loaders/LoaderDotCut/LoaderDotCut';
import LoaderRound from '../client/components/common/Loaders/LoaderRound/LoaderRound';
import LoaderTriangle from '../client/components/common/Loaders/LoaderTriangle/LoaderTriangle';

const Test = () => {
    return (
        <div>
            <h3>Component Testing</h3>
            <div style={{display:"flex"}}>
                <div style={{position:"relative", height:"100px", width:"200px", border:"1px solid grey"}}>
                    <LoaderBlink></LoaderBlink>
                </div>
                <div style={{position:"relative", height:"100px", width:"200px", border:"1px solid grey"}}>
                    <LoaderCrossRound></LoaderCrossRound>
                </div>
                <div style={{position:"relative", height:"100px", width:"200px",border:"1px solid grey"}}>
                    <LoaderRound></LoaderRound>
                </div>
                <div style={{position:"relative", height:"100px", width:"200px",border:"1px solid grey"}}>
                    <LoaderDotCut></LoaderDotCut>
                </div>
                <div style={{position:"relative", height:"100px", width:"200px",border:"1px solid grey"}}>
                    <LoaderTriangle></LoaderTriangle>
                </div>
            </div>
        </div>
    );
};

export default Test;