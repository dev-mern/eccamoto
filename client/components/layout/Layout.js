import React from 'react';
import HaderMeta from './HaderMeta';
import NavBar from './NavBar';

const Layout = ({children,pageMeta}) => {
    return (
        <>
            <HaderMeta metaInfo={pageMeta}></HaderMeta>
            <header>
                <NavBar></NavBar>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <h3>It is Footer</h3>
            </footer>
        </>
    );
};

export default Layout;