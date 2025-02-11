import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSelector, getThemeSelector } from '../../redux/selector';
import authSlice, { sendOTP, signIn } from './authSlice';
import { TextField, CircularProgress } from '@mui/material';
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

export default function ForgotPasswordModal() {
    const auth = useSelector(getAuthSelector);
    const [open, setOpen] = React.useState(false);
    const [inputUsername, setInputUsername] = React.useState('');
    const [inputOtp, setInputOtp] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const dispatch = useDispatch();
    const theme = useSelector(getThemeSelector);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        console.log('password: ', auth.otp);
        if (auth.otp)
            setOpen(true)
    }, [auth.otp])

    const handleSubmit = () => {
        if (!inputOtp.trim()) {
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Vui lòng nhập mã xác thực!'
            }));
            return;
        }

        if (auth.otp === parseInt(inputOtp)) {
            dispatch(notificationSlice.actions.showNotification({
                type: 'success',
                message: 'Mã xác thực chính xác!'
            }));
            dispatch(authSlice.actions.resetOtp())
            dispatch(signIn({
                username: auth.usernameOTP,
                otp: inputOtp
            }))
            setTimeout(handleClose, 1000); // Đóng modal sau 1 giây
        } else {
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Mã xác thực không chính xác!'
            }));
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="flex flex-col gap-3 mt-2">
                        <Typography>Vui lòng kiểm tra email của bạn để nhập mã xác thực!</Typography>
                        <TextField
                            id="otp"
                            value={inputOtp}
                            label="Mã xác thực"
                            variant="filled"
                            onChange={(e) => setInputOtp(e.target.value)}
                        />
                        <div className="flex items-center justify-evenly">
                            <Button
                                variant="outlined"
                                // onClick={handleSendOTP}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={20} /> : "Gửi lại"}
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={!inputOtp.trim()}
                            >
                                Xác nhận
                            </Button>
                        </div>

                    </div>
                </Box>
            </Modal>
        </div>
    );
}
