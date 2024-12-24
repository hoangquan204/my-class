import { Box, Button, FormControl, IconButton, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAuthSelector, getCommentSelector, getThemeSelector } from "../../redux/selector";
import { useEffect, useState } from "react";
import { createComment, getListComment } from "./commentSlice";
import moment from "moment";
import SendIcon from '@mui/icons-material/Send';
import notificationSlice from "../Notification/notificationSlice";

function Comment({ newsId }) {
    const [content, setContent] = useState('')

    const comment = useSelector(getCommentSelector)
    const auth = useSelector(getAuthSelector)
    const theme = useSelector(getThemeSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListComment(newsId))
    }, [])

    const handleSendComment = () => {
        if (content) {

            const data = {
                content,
                newsId,
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
        <Typography variant='h5' className='px-1 border-l-4 border-primary text-primary py-2' >
            Comments
        </Typography>
        <Box className={`bg-[${theme.palette.containerColor.main}] text-[${theme.palette.textColor.main}] rounded-md p-4 mt-1`}>
            {Array.isArray(comment?.list) && comment?.list?.map((item) => {
                const specificDateTime = moment(item.createAt);
                // Định dạng ngày giờ
                const formattedDateTime = specificDateTime.format('DD-MM-YYYY HH:mm:ss');
                console.log(formattedDateTime);

                return <div className={`flex flex-col ${item.user.id === auth.userDetail.id ? 'items-end' : ''}`}>
                    <Box sx={{ display: 'inline-block' }}>
                        <Typography sx={{ display: 'inline-block' }} className={` bg-primary px-2 rounded-md`} >{item.content}</Typography>
                    </Box>
                    <Typography variant='caption'>{formattedDateTime}</Typography>
                </div>
            })}
        </Box>
        {auth.username === '' && <Typography className='py-2' variant="subtitle1">You need to login to post a comment.</Typography>}
        <div className='flex justify-between gap-x-2 py-2'>
            <TextField disabled={auth.username === '' ? 'disabled' : ''} value={content} className='w-[95%]' id="standard-basic" label="Write comment here ..." variant="standard" onChange={(e) => {
                setContent(e.target.value)
            }} />
            <IconButton color={content.length > 0 ? 'primary' : ''} onClick={handleSendComment}>
                <SendIcon></SendIcon>
            </IconButton>
        </div>
    </Box>
}

export default Comment;