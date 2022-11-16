import React from 'react';
import layoutST from "./layout.module.css";
import HaderMeta from './HaderMeta';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({children,pageMeta}) => {
    return (
        <div className={layoutST.layout_container}>
            <HaderMeta metaInfo={pageMeta}></HaderMeta>
            <header className={layoutST.header}>
                <NavBar></NavBar>
            </header>
            <main className={layoutST.main_container}>
                {children}
            </main>
            <footer className={layoutST.footer_container}>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default Layout;