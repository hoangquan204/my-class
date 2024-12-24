import TextEditor from "../../TextEditor";
import { Avatar, Box, Button, Modal, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import ListNews from "../../News/ListNews";
import { useDispatch, useSelector } from "react-redux";
import { getNewsSelector } from "../../../redux/selector";
import { useEffect, useState } from "react";
import { getListNews } from "../../News/newsSlice";
import { styled } from '@mui/material/styles';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from "react-router-dom";
import moment from 'moment';

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
    width: '70%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflowY: 'auto',  // Corrected this line
    maxHeight: '90vh',  // Added maxHeight to ensure scrolling works when content is large
    borderRadius: '6px',
    p: 4,
};


function News() {
    const news = useSelector(getNewsSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListNews())
    }, [])

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('')
    const handleOpen = () => { setOpen(true) }
    const handleClose = () => { setOpen(false) }

    const newsModal = (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className='bg-gray-200 p-10 rounded-sm min-h-[500px] w-full' dangerouslySetInnerHTML={{ __html: content }} />
            </Box>
        </Modal>
    )

    return <>
        <Box className='container mx-auto'>
            {newsModal}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Thumbnail</StyledTableCell>
                            <StyledTableCell >Title</StyledTableCell>
                            <StyledTableCell >Field</StyledTableCell>
                            <StyledTableCell >Create at</StyledTableCell>
                            <StyledTableCell >Post by</StyledTableCell>
                            <StyledTableCell ></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(news?.list) && news?.list?.map((item) => {
                            const specificDateTime = moment(item.createAt);
                            const formattedDateTime = specificDateTime.format('DD-MM-YYYY HH:mm:ss')
                            return <TableRow>
                                <StyledTableCell >
                                    <img className='w-[150px] h-[70px] object-cover' src={item.thumbnail}></img>
                                </StyledTableCell>
                                <StyledTableCell >{item.title}</StyledTableCell>
                                <StyledTableCell >{item.field}</StyledTableCell>
                                <StyledTableCell >{formattedDateTime}</StyledTableCell>
                                <StyledTableCell >
                                    <div className='flex items-center gap-x-2'>
                                        <Avatar src={item.user.avatar}></Avatar>
                                        <span className='text-md'>{item.user.name}</span>
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button variant='outlined' onClick={() => {
                                        setContent(item.content)
                                        setOpen(true)
                                    }}>Show content</Button>
                                </StyledTableCell>
                            </TableRow>
                        })}
                        <TableRow className='flex justify-end'>
                            <StyledTableCell align="right">
                                <Button sx={{ color: 'white' }} startIcon={<CreateIcon></CreateIcon>} variant="contained" onClick={() => {
                                    navigate("/admin/news/text-editor")
                                }}>Text editor</Button>
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </>
}

export default News;