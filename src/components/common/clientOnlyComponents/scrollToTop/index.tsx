'use client'
import { useEffect } from 'react';

const ScrollToTop = () => {
    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    return (<></>)
};

export default ScrollToTop ;
