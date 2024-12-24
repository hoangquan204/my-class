import { Avatar, Box, Divider, IconButton, TextField, Typography } from "@mui/material";
import { getNodeText } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthSelector, getNoteSelector, getThemeSelector } from "../../redux/selector";
import { useEffect, useState } from "react";
import { createNote, getListNote } from "./noteSlice";
import { TypeSpecimenOutlined } from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send'
import notificationSlice from "../Notification/notificationSlice";
import moment from "moment";
import MoreIcon from '@mui/icons-material/MoreVert';



function Note({ classRoomId }) {
    const note = useSelector(getNoteSelector)
    const auth = useSelector(getAuthSelector)
    const theme = useSelector(getThemeSelector)

    const [content, setContent] = useState('')
    const [commentContent, setCommentContent] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('classRoomId: ', classRoomId)
        dispatch(getListNote(classRoomId))
    }, [dispatch])

    const handleCreateNote = () => {
        if (content) {
            dispatch(createNote({ content, classRoomId }))
            dispatch(notificationSlice.actions.showNotification({
                type: 'success',
                message: 'Send note successfully!'
            }))
            setContent('')
        }
        else
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'You have not written a note!'
            }))
    }

    const handleCreateComment = () => {

    }

    return <Box>
        <div className='w-full flex items-center gap-x-2 justify-center'>
            <TextField className='w-[90%]' id="filled-basic" label="Thông báo cho lớp của bạn" variant="filled" value={content} onChange={(e) => {
                setContent(e.target.value)
            }} />
            <IconButton onClick={handleCreateNote}>
                <SendIcon className={`text-${content.length > 0 && 'primary'}`}></SendIcon>
            </IconButton>
        </div>
        <Box className='flex flex-col gap-y-2 py-4'>
            {Array.isArray(note?.list) && note.list.map((item) => {
                const specificDateTime = moment(item.createAt);
                const formattedDateTime = specificDateTime.format('DD-MM-YYYY HH:mm:ss');
                return <Box className='border-[#d3d3d3] rounded-md border p-2'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-x-1'>
                            <Avatar src={item.user.avatar}></Avatar>
                            <div className='flex flex-col'>
                                <Typography className='bg-primary text-white text-center rounded-md px-2'>{item.user.name}</Typography>
                                <Typography variant="caption">{formattedDateTime}</Typography>
                            </div>
                        </div>
                        <IconButton>
                            <MoreIcon></MoreIcon>
                        </IconButton>
                    </div>
                    <p className={`py-2 text-[${theme.palette.textColor.main}]`}>
                        {item.content}
                    </p>
                    <Divider></Divider>
                    <div className='p-2 flex items-center justify-center gap-x-2'>
                        <Avatar src={auth.userDetail.avatar}></Avatar>
                        <TextField className='w-[80%]' id="standard-basic" label="Thêm nhận xét ..." variant="standard" onChange={(e) => {
                            setCommentContent(e.target.value)
                        }} />
                        <IconButton onClick={handleCreateComment}>
                            <SendIcon className={`text-${commentContent.length > 0 && 'primary'}`}></SendIcon>
                        </IconButton>
                    </div>
                </Box>
            })}
        </Box>
    </Box>
}

export default Note;