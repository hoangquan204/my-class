import { Avatar, Button, Chip, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { laptopTypes } from '../../others/LaptopTypes';
import notificationSlice from '../Notification/notificationSlice';
import { uploadFile } from '../../others/UploadFile/uploadSlice';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSelector, getNewsSelector, getThemeSelector, getUploadFileSelector } from '../../redux/selector';
import { styled } from '@mui/material/styles';
import { createNews } from '../News/newsSlice';
import { CircularProgress } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

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

const TextEditor = () => {
    const [title, setTitle] = useState('')
    const [field, setField] = useState('Field')
    const [value, setValue] = useState('');
    const [thumbnail, setThumbnail] = useState(null)
    const [content, setContent] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('')
    const [chipColor, setChipColor] = useState('#333')

    const upload = useSelector(getUploadFileSelector)
    const auth = useSelector(getAuthSelector)
    const news = useSelector(getNewsSelector)
    const theme = useSelector(getThemeSelector)

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
            ],
            handlers: {
                image: ImageHandler, // Custom image handler for uploading images
            },
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
        } else {
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Selected file is null!'
            }))
        }
    }

    const handleCreateNews = () => {
        const data = {
            title,
            field: field,
            content: value,
            thumbnail: upload.url,
        }
        console.log(data);
        dispatch(createNews(data))
        dispatch(notificationSlice.actions.showNotification({
            type: 'success',
            message: 'Create news successfully!'
        }))
        resetData()
    }

    const resetData = () => {
        setTitle('')
        setField('Field')
        setChipColor('#333')
        setThumbnail(null)
        setThumbnailUrl('')
        setValue('')
    }

    const specificDateTime = moment(Date.now());
    const formattedDateTime = specificDateTime.format('DD-MM-YYYY HH:mm:ss');

    return <>
        {news.loading ?
            <div className='w-[100%] h-[100%] flex'>
                <CircularProgress className='m-auto'></CircularProgress>
            </div>
            :
            <div className={`relative text-[${theme.palette.textColor.main}]`}>
                <IconButton variant='outlined' className='absolute top-0 left-0' onClick={() => {
                    navigate("/admin/news")
                }}>
                    <ArrowBackIosIcon className='m-auto'></ArrowBackIosIcon>
                </IconButton>
                <div className='flex items-center gap-x-4'>
                    <div className='flex flex-col gap-y-2 w-[40%]'>
                        <TextField id="outlined-basic" value={title} label="Title" variant="standard" onChange={(e) => {
                            setTitle(e.target.value)
                        }} />
                        <FormControl>
                            <span>Field: </span>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={field}
                                variant='standard'
                                onChange={(e) => {
                                    setField(e.target.value)
                                }}
                            >
                                {laptopTypes.map((type) => {
                                    return <MenuItem value={type.name}>{type.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <div className='flex justify-center gap-x-2 items-center w-full'>
                            <Button
                                component="label"
                                role={undefined}
                                variant="outlined"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Set thumbnail
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={handleImageChange}
                                    multiple
                                />
                            </Button>
                            <Button variant='contained' onClick={handleSetThumbnail}>Submit</Button>
                        </div>
                        <span>Preview</span>
                        <div className='relative flex items-center gap-x-1 p-2 border-[#d3d3d3] border-[2px]'>
                            {upload.loading ?
                                <div className='w-[150px] h-[100px] flex'>
                                    <CircularProgress className='m-auto'></CircularProgress>
                                </div>
                                :
                                <img className='w-[150px] h-[100px] object-cover  rounded-md' src={upload?.url || 'https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg'}></img>
                            }
                            <div className='flex flex-col gap-y-2'>
                                <span className='font-semibold'>{title}</span>
                                <span className='text-md flex items-center'>
                                    Post by :
                                    <div className='flex items-center px-4 gap-x-1'>
                                        <Avatar src={auth?.userDetail?.avatar}></Avatar>
                                        <Typography variant='subtitle1'>{auth?.userDetail?.name}</Typography>
                                    </div>
                                </span>
                                <span>Create at: {formattedDateTime}</span>
                                <Chip className={`z-30 absolute -top-2 -right-2`} sx={{ bgcolor: 'red' }} label={field} variant='contained' />
                            </div>
                        </div>
                    </div>
                    <img className='w-[60%] h-[400px] border-[#d3d3d3] border-[2px] rounded-md mx-auto object-cover' src={thumbnailUrl || upload?.url || 'https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg'} alt='News Thumbnail'>
                    </img>
                </div>
                <div className='p-10 min-h-[200px]'>
                    <ReactQuill
                        ref={(el) => {
                            if (el) {
                                window.quillEditorRef = el.getEditor(); // Reference to editor for image insertion
                            }
                        }}
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        modules={modules}
                    />
                </div>
                <Button className='w-full' variant='contained' onClick={handleCreateNews}>Save news</Button>
            </div >
        }
    </>

};

export default TextEditor;
