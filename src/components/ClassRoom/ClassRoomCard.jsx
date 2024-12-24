import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Avatar, Chip, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSelector } from '../../redux/selector';
import { addMember, getListAllClassRoom } from './classRoomSlice';
import notificationSlice from '../Notification/notificationSlice';
import { useNavigate } from 'react-router-dom';

export default function ClassRoomCard({ classRoom }) {
    const auth = useSelector(getAuthSelector)

    const navigate = useNavigate()

    return (
        <Card className='relative' sx={{ width: '300px', height: '500px' }} >
            {classRoom.teacher.account.username === auth.username ?
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
                <CardContent>
                    <div className='flex items-center justify-between gap-x-2 py-2'>
                        <div className='flex flex-col gap-y-1'>
                            <Typography className='bg-primary text-[#fff] text-center rounded-md px-2' gutterBottom variant="h5" component="div">
                                {classRoom.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {classRoom.description}
                            </Typography>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <span className='font-semibold'>Giáo viên: </span>
                            <div className='flex items-center gap-x-1'>
                                <Avatar src={classRoom.teacher.avatar}></Avatar>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {classRoom.teacher.name}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <Divider></Divider>
                </CardContent>
            </CardActionArea>
            <CardActions className='flex justify-end'>
                <Button variant='outlined' color="primary" onClick={() => {
                    navigate(`/class/${classRoom.id}`)
                }}>
                    Vào lớp
                </Button>
            </CardActions>
        </Card>
    );
}