import { Backdrop, Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import GoogleMap from "../../others/GoogleMap/googleMap";
import BreadcrumbsCustom from "../BreadcrumbsCustom/BreadcrumbsCustom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { getAuthSelector, getThemeSelector } from "../../redux/selector";
import { createFeedback } from "./feedbackSlice";
import notificationSlice from "../Notification/notificationSlice";
import { useNavigate } from "react-router-dom";

function Contact() {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [state, setState] = React.useState({
        openSnackbar: false,
        vertical: 'bottom',
        horizontal: 'right',
        message: '',
        color: '',
        vote: false
    });

    const breadcrumbs = [
        {
            title: 'Trang chủ',
            path: '/'
        },
    ];

    const auth = useSelector(getAuthSelector)

    const [title, setTitle] = useState('Góp ý về website My class')
    const [name, setName] = useState(auth.userDetail.name)
    const [email, setEmail] = useState(auth.userDetail.email)
    const [address, setAddress] = useState(auth.userDetail.address)
    const [content, setContent] = useState('')

    const navigate = useNavigate()

    const handleCreateFeedback = () => {
        if (!title) {
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Bạn chưa điền tiêu đề!'
            }))
            return
        }

        if (!content) {
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Bạn chưa điền nội dung!'
            }))
            return
        }

        const data = {
            title,
            content
        }
        dispatch(createFeedback(data))
        dispatch(notificationSlice.actions.showNotification({
            type: 'success',
            message: 'Gửi phản hồi thành công!'
        }))
        navigate("/")

    }

    const handleReset = () => {
        setTitle('')
        setContent('')
    }

    const theme = useSelector(getThemeSelector)

    return (
        <Box className='container mx-auto p-4'>
            <Box className='w-full'>
                <BreadcrumbsCustom secondary={breadcrumbs} primary={'Liên hệ'} />
            </Box>
            <div className='w-full bg-gray-100 border-gray-400 border p-2 rounded-md'>
                Nếu bạn cần hỗ trợ, hãy gửi thông tin vào biểu mẫu. Chúng tôi sẽ cố gắng phản hồi sớm nhất!
            </div>
            <Box className='w-full py-2 gap-x-2 flex flex-col lg:flex-row'>
                <Box className='lg:w-[50%] w-full flex flex-col'>
                    <Box className='flex flex-col py-2'>
                        <span className='w-full bg-gray-300 p-2 font-semibold border'>
                            Trường Đại học Cần Thơ
                        </span>
                        <Box className={`flex flex-col text-[${theme.palette.textColor.main}]`}>
                            <Typography className='flex items-center py-2 gap-x-1'>
                                <FmdGoodIcon />
                                <span>
                                    Địa chỉ: Khu II, Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam
                                </span>
                            </Typography>
                            <Typography className='flex items-center py-2 gap-x-1'>
                                <LocalPhoneIcon />
                                <span>
                                    Điện thoại: 02923831530
                                </span>
                            </Typography>
                            <Typography className='flex items-center py-2 gap-x-1'>
                                <EmailIcon />
                                <span>
                                    Email: abc@gmail.com
                                </span>
                            </Typography>
                        </Box>
                    </Box>
                    <Box className='flex flex-col py-2'>
                        <span className='w-full bg-gray-300 p-2 font-semibold'>
                            Trường Công Nghệ Thông Tin và Truyền Thông
                        </span>
                        <Box className={`flex flex-col text-[${theme.palette.textColor.main}]`}>
                            <Typography className='flex items-center py-2 gap-x-1'>
                                <FmdGoodIcon />
                                <span>
                                    Địa chỉ: 3/2 Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam
                                </span>
                            </Typography>
                            <Typography className='flex items-center py-2 gap-x-1'>
                                <LocalPhoneIcon />
                                <span>
                                    Điện thoại: 02923831301
                                </span>
                            </Typography>
                            <Typography className='flex items-center py-2 gap-x-1'>
                                <EmailIcon />
                                <span >
                                    Email: abc@gmail.com
                                </span>
                            </Typography>
                        </Box>
                    </Box>
                    <Box className='flex flex-col py-2'>
                        <span className='w-full bg-gray-300 p-2 font-semibold'>
                            Đại diện My Class
                        </span>
                        <Box className={`flex flex-col text-[${theme.palette.textColor.main}]`}>
                            <Typography className='flex items-center py-2 gap-x-1'>
                                <FmdGoodIcon />
                                <span>
                                    Địa chỉ: 3/2 Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam
                                </span>
                            </Typography>
                            <Typography className='flex items-center py-2 gap-x-1'>
                                <LocalPhoneIcon />
                                <span>
                                    Điện thoại: 01234556776
                                </span>
                            </Typography>
                            <Typography className='flex items-center py-2 gap-x-1'>
                                <EmailIcon />
                                <span>
                                    Email: phuc@student.ctu.edu.vn
                                </span>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className='lg:w-[50%] w-full flex flex-col py-2'>
                    <span className='w-full bg-primary text-white p-2 font-semibold'>
                        GỬI PHẢN HỒI
                    </span>
                    <Stack className='p-2' spacing={2}>

                        <TextField
                            type="text"
                            name="heading"
                            label="Tiêu đề"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                            fullWidth
                            variant="outlined"
                            margin="normal"

                        />
                        <TextField
                            type="text"
                            name="fullName"
                            label="Họ tên"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            fullWidth
                            variant="outlined"
                            margin="normal"

                        />
                        <TextField
                            type="text"
                            name="email"
                            label="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            fullWidth
                            variant="outlined"
                            margin="normal"

                        />
                        <TextField
                            type="text"
                            name="address"
                            label="Địa chỉ"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                            fullWidth
                            variant="outlined"
                            margin="normal"

                        />
                        <TextField
                            type="text"
                            name="content"
                            label="Nội dung"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value)
                            }}
                            rows={3}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            multiline

                        />
                        <Box className='flex items-center justify-center gap-x-2'>
                            <Button variant="outlined" onClick={handleReset}>Đặt lại</Button>
                            <Button variant="contained" onClick={handleCreateFeedback} type="submit">Gửi</Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>
            <Box>
                <GoogleMap />
            </Box>
            {loading && <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>}
        </Box>
    );
}

export default Contact;
