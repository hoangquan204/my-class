import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../User/authSlice';
import { TextField } from '@mui/material';
import notificationSlice from '../Notification/notificationSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

export default function UpdatePasswordModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [newPassword, setNewPassword] = React.useState('')
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('')

    const dispatch = useDispatch()

    const handleUpdatePassword = () => {
        if (!newPassword) {
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Chưa nhập mật khẩu'
            }))
            return
        }
        if (!confirmNewPassword) {
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Chưa nhập lại mật khẩu'
            }))
            return
        }
        if (newPassword !== confirmNewPassword) {
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Mật khẩu không khớp'
            }))
            return
        }

        const check = window.confirm("Bạn có chắc muốn đổi mật khẩu?")
        if (check) {

            dispatch(updatePassword({ newPassword }))
            dispatch(notificationSlice.actions.showNotification({
                type: 'success',
                message: 'Cập nhật mật khẩu thành công!'
            }))
            handleReset()
            handleClose()
        }
    }

    const handleReset = () => {
        setNewPassword('')
        setConfirmNewPassword('')
    }

    return (
        <div>
            <Button variant='outlined' onClick={handleOpen}>Đổi mật khẩu</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='flex flex-col gap-2'>
                        <Typography align='center'>Đổi mật khẩu</Typography>
                        <TextField id="signup_password" type='password' value={newPassword} label="Mật khẩu mới" variant="outlined"
                            onChange={(e) => {
                                setNewPassword(e.target.value)
                            }}
                        />
                        <TextField id="confirm_password" type='password' value={confirmNewPassword} label="Nhập lại mật khẩu mới" variant="outlined"
                            onChange={(e) => {
                                setConfirmNewPassword(e.target.value)
                            }}
                        />
                        <div className='flex items-center justify-center gap-2'>
                            <Button variant='outlined' onClick={handleReset}>Đặt lại</Button>
                            <Button variant='contained' onClick={handleUpdatePassword}>Xác nhận</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}