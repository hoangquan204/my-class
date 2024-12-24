import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Alert, Typography, Grid, Stack, TextField, LinearProgress, Snackbar, FormLabel, RadioGroup, FormControlLabel, Radio, Accordion, AccordionSummary, AccordionDetails, Avatar, requirePropFactory, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Select, MenuItem } from '@mui/material'
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signUp } from './authSlice';
import { getAuthSelector, getThemeSelector } from '../../redux/selector';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import notificationSlice from '../Notification/notificationSlice';
import { provinces } from '../../others/Provinces';
import { getListMessage } from '../Message/messageSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid',
    boxShadow: 24,
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

    return (
        <div>
            <Button onClick={handleOpen} variant='contained'>Sign in</Button>
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
                            <Box className='flex items-center justify-center'>
                                <img className='w-10 h-10' src={require('../../images/logoMyClass.png')}></img>
                                <Typography sx={{ color: `${theme.palette.textColor.main}` }} className='px-2' >
                                    Sign in
                                </Typography>
                            </Box>
                            <TextField id="username" label="Username" variant="outlined"
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                            />
                            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                            >Submit</Button>
                            <Typography sx={{ color: `${theme.palette.textColor.main}` }} variant="subtitle2" gutterBottom >
                                Forgot password?
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom
                                sx={{ color: `${theme.palette.textColor.main}` }}
                                onClick={() => {
                                    setOpenFormLogin('none')
                                    setOpenFormRegister('block')
                                }}
                            >
                                Sign up for an account
                            </Typography>
                        </Stack>
                    </Box>
                    <Box sx={{ display: openFormRegister }} key="formRegister" >
                        <Box className='flex items-center justify-center pb-5'>
                            <img className='w-10 h-10' src={require('../../images/logoMyClass.png')}></img>
                            <Typography variant='subtitle1' sx={{ color: `${theme.palette.textColor.main}` }} className='px-2'>Sign up</Typography>
                        </Box>
                        <Grid container spacing={4} className='py-2'>
                            <Grid item xs={6}>
                                <Stack row spacing={2}>
                                    <TextField id="signup_username" label="Username" value={username} variant="outlined"
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                        }}
                                    />
                                    <TextField id="signup_password" type='password' value={password} label="Password" variant="outlined"
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                    />
                                    <TextField id="confirm_password" type='password' value={confirmPassword} label="Confirm password" variant="outlined"
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value)
                                        }}
                                    />
                                    <TextField id="name" label="Full name" value={name} variant="outlined"
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                    />
                                    <TextField id="phone_number" label='Phone number' type="tel" variant="outlined"
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
                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
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
                                        }} control={<Radio value='female' />} label="Female" />
                                        <FormControlLabel value="male" sx={{
                                            '& .MuiFormControlLabel-label': {
                                                color: `${theme.palette.textColor.main}`,  // Change this to the desired color
                                            },
                                        }} control={<Radio value='male' />} label="Male" />
                                        <FormControlLabel value="other" sx={{
                                            '& .MuiFormControlLabel-label': {
                                                color: `${theme.palette.textColor.main}`,  // Change this to the desired color
                                            },
                                        }} control={<Radio value='other' />} label="Other" />
                                    </RadioGroup>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Address</InputLabel>
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
                                        Sign in
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Button className='w-full' variant="contained"
                            onClick={handleRegister}
                        >Submit</Button>
                    </Box>
                </Box>
            </Modal>
        </div >
    );
}