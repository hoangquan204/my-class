import React from 'react';
import './Footer.css'; // Assuming you are adding some external CSS
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import { IconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getThemeSelector } from '../../redux/selector';



const Footer = () => {
    const theme = useSelector(getThemeSelector)
    return (
        <footer className={`bg-[${theme.palette.containerColor.main}] flex`}>
            <div className="footer-content m-auto flex flex-col items-center">
                <p className={`text-[${theme.palette.textColor.main}]`}>© 2024 Laptop Store. All Rights Reserved.</p>
                <div className="social-media">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <IconButton className='text-sm'>
                            <FacebookIcon></FacebookIcon>
                            <Typography variant='subtitle1' className={`text-[${theme.palette.textColor.main}]`}>Facebook</Typography>
                        </IconButton>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <IconButton className='text-sm'>
                            <YouTubeIcon></YouTubeIcon>
                            <Typography variant='subtitle1' className={`text-[${theme.palette.textColor.main}]`}>Youtube</Typography>
                        </IconButton>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <IconButton className='text-sm'>
                            <InstagramIcon></InstagramIcon>
                            <Typography variant='subtitle1' className={`text-[${theme.palette.textColor.main}]`}>Instagram</Typography>
                        </IconButton>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;