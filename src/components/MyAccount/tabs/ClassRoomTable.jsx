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
import { Avatar, Box, Button, Chip, List, ListItem, ListItemAvatar, ListItemText, Modal, TextField, Tooltip, Typography } from '@mui/material';
import { getClassRoomSelector } from '../../../redux/selector';
import { Card, CardContent, Grid } from "@mui/material";
import { getListAllClassRoom, getListClassRoom } from '../../ClassRoom/classRoomSlice';
import moment from 'moment';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

export default function ClassRoomTable() {
    const classRoom = useSelector(getClassRoomSelector)
    const [selectedClass, setSelectedClass] = React.useState({})

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getListClassRoom())
        dispatch(getListAllClassRoom())
    }, [dispatch])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const showDetailModal = (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Card className="shadow-lg p-4 border border-gray-200 rounded-lg">
                    <CardContent>
                        <Grid container spacing={2}>
                            {/* Thumbnail */}
                            <Grid item xs={12} sm={4}>
                                <img
                                    src={selectedClass?.thumbnail}
                                    alt={selectedClass?.name}
                                    className="w-full h-40 object-cover rounded-md"
                                />
                            </Grid>

                            {/* Class Info */}
                            <Grid item xs={12} sm={8}>
                                <Typography variant="h5" className="font-bold text-center text-primary mb-2">
                                    {selectedClass?.name}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Mô tả:
                                </Typography>
                                <Typography variant="body2" className="text-gray-600">
                                    {selectedClass?.description}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Tạo ngày:
                                </Typography>
                                <Typography variant="body2" className="text-gray-600">
                                    {moment(selectedClass?.createAt).format('DD-MM-YYYY HH:mm:ss')}
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Giáo viên:
                                </Typography>
                                {/* Teacher Info */}
                                <div className="flex items-center mt-4 justify-center">
                                    <Avatar
                                        src={selectedClass?.teacher?.avatar}
                                        alt={selectedClass?.teacher?.name}
                                        className="w-12 h-12 mr-3"
                                    />
                                    <div>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            {selectedClass?.teacher?.name}
                                        </Typography>
                                        <Typography variant="body2" className="text-gray-600">
                                            {selectedClass?.teacher?.email}
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>


                    </CardContent>
                </Card>
            </Box>
        </Modal>
    )

    return (
        <TableContainer component={Paper}>
            {showDetailModal}
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >Ảnh bìa</StyledTableCell>
                        <StyledTableCell>Tên</StyledTableCell>
                        <StyledTableCell >Giáo viên</StyledTableCell>
                        <StyledTableCell >Ngày tạo</StyledTableCell>
                        <StyledTableCell ></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(classRoom?.listAll) &&
                        classRoom?.list?.map((item) => (
                            <>
                                <TableRow>
                                    <StyledTableCell >
                                        <img className='w-[200px] h-[150px] rounded-md object-cover' src={item?.thumbnail}></img>
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        {item?.name}
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        <div className='flex items-center gap-2' >
                                            <Avatar src={item?.teacher?.avatar}></Avatar>
                                            <div className='flex flex-col'>
                                                <Typography>{item?.teacher?.name}</Typography>
                                                <Typography variant='caption'>{item?.teacher?.email}</Typography>
                                            </div>
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        {moment(item?.createAt).format('DD-MM-YYYY HH:mm:ss')}
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        <Button variant='outlined' onClick={() => {
                                            setSelectedClass(item)
                                            handleOpen()
                                        }}>
                                            Chi tiết
                                        </Button>
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCell colSpan={5} align='center'>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <Typography component="span">{`${item?.members.length} thành viên`}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <List>
                                                    {item?.members.map((member, index) => (
                                                        <ListItem
                                                            key={index}
                                                            sx={{
                                                                borderBottom: "1px solid #ddd",
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                            }}
                                                        >
                                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                                <ListItemAvatar>
                                                                    <Avatar src={member.avatar} alt={member.name}>
                                                                        {member.name[0]}
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={
                                                                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                                                            {member.name}
                                                                        </Typography>
                                                                    }
                                                                    secondary={
                                                                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                                            {member.email || "Không có email"}
                                                                        </Typography>
                                                                    }
                                                                />
                                                            </Box>
                                                            <Chip
                                                                label="Học  viên"
                                                                color="success"
                                                                variant="outlined"
                                                            />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </AccordionDetails>
                                        </Accordion>
                                    </StyledTableCell>
                                </TableRow>
                            </>
                        ))}
                </TableBody>
            </Table >
        </TableContainer >
    );
}