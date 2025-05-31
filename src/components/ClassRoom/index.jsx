import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAuthSelector, getClassRoomSelector, getThemeSelector, getUploadFileSelector } from "../../redux/selector";
import { useEffect, useState } from "react";
import { createClassRoom, getListAllClassRoom, getListClassRoom } from "./classRoomSlice"
import ClassRoomCard from "./ClassRoomCard";
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadFile } from "../../others/UploadFile/uploadSlice";
import notificationSlice from "../Notification/notificationSlice";
import { useNavigate } from "react-router-dom";
import BreadcrumbsCustom from "../BreadcrumbsCustom/BreadcrumbsCustom";
import AuthModal from "../User/AuthModal"

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
    const theme = useSelector(getThemeSelector)
    const auth = useSelector(getAuthSelector)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getListClassRoom())
        dispatch(getListAllClassRoom())
    }, [dispatch])

    const [open, setOpen] = useState(false)

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [description, setDescription] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [type, setType] = useState('thumbnail')
    const [field, setField] = useState('')

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
            thumbnail: thumbnail ? thumbnail : 'https://cdn.pixabay.com/photo/2023/08/01/17/59/french-bulldog-8163486_640.jpg',
            avatar,
            description,
            password,
            field: field ? field : 'Khác'
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
        setField('')
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
                <Typography className='p-2 text-center text-primary' sx={{ fontSize: '1.1rem' }}>Tạo lớp học</Typography>
                <div className='flex items-end gap-x-2 my-2'>
                    <Box className='w-[60%] flex flex-col gap-y-2'>
                        <TextField id="outlined-basic" value={name} label="Tên lớp học" variant="outlined" onChange={(e) => {
                            setName(e.target.value)
                        }} />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Lĩnh vực</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={field}
                                label="Lĩnh vực"
                                onChange={(e) => {
                                    setField(e.target.value)
                                }}
                            >
                                <MenuItem value={'Giáo dục'}>Giáo dục</MenuItem>
                                <MenuItem value={'Khoa học'}>Khoa học</MenuItem>
                                <MenuItem value={'Công nghệ'}>Công nghệ</MenuItem>
                                <MenuItem value={'Khác'}>Khác</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="flex items-center gap-2">
                            <TextField id="outlined-basic" value={password} label="Mật khẩu" variant="outlined" onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                            <Button
                                component="label"
                                role={undefined}
                                variant="outlined"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Ảnh bìa
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={(e) => {
                                        handleImageChange(e, 'thumbnail')
                                    }}
                                    multiple
                                />
                            </Button>
                        </div>
                        <TextField id="outlined-basic" value={description} multiline rows={5} label="Mô tả" variant="outlined" onChange={(e) => {
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
                <Button className='w-full' variant="contained" onClick={handleCreateClassRoom}>TẠO</Button>
            </Box>
        </Modal>
    )

    const breadcumbs = [
        {
            title: 'Trang chủ',
            path: '/'
        }
    ]

    return <Box className='p-4'>
        <BreadcrumbsCustom secondary={breadcumbs} primary={'Lớp học'} />
        {auth.username ?
            <>
                {createClassRoomModal}
                <div className='flex items-center justify-between'>
                    <Typography className='text-primary border-l-4 border-l-primary' >
                        <span className='text-xl font-semibold px-1'>Lớp học của bạn</span>
                    </Typography>
                    <div className='flex items-center gap-x-2'>
                        <Tooltip title='Tìm lớp học'>
                            <Button variant='outlined' onClick={(() => {
                                navigate("/list-class")
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
                    {Array.isArray(classRoom?.list) && classRoom.list.length > 0 ? classRoom?.list?.map((item) => {
                        return <ClassRoomCard isMember={true} classRoom={item}></ClassRoomCard>
                    }) : (
                        <Box
                            className="flex flex-col items-center justify-center"
                            sx={{ textAlign: "center", color: theme.palette.textColor.main, py: 4 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Bạn chưa tham gia lớp học nào!
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                Hãy tìm kiếm lớp học yêu thích ngay.
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    navigate("/list-class");
                                }}
                            >
                                Tìm kiếm lớp học
                            </Button>
                        </Box>
                    )
                    }
                </div>
            </> :
            <Box className="mt-6 flex flex-col items-center justify-center text-center">
                <Typography className="subtitle1 mb-2">
                    Bạn cần đăng nhập để lập lịch học
                </Typography>
                <div className='w-[100px] bg-primary m-2 rounded-md'>
                    <AuthModal />
                </div>
            </Box>
        }

    </Box >
}

export default Class;