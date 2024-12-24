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
import { api } from '../../../config/api';
import { Avatar, Box, Button, CircularProgress, Collapse, Divider, IconButton, LinearProgress, List, ListItem, ListItemText, Modal, Tooltip, Typography } from '@mui/material';
import { getListAccount, getListOrder } from '../adminSlice';
import { getAdminSelector, getThemeSelector } from '../../../redux/selector';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLineSeries } from '@mui/x-charts/hooks/useSeries';
import moment from 'moment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function Account() {
    const [waitOpenOrderHistoryId, setWaitOpenOrderHistoryId] = React.useState(0)
    const theme = useSelector(getThemeSelector)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        color: theme.palette.textColor.main,
        p: 4,
        borderRadius: '6px',
    };

    function Row({ item }) {
        const admin = useSelector(getAdminSelector)

        const [open, setOpen] = React.useState(false)
        const [userDetail, setUserDetail] = React.useState({})
        const [openOrderHistory, setOpenOrderHistory] = React.useState({})

        const handleToggle = (userId) => {
            if (!openOrderHistory[userId]) {
                dispatch(getListOrder(userId));
                setWaitOpenOrderHistoryId(userId)
            }
            // Toggle open/close state for the specific user's history table
            setOpenOrderHistory((prevState) => ({
                ...prevState,
                [userId]: false,
            }));
        };

        React.useEffect(() => {
            Object.keys(openOrderHistory).forEach((item) => {
                setOpenOrderHistory((prevState) => ({
                    ...prevState,
                    [item]: false
                }))
            })
            setOpenOrderHistory((prevState) => ({
                ...prevState,
                [waitOpenOrderHistoryId]: true
            }))
        }, [admin.success])



        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

        const modalInfo = (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <img className='rounded-md' src={userDetail.avatar} alt='Avatar'></img>
                    <List>
                        <ListItem disablePadding>
                            <ListItemText primary={<p className='font-semibold'>Name</p>} />
                            <ListItemText align='right' primary={userDetail.name} />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primary={<p className='font-semibold'>Gender</p>} />
                            <ListItemText align='right' primary={userDetail.gender} />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primary={<p className='font-semibold'>Address</p>} />
                            <ListItemText align='right' primary={userDetail.address} />
                        </ListItem>
                        <Divider></Divider>
                        <ListItem disablePadding>
                            <ListItemText primary={<p className='font-semibold'>Phone number</p>} />
                            <ListItemText align='right' primary={userDetail.phoneNumber} />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primary={<p className='font-semibold'>Email</p>} />
                            <ListItemText align='right' primary={userDetail.email} />
                        </ListItem>
                    </List>
                </Box>
            </Modal>
        )


        return (
            <React.Fragment>
                <StyledTableRow key={item.id}>
                    <StyledTableCell>{item.account.username}</StyledTableCell>
                    <StyledTableCell>{item.name}</StyledTableCell>
                    <StyledTableCell>{item.account.role}</StyledTableCell>
                    <StyledTableCell align='right'>
                        <Button variant='outlined' onClick={() => {
                            setUserDetail(item)
                            handleOpen()
                        }}>More detail</Button>
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                        <Tooltip title='Order History' >
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => {
                                    handleToggle(item.id)
                                }}
                            >
                                {openOrderHistory[item.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </Tooltip>
                    </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={openOrderHistory[item.id]} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography className='w-full bg-primary rounded-sm p-2 text-white' variant="subtitle1" gutterBottom component="div">
                                    Order History
                                </Typography>
                                <Typography>
                                    {admin.loading && <LinearProgress />}
                                </Typography>
                                {admin.listOrder.length === 0 ?
                                    <Typography align='center' variant='subtitle1'>No orders yet</Typography> :
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    {Array.isArray(admin.listOrder) && admin.listOrder.map((item) => {
                                                        const specificDateTime = moment(item.createAt);
                                                        // Định dạng ngày giờ
                                                        const formattedDateTime = specificDateTime.format('DD-MM-YYYY HH:mm:ss');
                                                        return <>
                                                            <div className='flex items-center justify-around gap-x-10'>
                                                                <img className='w-[100px] object-cover' src={item.laptop.image}></img>
                                                                <div className='flex flex-col justify-center py-2'>
                                                                    <Typography variant='subtitle1'><span className='font-semibold'>Name:</span> {item.laptop.name}</Typography>
                                                                    <div className='flex items-center gap-x-2'>
                                                                        <Typography><span className='font-semibold'>Branch:</span></Typography>
                                                                        <img className='w-[50px] h-[50px] object-cover' src={item.laptop.branch.logo}></img>
                                                                    </div>
                                                                </div>
                                                                <div className='flex flex-col justify-center '>
                                                                    <Typography variant='subbody1'><span className='font-semibold'>Type:</span> {item.laptop.type}</Typography>
                                                                    <Typography variant='subbody1'><span className='font-semibold'>Ram:</span> {item.laptop.ram}</Typography>
                                                                    <Typography variant='subbody1'><span className='font-semibold'>SSD:</span> {item.laptop.ssd}</Typography>
                                                                </div>
                                                                <div className='flex flex-col justify-center '>
                                                                    <Typography variant='subbody1'><span className='font-semibold'>Status:</span> {item.status}</Typography>
                                                                    <Typography variant='subbody1'><span className='font-semibold'>Payment:</span> {item.payment}</Typography>
                                                                    <Typography className='flex items-center gap-x-1' variant='subbody1'><span className='font-semibold'>Total price:</span><span className='font-bold'>{item.totalPrice}</span>
                                                                        <AttachMoneyIcon />
                                                                    </Typography>
                                                                </div>
                                                                <div className='flex items-center gap-x-2 '>
                                                                    <Button variant='outlined'>Show detail</Button>
                                                                </div>
                                                            </div>
                                                            <Typography variant='caption'>{formattedDateTime}</Typography>
                                                            <Divider></Divider>
                                                        </>
                                                    })}
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                    </Table>
                                }
                            </Box>
                        </Collapse>
                    </StyledTableCell>
                </StyledTableRow>
                {modalInfo}
            </React.Fragment>
        );
    }

    const admin = useSelector(getAdminSelector)

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getListAccount())
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >Username</StyledTableCell>
                        <StyledTableCell>Fullname</StyledTableCell>
                        <StyledTableCell >Role</StyledTableCell>
                        <StyledTableCell ></StyledTableCell>
                        <StyledTableCell ></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(admin?.listAccount) && admin?.listAccount?.map((item) => (
                        <Row item={item}></Row>
                        // <>
                        //     <StyledTableRow key={item.id}>
                        //         <StyledTableCell>{item.account.username}</StyledTableCell>
                        //         <StyledTableCell>{item.name}</StyledTableCell>
                        //         <StyledTableCell>{item.account.role}</StyledTableCell>
                        //         <StyledTableCell align='right'>
                        //             <Button variant='outlined' onClick={() => {
                        //                 setUserDetail(item)
                        //                 handleOpen()
                        //             }}>More detail</Button>
                        //         </StyledTableCell>
                        //         <StyledTableCell align='right'>
                        //             <Tooltip title='Lịch sử mua hàng' >
                        //                 <IconButton
                        //                     aria-label="expand row"
                        //                     size="small"
                        //                     onClick={toggleOpenHistoryTable}
                        //                 >
                        //                     {openHistoryTable ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        //                 </IconButton>
                        //             </Tooltip>
                        //         </StyledTableCell>
                        //     </StyledTableRow>
                        //     <StyledTableRow>
                        //         <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        //             <Collapse in={openHistoryTable} timeout="auto" unmountOnExit>
                        //                 <Box sx={{ margin: 1 }}>
                        //                     <Typography variant="h6" gutterBottom component="div">
                        //                         History
                        //                     </Typography>
                        //                     <Table size="small" aria-label="purchases">
                        //                         <TableHead>
                        //                             <TableRow>
                        //                                 <TableCell>Date</TableCell>
                        //                                 <TableCell>Customer</TableCell>
                        //                                 <TableCell align="right">Amount</TableCell>
                        //                                 <TableCell align="right">Total price ($)</TableCell>
                        //                             </TableRow>
                        //                         </TableHead>
                        //                         <TableBody>

                        //                         </TableBody>
                        //                     </Table>
                        //                 </Box>
                        //             </Collapse>
                        //         </StyledTableCell>
                        //     </StyledTableRow>
                        // </>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}