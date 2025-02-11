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
import { Avatar, Box, Button, Chip, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import { getListUser, setDisableStatusAccount, setEnableStatusAccount } from '../adminSlice';
import { getAdminSelector } from '../../../redux/selector';
import { Card, CardContent, Grid } from "@mui/material";
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import notificationSlice from '../../Notification/notificationSlice';
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

export default function Users() {
    const admin = useSelector(getAdminSelector)
    const [selectedUser, setSelectedUser] = React.useState({})

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getListUser())
    }, [])

    const navigate = useNavigate()

    const handleSetDisableStatus = (username) => {
        const check = window.confirm(`Bạn có chắc muốn vô hiệu hóa tài khoản ${username}?`)
        if (check) {
            dispatch(setDisableStatusAccount(username))
            dispatch(notificationSlice.actions.showNotification({
                type: 'success',
                message: 'Vô hiệu hóa tài khoản thành công!'
            }))
            navigate("/admin")
        }
    }

    const handleSetEnableStatus = (username) => {
        const check = window.confirm(`Bạn có chắc muốn kích hoạt lại tài khoản ${username}?`)
        if (check) {
            dispatch(setEnableStatusAccount(username))
            dispatch(notificationSlice.actions.showNotification({
                type: 'success',
                message: 'Kích hoạt tài khoản thành công!'
            }))
            navigate("/admin")
        }
    }

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
                <Card className="shadow-lg p-4">
                    <CardContent>
                        {/* Ảnh đại diện */}
                        <div className="flex justify-center mb-4">
                            <Avatar
                                alt={selectedUser?.name}
                                src={selectedUser?.avatar}
                                sx={{ width: 100, height: 100 }}
                            />
                        </div>

                        {/* Thông tin chi tiết */}
                        <Typography variant="h5" className="text-center text-primary font-bold">
                            {selectedUser?.name}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            className="text-center text-gray-500 mb-4"
                        >
                            Vai trò: {selectedUser?.account?.role}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Email:
                                </Typography>
                                <Typography variant="body2" className="text-gray-600">
                                    {selectedUser?.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Số điện thoại:
                                </Typography>
                                <Typography variant="body2" className="text-gray-600">
                                    {selectedUser?.phoneNumber}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Giới tính:
                                </Typography>
                                <Typography variant="body2" className="text-gray-600">
                                    {selectedUser?.gender}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Tên đăng nhập:
                                </Typography>
                                <Typography variant="body2" className="text-gray-600">
                                    {selectedUser?.account?.username}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Địa chỉ:
                                </Typography>
                                <Typography variant="body2" className="text-gray-600">
                                    {selectedUser?.address}
                                </Typography>
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
                        <StyledTableCell >Ảnh đại diện</StyledTableCell>
                        <StyledTableCell>Tên đăng nhập</StyledTableCell>
                        <StyledTableCell >Email</StyledTableCell>
                        <StyledTableCell >Số điện thoại</StyledTableCell>
                        <StyledTableCell >Trạng thái</StyledTableCell>
                        <StyledTableCell ></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(admin?.listUser) &&
                        admin.listUser?.map((item) => (
                            <>
                                <TableRow>
                                    <StyledTableCell >
                                        <Avatar src={item?.avatar}></Avatar>
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        {item?.account?.username}
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        {item?.email}
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        {item?.phoneNumber}
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        {item?.account?.status === 'enable' ?
                                            <Chip label='Hoạt động' color='primary'></Chip>
                                            :
                                            <Chip label='Vô hiệu'></Chip>
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell  >
                                        <div className='flex items-center gap-2'>
                                            {item?.account?.status === 'enable' ?
                                                <IconButton variant='outlined' color='error' onClick={() => {
                                                    handleSetDisableStatus(item?.account?.username)
                                                }}>
                                                    <Tooltip title='Vô hiệu hóa'>
                                                        <NoAccountsIcon></NoAccountsIcon>
                                                    </Tooltip>
                                                </IconButton>
                                                :
                                                <IconButton variant='outlined' color='primary' onClick={() => {
                                                    handleSetEnableStatus(item?.account?.username)
                                                }}>
                                                    <Tooltip title='Kích hoạt'>
                                                        <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                                                    </Tooltip>                                                </IconButton>
                                            }
                                            <Button variant='outlined' onClick={() => {
                                                setSelectedUser(item)
                                                handleOpen()
                                            }}>
                                                Chi tiết
                                            </Button>
                                        </div>
                                    </StyledTableCell>
                                </TableRow>
                            </>
                        ))}
                </TableBody>
            </Table >
        </TableContainer >
    );
}