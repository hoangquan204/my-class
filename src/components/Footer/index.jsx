import { Box, Divider, Link, Typography } from '@mui/material'
import React from 'react'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { useSelector } from 'react-redux'
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import Helper from '../Helper/Helper'
import { getThemeSelector } from '../../redux/selector'
import DevProfileModal from '../DevProfile/DevProfileModal'
const Footer = () => {
    const theme = useSelector(getThemeSelector)
    return (
        <Box className='flex flex-col gap-x-2' >
            <Divider />
            <Box className='flex items-center justify-between flex-wrap px-10 py-5 gap-y-2'>
                <Box className='flex flex-col gap-y-4'>
                    <span className='text-xl font-semibold border-l-[4px] border-primary'>
                        <span className={`px-1 text-[${theme.palette.textColor.main}]`}>Địa chỉ:</span>
                    </span>
                    <Box className='px-20'>
                        <div style={{ height: '150px', }} className='w-full lg:w-[450px]'>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2336.100572179985!2d105.76888585411206!3d10.030290283558067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883d2192b0f1%3A0x4c90a391d232ccce!2zVHLGsOG7nW5nIEPDtG5nIE5naOG7hyBUaMO0bmcgVGluIHbDoCBUcnV54buBbiBUaMO0bmcgKENUVSk!5e0!3m2!1svi!2s!4v1728823560715!5m2!1svi!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </Box>
                </Box>
                <Box className='flex flex-col gap-y-4'>
                    <span className='text-xl font-semibold border-l-[4px] border-primary'>
                        <span className={`px-1 text-[${theme.palette.textColor.main}]`}>GitHub:</span>
                    </span>
                    <Typography className='flex items-center gap-x-2'>
                        <GitHubIcon></GitHubIcon>
                        <Link href="https://github.com/hoangquan204" target="_blank">hoangquan204</Link>
                    </Typography>
                    <span className='text-xl font-semibold border-l-[4px] border-primary'>
                        <span className={`px-1 text-[${theme.palette.textColor.main}]`}>Mạng xã hội:</span>
                    </span>
                    <Typography className='flex items-center gap-x-2'>
                        <FacebookIcon></FacebookIcon>
                        <Link href="https://www.facebook.com/profile.php?id=100026621393102" target="_blank">Hoàng Quân</Link>
                    </Typography>
                </Box>

                <Box className='flex flex-col gap-y-4'>
                    <span className='text-xl font-semibold border-l-[4px] border-primary'>
                        <span className={`px-1 text-[${theme.palette.textColor.main}]`}>Liên hệ qua Email:</span>
                    </span>
                    <Typography className='flex items-center gap-x-2'>
                        <EmailIcon></EmailIcon>
                        <Link href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=quanpogba888@gmail.com" target="_blank">quanpogba888@gmail.com</Link>
                    </Typography>
                    <span className='text-xl font-semibold border-l-[4px] border-primary'>
                        <span className={`px-1 text-[${theme.palette.textColor.main}]`}>Thông tin lập trình viên:</span>
                    </span>
                    <Typography className='flex items-center gap-x-2'>
                        <LocalPhoneIcon></LocalPhoneIcon>
                        <DevProfileModal></DevProfileModal>
                    </Typography>
                </Box>
            </Box>
            <Box className='flex flex-col gap-x-2 bg-primary'>
                <Box className='flex items-center gap-x-10 justify-center p-2'>
                    <div className='rounded-full p-2 bg-white text-primary hover:bg-primary hover:text-white transition-all'>
                        <a target='_blank' href='https://www.facebook.com/profile.php?id=61562067031551'>
                            <FacebookIcon></FacebookIcon>
                        </a>
                    </div>
                    <div className='rounded-full p-2 bg-white text-primary hover:bg-primary hover:text-white transition-all'>
                        <GitHubIcon />
                    </div>
                    <div className='rounded-full p-2 bg-white text-primary hover:bg-primary hover:text-white transition-all'>
                        <EmailIcon></EmailIcon>
                    </div>
                    <div className='rounded-full p-2 bg-white text-primary hover:bg-primary hover:text-white transition-all'>
                        <LocalPhoneIcon></LocalPhoneIcon>
                    </div>
                </Box>
            </Box>
            <Box className='flex items-center justify-center bg-primary text-white py-2'>
                <span>Copyright © 2024 My class. All rights reserved.</span>
            </Box>
            <Helper></Helper>
        </Box>
    )
}

export default Footer