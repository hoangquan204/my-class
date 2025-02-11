import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className='p-6 md:p-20 lg:p-40 flex items-center justify-center bg-white min-h-screen'>
            <div className='flex items-center flex-col justify-center text-center'>
                <p className='font-semibold text-sm md:text-base lg:text-lg -mb-4 md:-mb-6 pb-4 md:pb-0'>
                    KHÔNG TÌM THẤY TRANG
                </p>
                <p className='font-extrabold text-6xl md:text-[10rem] lg:text-[15rem] leading-none'>
                    404
                </p>
                <p className='mt-2 font-semibold text-lg md:text-xl lg:text-2xl'>
                    XIN LỖI, TRANG BẠN YÊU CẦU KHÔNG TÌM THẤY
                </p>
                <Button
                    onClick={() => navigate("/")}
                    sx={{
                        marginTop: 2,
                        color: 'white',
                        backgroundColor: 'black',
                        '&:hover': {
                            backgroundColor: '#333333',
                        },
                    }}
                >
                    TRANG CHỦ
                </Button>
            </div>
        </div>
    )
}

export default NotFound
