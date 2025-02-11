import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { logo, logoDarkMode } from '../../others/DefaultImage';
import AuthModal from '../User/AuthModal'
import { Avatar, IconButton, InputAdornment, Modal, TextField, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSelector, getThemeSelector } from '../../redux/selector';
import authSlice from '../User/authSlice';
import { useNavigate } from 'react-router-dom';
import Menu from '../Menu';
import classRoomSlice from '../ClassRoom/classRoomSlice';
import { Mic } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchModal from '../ListClassRoom/SearchModal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline: 'none',
    p: 4,
    borderRadius: 5,
};

export default function Header() {
    const auth = useSelector(getAuthSelector)
    const theme = useSelector(getThemeSelector)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(authSlice.actions.logOut())
        dispatch(classRoomSlice.actions.refreshData())

        navigate("/")
    }

    console.log(theme.palette.containerColor.main)

    const [voiceSearch, setVoiceSearch] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const recognitionRef = React.useRef(null);

    const startVoiceRecognition = () => {
        setVoiceSearch(true);
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'vi-VN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognitionRef.current = recognition;

        recognition.start();

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            setSearchValue(speechResult);
            setIsOpen(true)
        };

        recognition.onspeechend = () => {
            recognition.stop();
            setVoiceSearch(false);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setVoiceSearch(false);
        };
    };

    const handleCloseVoiceSearch = () => {
        setVoiceSearch(false);
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    const voiceModal = (
        <Modal
            open={voiceSearch}
            onClose={handleCloseVoiceSearch}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div>
                    <Mic sx={{ fontSize: '5rem', color: `${theme.palette.primary.main}` }} />
                    <span className='voice'>
                        Đang nghe ...
                    </span>
                </div>
            </Box>
        </Modal>
    )

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleFocus = () => {
        setIsOpen(true);
    };

    return (
        <Box sx={{ flexGrow: 1 }} id='header'>
            {voiceModal}
            <AppBar position="static" sx={{ height: 80, display: 'flex' }} >
                <Toolbar sx={{ my: 'auto' }} className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <Menu></Menu>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            onClick={() => {
                                navigate("/")
                            }}
                        >
                            <img className='w-[200px] rounded-md' src={theme.palette.mode === 'light' ? logo : logoDarkMode} ></img>
                        </Typography>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <SearchModal></SearchModal>
                        {auth.username ?
                            <>
                                <IconButton onClick={() => {
                                    navigate("/my-account")
                                }}>
                                    <Tooltip title='Trang cá nhân' >
                                        <Avatar sx={{ width: 32, height: 32 }} src={auth?.userDetail?.avatar}></Avatar>
                                    </Tooltip>
                                </IconButton>
                                <IconButton sx={{ color: 'white' }} onClick={handleLogout}>
                                    <Tooltip title='Đăng xuất'>
                                        <LogoutIcon ></LogoutIcon>
                                    </Tooltip>
                                </IconButton>
                            </>
                            : <AuthModal></AuthModal>}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}