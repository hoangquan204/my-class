import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getAuthSelector, getMessageSelector, getThemeSelector } from '../../redux/selector';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, TextField } from '@mui/material';
import { createMessage, getListMessage } from './messageSlice';
import SendIcon from '@mui/icons-material/Send';
import moment from 'moment';
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
            <Typography className="bg-primary text-white p-2 rounded-md" variant="h6" gutterBottom>
                Group chat
            </Typography>
            <Box className='max-h-[450px] w-full py-2 px-4 flex flex-col gap-y-3 overflow-scroll' row>
                {Array.isArray(message.list) && message.list.length > 0 ? message.list.map((item) => {
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
                }) : (
                    <Box
                        className="flex flex-col items-center justify-center"
                        sx={{ textAlign: "center", color: theme.palette.textColor.main, py: 4 }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Chưa có tin nhắn nào!
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 2 }}>
                            Hãy nhắn tin để trao đổi kiến thức với bạn bè nhé.
                        </Typography>
                    </Box>
                )}
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