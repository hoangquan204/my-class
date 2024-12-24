import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getAuthSelector, getMessageSelector, getThemeSelector } from '../../redux/selector';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, Divider, Icon, IconButton, Stack, TextField } from '@mui/material';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { createMessage, getListMessage } from './messageSlice';
import SendIcon from '@mui/icons-material/Send';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import notificationSlice from '../Notification/notificationSlice';

export default function GroupChat({ classRoomId }) {
    const [content, setContent] = React.useState('')

    const dispatch = useDispatch()

    const message = useSelector(getMessageSelector)
    const auth = useSelector(getAuthSelector)
    const theme = useSelector(getThemeSelector)

    React.useEffect(() => {
        dispatch(getListMessage(classRoomId))
    }, [dispatch, auth])

    const handleSendMessage = () => {
        if (content) {
            dispatch(createMessage({ content, classRoomId }))
            dispatch(notificationSlice.actions.showNotification({
                type: 'success',
                message: 'Send message successfully!'
            }))
            setContent('')
        }
        else
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'You have not written a message!'
            }))
    }



    return (
        <Box>
            <Typography variant='h6' className='bg-primary w-full text-white p-2 rounded-sm'>Group chat</Typography>
            <Box className='h-[450px] w-full py-2 px-4 flex flex-col gap-y-3 overflow-scroll' row>
                {Array.isArray(message.list) && message.list.map((item) => {
                    const specificDateTime = moment(item.createAt);
                    // Định dạng ngày giờ
                    const formattedDateTime = specificDateTime.format('DD-MM-YYYY HH:mm:ss');
                    return <div className={`flex flex-col ${item.user?.id === auth.userDetail?.id ? 'items-end' : ''}`}>
                        <Box sx={{ display: 'inline-block' }}>
                            <div className='flex items-center gap-x-1'>
                                {item.user?.id !== auth.userDetail?.id && <Avatar src={item.user.avatar}></Avatar>}
                                <Typography sx={{ display: 'inline-block', color: '#fff' }} className='bg-primary px-2 rounded-md' >{item.content}</Typography>
                            </div>
                        </Box>
                        <Typography className={`text-[${theme.palette.textColor.main}]`} variant='caption'>{formattedDateTime}</Typography>
                    </div>
                })}
            </Box>
            <div className='px-2 py-4 flex items-center'>
                <TextField value={content} className='w-full' id="standard-basic" label="Write message here ..." variant="standard" onChange={(e) => {
                    setContent(e.target.value)
                }} />
                <IconButton color={content.length > 0 ? 'primary' : ''} onClick={handleSendMessage}>
                    <SendIcon></SendIcon>
                </IconButton>
            </div>
        </Box>
    )
}