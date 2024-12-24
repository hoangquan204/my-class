import { useDispatch, useSelector } from "react-redux";
import { getAuthSelector, getOrderSelector } from "../../redux/selector";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Divider, Modal, Tab } from "@mui/material";
import UpdateModal from './UpdateModal'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { setAvatar } from "../User/authSlice";
import notificationSlice from "../Notification/notificationSlice";
import Tabs from './Tabs'
import BreadcrumbsCustom from "../BreadcrumbsCustom/BreadcrumbsCustom";

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
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '4px',
    p: 2,
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap'
});

function MyAccount() {
    const auth = useSelector(getAuthSelector)
    const order = useSelector(getOrderSelector)

    const [value, setValue] = React.useState(0)
    const [open, setOpen] = React.useState(false)
    const [avatarUrl, setAvatarUrl] = React.useState('')
    const [selectedFile, setSelectedFile] = React.useState(null)

    const toggleOpenAvatarModal = () => {
        setOpen(!open)
    }

    const dispatch = useDispatch()

    // Hàm xử lý khi chọn file
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file)
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Tạo URL từ file
            setAvatarUrl(imageUrl); // Lưu URL vào state
        }
    };

    const handleSetAvatar = () => {
        if (selectedFile !== null) {
            const formData = new FormData();
            formData.append('file', selectedFile)
            dispatch(setAvatar(formData))
            toggleOpenAvatarModal()
        } else {
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Selected file is null!'
            }))
        }

    }

    const setAvatarModal = (
        <Modal
            open={open}
            onClose={toggleOpenAvatarModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <img className=' border-[#d3d3d3] border-[2px] w-[300px] h-[300px] rounded-md mx-auto object-cover' src={avatarUrl || auth?.userDetail?.avatar} alt='Your avatar'></img>
                <div className='justify-center flex items-center gap-x-2 py-2'>
                    <Button
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleImageChange}
                            multiple
                        />
                    </Button>
                    <Button variant="contained" onClick={handleSetAvatar}>Submit</Button>
                </div>
            </Box>
        </Modal>
    )
    return <>
        {setAvatarModal}
        <Box className='container mx-auto py-10 flex flex-col'>
            <BreadcrumbsCustom secondary={[{
                title: 'Home',
                path: '/'
            }]} primary={'My-Account'}></BreadcrumbsCustom>
            <Box className='flex items-center gap-x-5 w-full mx-auto py-2'>
                <Box className='flex flex-col items-center gap-y-2'>
                    <img alt='No avatar' className='w-[200px] h-[200px] object-cover rounded-md' src={auth.userDetail.avatar}></img>
                    <Button variant='outlined' onClick={toggleOpenAvatarModal}>Set avatar</Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableBody>
                            <TableRow>
                                <StyledTableCell ><p className=' font-semibold'>Name: </p></StyledTableCell>
                                <StyledTableCell >{auth.userDetail.name}</StyledTableCell>
                                <StyledTableCell >
                                    <UpdateModal label='Name' id='name' value={auth.userDetail.name}></UpdateModal>
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell ><p className=' font-semibold'>Phone number: </p></StyledTableCell>
                                <StyledTableCell >{auth.userDetail.phoneNumber}</StyledTableCell>
                                <StyledTableCell >
                                    <UpdateModal label='Phone number' id='phoneNumber' value={auth.userDetail.phoneNumber}></UpdateModal>
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell ><p className=' font-semibold'>Gender: </p></StyledTableCell>
                                <StyledTableCell >{auth.userDetail.gender}</StyledTableCell>
                                <StyledTableCell >
                                    <UpdateModal label='Gender' id='gender' value={auth.userDetail.gender}></UpdateModal>
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell ><p className=' font-semibold'>Email: </p></StyledTableCell>
                                <StyledTableCell >{auth.userDetail.email}</StyledTableCell>
                                <StyledTableCell >
                                    <UpdateModal label='Email' id='email' value={auth.userDetail.email}></UpdateModal>
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell ><p className=' font-semibold'>Address: </p></StyledTableCell>
                                <StyledTableCell >{auth.userDetail.address}</StyledTableCell>
                                <StyledTableCell >
                                    <UpdateModal label='Address' id='address' value={auth.userDetail.address}></UpdateModal>
                                </StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer >
            </Box>
            <Tabs tab1={order.listOrder}></Tabs>
        </Box >
    </>
}

export default MyAccount;