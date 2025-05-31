import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Typography, Grid, Stack, TextField, LinearProgress, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Select, MenuItem } from '@mui/material'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authSlice, { sendOTP, signIn, signUp } from './authSlice';
import { getAuthSelector, getThemeSelector } from '../../redux/selector';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import notificationSlice from '../Notification/notificationSlice';
import { provinces } from '../../others/Provinces';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    pt: 2,
    px: 4,
    pb: 3,
};

export default function LoginModal() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState()

    const [open, setOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [openFormLogin, setOpenFormLogin] = useState('block')
    const [openFormRegister, setOpenFormRegister] = useState('none')

    const dispatch = useDispatch()

    const auth = useSelector(getAuthSelector);
    const theme = useSelector(getThemeSelector)
    console.log(theme.palette.textColor.main)

    const handleSignIn = () => {
        if (username === '') {
            console.log('username is empty!')
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Username is not empty!'
            }))
        }
        else if (password === '') {
            console.log('password is empty!')
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Password is not empty!'
            }))
        } else {
            console.log({ username, password })
            dispatch(signIn({
                username,
                password
            }))
        }
    }

    const handleRegister = () => {
        const data = {
            username,
            password,
            name,
            gender,
            phoneNumber,
            email,
            address,
            avatar: 'https://cdn.pixabay.com/photo/2023/12/11/12/51/lynx-8443540_640.jpg',
        }
        console.log(data)
        dispatch(signUp(data))
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(notificationSlice.actions.showNotification({
            type: 'success',
            message: auth.message
        }))
        handleClose()
    }, [auth.message])

    const handleSendOTP = () => {
        console.log('username: ', username);
        if (!username.trim()) {
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Vui lòng nhập tên đăng nhập!'
            }));
            return;
        }

        try {
            console.log({ username })
            dispatch(sendOTP({ username: username }))
            dispatch(authSlice.actions.setUsernameOTP(username))
            dispatch(notificationSlice.actions.showNotification({
                type: 'success',
                message: 'Mã xác thực đã được gửi qua email!'
            }));
        } catch (error) {
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Gửi mã thất bại, vui lòng thử lại!'
            }));
        }
    };

    const handleForgotPassword = () => {
        if (!username)
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Vui lòng điền tên đăng nhập để lấy lại mật khẩu!'
            }));
        else
            handleSendOTP()
    }

    return (
        <div>
            <Button sx={{ whiteSpace: "nowrap", color: 'white' }}
                onClick={handleOpen}>Đăng nhập</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, borderRadius: '8px' }} >
                    {auth.loading &&
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    }
                    <Box sx={{ display: openFormLogin }} key="formLogin">
                        <Stack row spacing={2}>
                            {/* {isLoading && <LinearProgress sx={{ mb: 5 }} />} */}
                            <Typography sx={{ color: `${theme.palette.textColor.main}` }} className='px-2 text-center' >
                                Đăng nhập
                            </Typography>
                            <TextField id="username" label="Tên đăng nhập" variant="outlined"
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                            />
                            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => {
                                                    setShowPassword(!showPassword)
                                                }}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <Button variant="contained"
                                onClick={handleSignIn}
                            >Xác nhận</Button>
                            <Typography sx={{ color: `${theme.palette.textColor.main}` }} variant="subtitle2" gutterBottom onClick={handleForgotPassword} >
                                Quên mật khẩu?
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom
                                sx={{ color: `${theme.palette.textColor.main}` }}
                                onClick={() => {
                                    setOpenFormLogin('none')
                                    setOpenFormRegister('block')
                                }}
                            >
                                Đăng ký tài khoản
                            </Typography>
                        </Stack>
                    </Box>
                    <Box sx={{ display: openFormRegister }} key="formRegister" >
                        <Typography variant='subtitle1' sx={{ color: `${theme.palette.textColor.main}` }} className='px-2 text-center'>Đăng ký tài khoản</Typography>
                        <Grid container spacing={4} className='py-2'>
                            <Grid item xs={6}>
                                <Stack row spacing={2}>
                                    <TextField id="signup_username" label="Tên đăng nhập" value={username} variant="outlined"
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                        }}
                                    />
                                    <TextField id="signup_password" type='password' value={password} label="Mật khẩu" variant="outlined"
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                    />
                                    <TextField id="confirm_password" type='password' value={confirmPassword} label="Nhập lại mật khẩu" variant="outlined"
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value)
                                        }}
                                    />
                                    <TextField id="name" label="Họ và tên" value={name} variant="outlined"
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                    />
                                    <TextField id="phone_number" label='Số điện thoại' type="tel" variant="outlined"
                                        onChange={(e) => {
                                            setPhoneNumber(e.target.value)
                                        }}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack row spacing={2}>
                                    <TextField id="email" type="email" label='Email' variant="outlined"
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                    />
                                    <FormLabel id="demo-radio-buttons-group-label">Giới tính</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        row
                                        onChange={(e) => {
                                            setGender(e.target.value)
                                        }}
                                    >
                                        <FormControlLabel value="female" sx={{
                                            '& .MuiFormControlLabel-label': {
                                                color: `${theme.palette.textColor.main}`,  // Change this to the desired color
                                            },
                                        }} control={<Radio value='female' />} label="Nữ" />
                                        <FormControlLabel value="male" sx={{
                                            '& .MuiFormControlLabel-label': {
                                                color: `${theme.palette.textColor.main}`,  // Change this to the desired color
                                            },
                                        }} control={<Radio value='male' />} label="Nam" />
                                        <FormControlLabel value="other" sx={{
                                            '& .MuiFormControlLabel-label': {
                                                color: `${theme.palette.textColor.main}`,  // Change this to the desired color
                                            },
                                        }} control={<Radio value='other' />} label="Khác" />
                                    </RadioGroup>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Địa chỉ</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={address}
                                            label="Address"
                                            onChange={(e) => {
                                                setAddress(e.target.value)
                                            }}
                                        >
                                            {provinces.map((province, index) => {
                                                return <MenuItem key={`province_${index}`} value={province}>{province}</MenuItem>
                                            })}

                                        </Select>
                                    </FormControl>
                                    <Typography variant="subtitle2" gutterBottom
                                        sx={{ color: `${theme.palette.textColor.main}` }}
                                        onClick={() => {
                                            setOpenFormLogin('block')
                                            setOpenFormRegister('none')
                                        }}
                                    >
                                        Đăng nhập
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Button className='w-full' variant="contained"
                            onClick={handleRegister}
                        >Xác nhận</Button>
                    </Box>
                </Box>
            </Modal>
        </div >
    );
}