import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, Modal, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAuthSelector, getClassRoomSelector, getUploadFileSelector } from "../../redux/selector";
import { useEffect, useState } from "react";
import { createClassRoom, getListClassRoom } from "./classRoomSlice"
import ClassRoomCard from "./ClassRoomCard";
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import { BorderRight } from "@mui/icons-material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useLineSeries } from "@mui/x-charts/hooks/useSeries";
import { uploadFile } from "../../others/UploadFile/uploadSlice";
import notificationSlice from "../Notification/notificationSlice";
import { useNavigate } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    BorderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

function Class() {
    const classRoom = useSelector(getClassRoomSelector)
    const upload = useSelector(getUploadFileSelector)

    console.log(classRoom)
    const auth = useSelector(getAuthSelector)
    console.log(auth)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getListClassRoom())
    }, [dispatch])

    const [open, setOpen] = useState(false)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [type, setType] = useState('thumbnail')

    const toggleOpenCreateClassRoomModal = () => {
        setOpen(!open)
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleImageChange = (event, type) => {
        const file = event.target.files[0];
        setType(type)
        //Upload to cloundinary
        if (file !== null) {
            const formData = new FormData();
            formData.append('file', file)
            dispatch(uploadFile(formData))
        } else {
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Selected file is null!'
            }))
        }
    };

    useEffect(() => {
        if (type === 'thumbnail')
            setThumbnail(upload.url)
        else
            setAvatar(upload.url)
        console.log(type)
    }, [upload?.success])

    const handleCreateClassRoom = () => {
        const data = {
            name,
            thumbnail,
            avatar,
            description
        }
        console.log(data)
        dispatch(createClassRoom(data))
        dispatch(notificationSlice.actions.showNotification({
            type: 'success',
            message: 'Tạo lớp học thành công!'
        }))
        setName('')
        setAvatar('')
        setThumbnail('')
        setDescription('')
        toggleOpenCreateClassRoomModal()
    }

    const createClassRoomModal = (
        <Modal
            open={open}
            onClose={toggleOpenCreateClassRoomModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography className='p-2 text-center text-primary' sx={{ fontSize: '1.1rem' }}>Create class room</Typography>
                <div className='flex items-end gap-x-2 my-2'>
                    <Box className='w-[60%] flex flex-col gap-y-2'>
                        <TextField id="outlined-basic" value={name} label="Name" variant="outlined" onChange={(e) => {
                            setName(e.target.value)
                        }} />
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
                                onChange={(e) => {
                                    handleImageChange(e, 'thumbnail')
                                }}
                                multiple
                            />
                        </Button>
                        <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Set avatar
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(e) => {
                                    handleImageChange(e, 'avatar')
                                }}
                                multiple
                            />
                        </Button>
                        <TextField id="outlined-basic" value={description} multiline rows={5} label="Description" variant="outlined" onChange={(e) => {
                            setDescription(e.target.value)
                        }} />
                    </Box>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <div className='relative'>
                                {type === 'thumbnail' && upload.loading ?
                                    <div className='w-[400px] h-[400px] flex'>
                                        <CircularProgress className='m-auto'></CircularProgress>
                                    </div>
                                    :
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        className='h-[200px] object-cover'
                                        image={thumbnail || 'https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg'}
                                        alt="green iguana"
                                    />
                                }
                                {type === 'avatar' && upload.loading ?
                                    <div className='absolute flex rounded-sm h-[70px] w-[70px] -bottom-4 left-2'>
                                        <CircularProgress className='m-auto' ></CircularProgress>
                                    </div>
                                    :
                                    <img className='absolute h-[70px] w-[70px] rounded-full -bottom-4 left-2' src={avatar || 'https://cdn.pixabay.com/photo/2023/10/30/01/31/duck-8351436_640.jpg'}></img>
                                }
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
                <Button className='w-full' variant="contained" onClick={handleCreateClassRoom}>Create</Button>
            </Box>
        </Modal>
    )

    return <Box className='p-4'>
        {createClassRoomModal}
        <div className='flex items-center justify-between'>
            <Typography className='text-primary border-l-4 border-l-primary' >
                <span className='text-xl font-semibold px-1'>Lớp học của bạn</span>
            </Typography>
            <div className='flex items-center gap-x-2'>
                <Tooltip title='Tìm lớp học'>
                    <Button variant='outlined' onClick={(() => {
                        navigate("/class")
                    })}>
                        <SearchIcon></SearchIcon>
                    </Button>
                </Tooltip>
                <Tooltip title='Tạo lớp học'>
                    <Button variant='contained' onClick={toggleOpenCreateClassRoomModal}>
                        <AddBoxIcon></AddBoxIcon>
                    </Button>
                </Tooltip>
            </div>
        </div>
        <div className='flex items-center justify-around gap-x-2 gap-y-2 flex-wrap'>
            {Array.isArray(classRoom?.list) && classRoom?.list?.map((item) => {
                return <ClassRoomCard classRoom={item}></ClassRoomCard>
            })}
        </div>
    </Box>
}

export default Class;