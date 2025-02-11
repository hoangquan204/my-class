import { Avatar, Box, Button, Chip, FormControl, Grid, IconButton, InputLabel, LinearProgress, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import notificationSlice from '../Notification/notificationSlice';
import { uploadFile } from '../../others/UploadFile/uploadSlice';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSelector, getClassRoomSelector, getThemeSelector, getUploadFileSelector } from '../../redux/selector';
import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { createLesson } from './lessonSlice';
import { AddPhotoAlternate } from '@mui/icons-material';
import BreadcrumbsCustom from '../BreadcrumbsCustom/BreadcrumbsCustom';

// Quill module for uploading and displaying images
const ImageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const quill = window.quillEditorRef;
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', reader.result);
        };

        reader.readAsDataURL(file);
    };
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap'
});

const LessonCreation = () => {
    const [title, setTitle] = useState('')
    const [value, setValue] = useState('');
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailUrl, setThumbnailUrl] = useState('')

    const [isImgContent, setImgContent] = useState(false)


    const upload = useSelector(getUploadFileSelector)
    const auth = useSelector(getAuthSelector)
    const theme = useSelector(getThemeSelector)
    const classRoom = useSelector(getClassRoomSelector)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Custom toolbar configuration with image handler
    const modules = {
        toolbar: {
            container: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                ['link', 'image'], // Add image button in toolbar
                ['clean'],
                [{ 'font': [] }, { 'size': ['small', 'medium', 'large', 'huge'] }],
                [{ 'align': [] }],
                ['code-block']
            ],
            handlers: {
                image: ImageHandler, // Custom image handler for uploading images
            },
        },
    };

    const formats = [
        'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'align', 'link', "image"
    ];

    const modules2 = {
        toolbar: {
            container: [

            ],
        },
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setThumbnail(file)
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Tạo URL từ file
            setThumbnailUrl(imageUrl); // Lưu URL vào state
        }
    };

    const handleSetThumbnail = () => {
        if (thumbnail !== null) {
            const formData = new FormData();
            formData.append('file', thumbnail)
            dispatch(uploadFile(formData))
            setImgContent(false)
        } else {
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Selected file is null!'
            }))
        }
    }

    const handleCreateLesson = () => {
        const data = {
            title,
            content: value,
            thumbnail: thumbnailUrl,
            classRoomId: classRoom.selectedClassRoomId
        }
        console.log(data);
        dispatch(createLesson(data))
        dispatch(notificationSlice.actions.showNotification({
            type: 'success',
            message: 'Create lesson successfully!'
        }))
        resetData()
    }

    const resetData = () => {
        setTitle('')
        setThumbnail(null)
        setThumbnailUrl('')
        setValue('')
    }


    const handleSelectImage = async (e) => {
        if (e.target.files[0] !== null) {
            const formData = new FormData();
            formData.append('file', e.target.files[0])
            dispatch(uploadFile(formData))
            setImgContent(true)
        } else {
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Selected file is null!'
            }))
        }
    }

    useEffect(() => {
        const imgUrl = upload.url
        if (imgUrl && isImgContent) {
            const img = `!!! align='center' class='w-[70vw] object-cover text-center' src='${imgUrl}'/></div>`
            setValue(value + img)
        } else if (imgUrl && !isImgContent) {
            setThumbnailUrl(imgUrl)
        }
    }, [upload.url])

    const specificDateTime = moment(Date.now());
    const formattedDateTime = specificDateTime.format('DD-MM-YYYY HH:mm:ss');

    const breadcumbs = [
        {
            title: 'Trang chủ',
            path: '/'
        },
        {
            title: 'Bài giảng',
            path: '/class'
        }
    ]
    return <Box>
        <BreadcrumbsCustom secondary={breadcumbs} primary={'Tạo bài giảng'} />
        <Typography className='text-primary border-l-4 border-l-primary' >
            <span className='text-xl font-semibold px-1'>Tạo bài giảng</span>
        </Typography>
        <div className={`relative text-[${theme.palette.textColor.main}]`}>
            <div className='flex items-center gap-x-4'>
                <div className='flex flex-col gap-y-2 w-[40%]'>
                    <TextField id="outlined-basic" value={title} label="Tiêu đề" variant="standard" onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                    <div className='flex justify-center gap-x-2 items-center w-full'>
                        <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Tải ảnh bìa
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleImageChange}
                                multiple
                            />
                        </Button>
                        <Button variant='contained' onClick={handleSetThumbnail}>Xác nhận</Button>
                    </div>
                    <span>Xem trước</span>
                    <div className="relative flex items-center gap-4 p-4 border-2 border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        {/* Hình ảnh bài viết */}
                        {upload.loading ?
                            <div className='w-[150px] h-[100px] flex'>
                                <CircularProgress className='m-auto'></CircularProgress>
                            </div>
                            :
                            <img className='w-[150px] h-[100px] object-cover  rounded-md' src={thumbnailUrl || 'https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg'}></img>
                        }
                        {/* Nội dung bài viết */}
                        <div className="flex flex-col flex-1 gap-2">
                            {/* Tiêu đề bài viết */}
                            <span className="text-lg font-semibold text-gray-800 truncate">{title}</span>

                            {/* Người đăng */}
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="mr-2">Tạo bởi:</span>
                                <div className="flex items-center gap-2">
                                    <Avatar
                                        src={auth?.userDetail?.avatar}
                                        sx={{ width: 24, height: 24 }}
                                        alt="user-avatar"
                                    />
                                    <Typography variant="body2" className="text-gray-700">
                                        {auth?.userDetail?.name || 'Your name'}
                                    </Typography>
                                </div>
                            </div>

                            {/* Ngày tạo */}
                            <span className="text-sm text-gray-500">Ngày tạo: {formattedDateTime}</span>
                        </div>
                    </div>
                </div>
                <img className='w-[60%] h-[400px] border-[#d3d3d3] border-[2px] rounded-md mx-auto object-cover' src={thumbnailUrl || upload?.url || 'https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg'} alt='News Thumbnail'>
                </img>
            </div>
            <input
                type='file'
                accept='image/*'
                onChange={handleSelectImage}
                style={{ display: 'none' }}
                id='image-input'
            />
            <label htmlFor='image-input'>
                <IconButton color='primary' component='span'>
                    <AddPhotoAlternate />
                </IconButton>
            </label>
            <Grid container spacing={2} className='flex'>
                <Grid item xs={12} md={6}>
                    <div style={{ minHeight: '400px' }} className='scroll-hidden'>
                        <ReactQuill
                            ref={(el) => {
                                if (el) {
                                    window.quillEditorRef = el.getEditor();
                                }
                            }}
                            theme="snow"
                            value={value}
                            onChange={setValue}
                            modules={modules}
                            style={{ height: '100%' }}
                            formats={formats}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div style={{ minHeight: '400px' }} className='scroll-hidden'>
                        <ReactQuill
                            ref={(el) => {
                                if (el) {
                                    window.quillEditorRef = el.getEditor();
                                }
                            }}
                            theme="snow"
                            value={value.replaceAll("!!!", "<img")}
                            modules={modules2}
                            style={{ height: '100%' }}
                            formats={formats}
                        />
                    </div>
                </Grid>
            </Grid>
            <Button className='w-full' variant='contained' onClick={handleCreateLesson}>Lưu bài giảng</Button>
        </div >
    </Box>

};

export default LessonCreation;
