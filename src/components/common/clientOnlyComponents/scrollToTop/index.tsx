'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ScrollToTop = () => {
    const router = useRouter()
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        router.refresh()
    }, []);

    return (<></>)
};

export default ScrollToTop ;
