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
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Chip, CircularProgress, Collapse, Divider, IconButton, LinearProgress, List, ListItem, ListItemText, Modal, TextField, Tooltip, Typography } from '@mui/material';
import { getAdminSelector, getAuthSelector, getThemeSelector } from '../../../redux/selector';
import notificationSlice from '../../Notification/notificationSlice';
import { createFeedbackReply } from '../../Contact/feedbackSlice';
import moment from 'moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getListFeedbackByUser } from '../../User/authSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export default function FeedbackTable() {
    const auth = useSelector(getAuthSelector)

    const [activeFeedback, setActiveFeedback] = React.useState({})
    const [title, setTittle] = React.useState('Phản hồi từ admin My class!')
    const [content, setContent] = React.useState('')

    React.useEffect(() => {
        dispatch(getListFeedbackByUser())
    }, [])

    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        dispatch(getListFeedbackByUser())
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Tiêu đề</StyledTableCell>
                        <StyledTableCell>Trạng thái</StyledTableCell>
                        <StyledTableCell>Ngày tạo</StyledTableCell>
                        <StyledTableCell>Nội dung</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(auth?.listFeedback) &&
                        [...auth?.listFeedback]?.sort((a, b) => new Date(b?.createAt) - new Date(a?.createAt))
                            ?.map((item) => (
                                <>
                                    <TableRow>
                                        <StyledTableCell >
                                            {item?.title}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            <Chip label={item?.status} color={'success'} variant={item?.status === 'Đã trả lời' ? 'outlined' : 'contained'}></Chip>
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