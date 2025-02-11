import { Avatar, Box, IconButton, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAuthSelector, getCommentSelector, getThemeSelector } from "../../redux/selector";
import { useState } from "react";
import { createComment } from "./commentSlice";
import moment from "moment";
import SendIcon from '@mui/icons-material/Send';
import notificationSlice from "../Notification/notificationSlice";

function Comment({ noteId }) {
    const [content, setContent] = useState('')

    const comment = useSelector(getCommentSelector)
    const auth = useSelector(getAuthSelector)
    const theme = useSelector(getThemeSelector)

    const dispatch = useDispatch()

    const handleSendComment = () => {
        if (content) {
            const data = {
                content,
                noteId,
            }
            dispatch(createComment(data))
            dispatch(notificationSlice.actions.showNotification({
                type: 'success',
                message: 'Send comment successfully!'
            }))
            setContent('')
        } else
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Comment content is null!'
            }))
    }

    return <Box className='w-full p-2'>
        {auth.username === '' && <Typography className='py-2' variant="subtitle1">You need to login to post a comment.</Typography>}
        <div className='flex justify-between gap-x-2 py-2'>
            <TextField disabled={auth.username === '' ? 'disabled' : ''} value={content} className='w-[95%]' id="standard-basic" label="Viết bình luận..." variant="standard" onChange={(e) => {
                setContent(e.target.value)
            }} />
            <IconButton color={content.length > 0 ? 'primary' : ''} onClick={handleSendComment}>
                <SendIcon></SendIcon>
            </IconButton>
        </div>
        <Box className={`bg-[${theme.palette.containerColor.main}] text-[${theme.palette.textColor.main}] rounded-md p-4 mt-1`}>
            {Array.isArray(comment?.list) && comment?.list?.map((item) => {
                const specificDateTime = moment(item.createAt);
                // Định dạng ngày giờ
                const formattedDateTime = specificDateTime.format('DD-MM-YYYY HH:mm:ss');
                return <div className="flex items-center gap-2">
                    <Avatar src={item?.user?.avatar}></Avatar>
                    <div className={`flex flex-col`}>
                        <Box sx={{ display: 'inline-block' }}>
                            <Typography sx={{ display: 'inline-block' }} className={` bg-primary text-white p-2 rounded-md`} >{item.content}</Typography>
                        </Box>
                        <Typography variant='caption'>{formattedDateTime}</Typography>
                    </div>
                </div>
            })}
        </Box>
    </Box>
}

export default Comment;