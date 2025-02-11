import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Chip, Modal, TextField, Typography } from '@mui/material';
import { getAdminSelector } from '../../../redux/selector';
import { getListFeedback } from '../adminSlice';
import ReplyIcon from '@mui/icons-material/Reply'
import notificationSlice from '../../Notification/notificationSlice';
import { createFeedbackReply } from '../../Contact/feedbackSlice';
import moment from 'moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

export default function Feedbacks() {
    const admin = useSelector(getAdminSelector)

    const [activeFeedback, setActiveFeedback] = React.useState({})
    const [title, setTittle] = React.useState('Phản hồi từ admin My class!')
    const [content, setContent] = React.useState('')

    React.useEffect(() => {
        dispatch(getListFeedback())
    }, [])

    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate()

    const handleCreateFeedbackReply = () => {
        if (content) {
            dispatch(createFeedbackReply({
                replyFeedbackId: activeFeedback.id,
                data: {
                    title,
                    content
                }
            }))
            dispatch(notificationSlice.actions.showNotification({
                type: 'success',
                message: 'Trả lời phản hồi thành công!'
            }))
            handleClose()
            navigate("/admin")
        } else
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Bạn chưa soạn nội dung trả lời!'
            }))
    }

    const replyFeedbackModal = (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className='space-y-4'>
                    <div className='flex items-center justify-center gap-x-2 w-full'>
                        <ReplyIcon></ReplyIcon>
                        <div className='border border-primary rounded-md'>
                            <div className='flex items-center justify-between'>
                                <span className='font-semibold rounded-md p-2'>Trả lời phản hồi cho: </span>
                                <div className='flex flex-col'>
                                    <Typography>{activeFeedback?.user?.name}</Typography>
                                    <Typography color='primary' variant='caption'>{activeFeedback?.user?.email}</Typography>
                                </div>
                            </div>

                            <div className='p-2'>
                                {activeFeedback.content}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col space-y-4 my-2'>
                        <TextField value={title} id="outlined-basic" label="Tiêu đề" variant="outlined"
                            onChange={(e) => {
                                setTittle(e.target.value)
                            }} />
                        <TextField value={content} id="outlined-basic" multiline rows={5} label="Nội dung" variant="outlined"
                            onChange={(e) => {
                                setContent(e.target.value)
                            }} />
                        <Button variant='contained' onClick={handleCreateFeedbackReply}>Gửi</Button>
                    </div>
                </div>
            </Box>
        </Modal>
    )

    return (
        <TableContainer component={Paper}>
            {replyFeedbackModal}
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >Người dùng</StyledTableCell>
                        <StyledTableCell>Trạng thái</StyledTableCell>
                        <StyledTableCell >Tiêu đề</StyledTableCell>
                        <StyledTableCell >Ngày tạo</StyledTableCell>
                        <StyledTableCell >Nội dung</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(admin?.listFeedback) &&
                        [...admin.listFeedback]?.sort((a, b) => new Date(b?.createAt) - new Date(a?.createAt))
                            ?.map((item) => (
                                <>
                                    <TableRow>
                                        < StyledTableCell >
                                            <div className='flex items-center gap-2'>
                                                <Avatar src={item?.user?.avatar}></Avatar>
                                                <div className='flex flex-col'>
                                                    <Typography>{item?.user?.name}</Typography>
                                                    <Typography color='primary' variant='caption'>{item?.user?.email}</Typography>
                                                </div>
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {item?.status === 'Chưa trả lời' ?
                                                <div className=''>
                                                    <Chip label={item?.status} color={'success'}></Chip>
                                                    <Button onClick={() => {
                                                        setActiveFeedback(item)
                                                        handleOpen()
                                                    }}>Trả lời ngay</Button>
                                                </div>
                                                :
                                                <Chip label={item?.status} color={'success'} variant='outlined'></Chip>
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell >
                                            {item?.title}
                                        </StyledTableCell>
                                        <StyledTableCell >
                                            {moment(item?.createAt).format('DD-MM-YYYY HH:mm:ss')}
                                        </StyledTableCell>
                                        <StyledTableCell >
                                            {item?.content}
                                        </StyledTableCell>
                                    </TableRow>
                                    {item?.status !== "Chưa trả lời" &&
                                        <TableRow>
                                            <StyledTableCell colSpan={5}>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1-content"
                                                        id="panel1-header"
                                                    >
                                                        <Typography component="span">{`Đã trả lời ngày: ${moment(item?.replyFeedback.createAt).format('DD-MM-YYYY HH:mm:ss')}`}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <div className='flex flex-col gap-2'>
                                                            <Typography component="span"><span className='font-semibold'>Tiêu đề: </span>{item?.replyFeedback.title}</Typography>
                                                            <Typography component="span"><span className='font-semibold'>Nội dung: </span>{item?.replyFeedback.content}</Typography>
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </StyledTableCell>
                                        </TableRow>
                                    }
                                </>
                            ))}
                </TableBody>
            </Table >
        </TableContainer >
    );
}