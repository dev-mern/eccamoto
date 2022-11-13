import Head from 'next/head';
import React from 'react';

const defalutMeta = {
    title: "",
    content: ""
}

const HaderMeta = ({metaInfo = defalutMeta}) => {
    return (
        <Head>
            {metaInfo.title ? <title>{`${metaInfo.title} / Eccamoto`}</title> : <title>Eccamoto</title>}
            <meta name="description" content={metaInfo.title} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default HaderMeta;