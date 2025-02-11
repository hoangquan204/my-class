import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Avatar, Box, Chip, Modal, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSelector, getThemeSelector } from '../../redux/selector';
import { addMember } from './classRoomSlice';
import notificationSlice from '../Notification/notificationSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

export default function ClassRoomCard({ isMember, classRoom }) {
    const auth = useSelector(getAuthSelector)
    const [selectedClass, setSelectedClass] = useState({})
    const [classRoomPassword, setClassRoomPassword] = useState('')

    const theme = useSelector(getThemeSelector)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setClassRoomPassword('')
        setOpen(false)
    };

    const dispatch = useDispatch()

    const handleAddMember = () => {
        if (auth.username) {
            if (selectedClass?.password === classRoomPassword) {
                const data = {
                    classRoomId: selectedClass.id,
                    password: classRoomPassword
                }
                dispatch(addMember(data))
                dispatch(notificationSlice.actions.showNotification({
                    type: 'success',
                    message: 'Join the class successfully!'
                }))
                navigate("/class")
            } else
                dispatch(notificationSlice.actions.showNotification({
                    type: 'error',
                    message: 'Mã lớp học không đúng!'
                }))
        } else
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Bạn chưa đăng nhập!'
            }))
    }

    const classRoomPasswordModal = (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='flex flex-col items-center gap-y-2' sx={{ ...style, width: 400 }}>
                <Typography sx={{ color: theme.palette.textColor.main }} variant='h5'>Nhập mã lớp học</Typography>
                <TextField value={classRoomPassword} className='w-full' id="filled-basic" label={'Nhập mã lớp:'} variant="filled" onChange={(e) => {
                    setClassRoomPassword(e.target.value)
                }} />
                <Button variant='contained' onClick={handleAddMember}>Tham gia</Button>
            </Box>
        </Modal>
    )

    const handleGetClass = (item) => {
        if (item.status === 'disable')
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Lớp học đã bị vô hiệu hóa!'
            }))
        else
            navigate(`/class/${item.id}`)
    }

    const handleJoinClass = (item) => {
        if (item.status === 'disable')
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Lớp học đã bị vô hiệu hóa!'
            }))
        else {
            if (auth.username) {
                setSelectedClass(item)
                handleOpen()
            } else
                dispatch(notificationSlice.actions.showNotification({
                    type: 'error',
                    message: 'Bạn chưa đăng nhập!'
                }))
        }
    }

    const navigate = useNavigate()

    return (
        <Card className='relative' sx={{ width: '300px' }} >
            {classRoomPasswordModal}
            {classRoom?.teacher?.account?.username === auth.username ?
                <Chip className='absolute top-2 right-2 z-20' color='info' label='Giáo viên'></Chip>
                :
                <Chip className='absolute top-2 right-2 z-20' color='warning' label='Học sinh'></Chip>
            }
            <CardActionArea>
                <img
                    className='h-[300px] w-[300px] object-cover'
                    src={classRoom.thumbnail}
                    alt="Thumbnail"
                />
                <CardContent sx={{ height: '150px' }}>
                    <div className='flex items-center justify-between gap-x-2 py-2'>
                        <div className='flex flex-col gap-y-1'>
                            <Typography
                                className='bg-primary text-[#fff] text-center rounded-md px-2'
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 2, // Số dòng giới hạn
                                }}
                            >
                                {classRoom.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {classRoom.description}
                            </Typography>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <span className='font-semibold'>Giáo viên: </span>
                            <div className='flex items-center gap-x-1'>
                                <Avatar src={classRoom?.teacher?.avatar}></Avatar>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {classRoom.teacher?.name}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions className='flex justify-end'>
                {isMember
                    ?
                    <Button variant='outlined' onClick={() => {
                        handleGetClass(classRoom)
                    }} >
                        Vào lớp
                    </Button>
                    :
                    <Button variant='outlined' onClick={() => {
                        handleJoinClass(classRoom)
                    }}>
                        Tham gia
                    </Button>
                }
            </CardActions>
        </Card>
    );
}