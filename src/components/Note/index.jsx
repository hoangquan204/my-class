import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAuthSelector, getClassRoomSelector, getNoteSelector, getThemeSelector } from "../../redux/selector";
import { useEffect, useState } from "react";
import { createNote, getListNote } from "./noteSlice";
import notificationSlice from "../Notification/notificationSlice";
import moment from "moment";
import MoreIcon from '@mui/icons-material/MoreVert';
import NoteCreationModal from "./NoteCreationModal";
import ReactQuill from "react-quill";
import Comment from "../Comment";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getListComment } from "../Comment/commentSlice";

function Note({ classRoomId }) {
    const note = useSelector(getNoteSelector)
    const auth = useSelector(getAuthSelector)
    const theme = useSelector(getThemeSelector)
    const classRoom = useSelector(getClassRoomSelector)

    const [expandedId, setExpandedId] = useState(null); // State to track the open Accordion

    const handleAccordionChange = (panelId) => {
        setExpandedId(expandedId === panelId ? null : panelId);
    };

    useEffect(() => {
        dispatch(getListComment(expandedId))
    }, [expandedId])

    const [content, setContent] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('classRoomId: ', classRoomId)
        dispatch(getListNote(classRoomId))
    }, [dispatch])

    const [selectedClassRoom, setSelectedClassRoom] = useState({})

    useEffect(() => {
        const result = classRoom?.listAll?.find((item) => {
            console.log('item: ', item)
            return item.id === parseInt(classRoomId)
        })
        setSelectedClassRoom(result)
    }, [])

    return <Box>
        {
            auth?.userDetail?.id === selectedClassRoom?.teacher?.id &&
            <div className="py-2 text-center">
                <NoteCreationModal classRoomId={classRoomId}></NoteCreationModal>
            </div>
        }
        <Box className='flex flex-col gap-y-2 py-4'>
            {Array.isArray(note?.list) && note.list.length > 0 ?
                [...note.list]
                    .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
                    .map((item) => {
                        const specificDateTime = moment(item.createAt);
                        const formattedDateTime = specificDateTime.format('DD-MM-YYYY HH:mm:ss');
                        return <Box className='border-[#d3d3d3] rounded-md border p-2'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-x-1'>
                                    <Avatar src={item.user.avatar}></Avatar>
                                    <div className='flex flex-col'>
                                        <Typography sx={{ fontWeight: 'bold' }} className='text-primary text-center rounded-md px-2'>{item.user.name}</Typography>
                                        <Typography variant="caption">{formattedDateTime}</Typography>
                                    </div>
                                </div>
                                <IconButton>
                                    <MoreIcon></MoreIcon>
                                </IconButton>
                            </div>
                            <div class='px-8 py-2'>
                                <ReactQuill
                                    ref={(el) => {
                                        if (el) {
                                            window.quillEditorRef = el.getEditor();
                                        }
                                    }}
                                    readOnly={true}
                                    modules={{ toolbar: false }} // Tắt thanh công cụ
                                    theme="snow"
                                    value={item.content}
                                    style={{ height: '100%' }}
                                />
                            </div>
                            <Divider></Divider>
                            <Accordion
                                expanded={expandedId === item.id}
                                onChange={() => handleAccordionChange(item.id)} // Toggle accordion open/close
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography component="span">Để lại bình luận</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Comment noteId={item.id}></Comment>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    }) : (
                    <Box
                        className="flex flex-col items-center justify-center"
                        sx={{ textAlign: "center", color: theme.palette.textColor.main, py: 4 }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Chưa có thông báo nào!
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 2 }}>
                            Hãy theo dõi thường xuyên để nhận được thông báo mới nhé.
                        </Typography>
                    </Box>
                )}
        </Box>
    </Box>
}

export default Note;