import { KeyboardDoubleArrowUp } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';

const GoTop = () => {
    const [isHide, setIsHide] = useState(true);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsHide(false);
        } else {
            setIsHide(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`fixed right-4 bottom-8 z-50 transition-opacity duration-300 ${isHide ? 'opacity-0 hidden' : 'opacity-100'}`}>
            <a href="#header" className='rounded-full bg-primary p-4 text-white'>
                <KeyboardDoubleArrowUp sx={{ margin: 'auto' }} />
            </a>
        </div>
    );
};

export default GoTop;
