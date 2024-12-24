import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../images/logoMyClass3.png';
import MenuLeft from '../MenuLeft';
import AuthModal from '../User/AuthModal'
import { Avatar, Chip, Divider, List, ListItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSelector, getThemeSelector } from '../../redux/selector';
import Settings from '@mui/icons-material/Settings';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import authSlice from '../User/authSlice';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Header() {
    const auth = useSelector(getAuthSelector)
    const theme = useSelector(getThemeSelector)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false)

    const toggleOpen = () => {
        setOpen(!open)
    };

    const handleClose = () => {
        setOpen(false)
    }

    const handleLogout = () => {
        dispatch(authSlice.actions.logOut())
        navigate("/")
    }

    console.log(theme.palette.containerColor.main)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <MenuLeft></MenuLeft>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            onClick={() => {
                                navigate("/")
                            }}
                        >
                            <img className='w-[50px] h-[50px]' src={logo}></img>
                        </Typography>
                    </div>
                    {/* <div className='flex items-center'>
                        <div className=' flex flex-wrap items-center gap-x-2'>
                            {laptopTypes.map((item) => {
                                return <div className='hover:bg-black hover:text-primary transition-all cursor-pointer text-black px-2 py-1  border border-black  rounded-md'>{item.name}</div>
                            })}
                        </div>
                    </div> */}
                    <div className='flex items-center'>
                        {auth.username ?
                            <div className='relative'>
                                <Avatar sx={{ width: 32, height: 32 }} onClick={toggleOpen} src={auth?.userDetail?.avatar}></Avatar>
                                {open &&
                                    <div className={`bg-gray-300 text-black transition-all min-w-[170px] absolute top-10 z-30 rounded-md`} >
                                        <div className='flex cursor-pointer transition-all items-center gap-x-2 hover:bg-gray-400 p-2 rounded-md' onClick={() => {
                                            handleClose()
                                            navigate("/my-account")
                                        }}>
                                            <AccountBoxIcon></AccountBoxIcon>
                                            My account
                                        </div>
                                        <div className='flex cursor-pointer transition-all items-center gap-x-2 hover:bg-gray-400 p-2 rounded-md' onClick={() => {
                                            navigate("/my-cart")
                                            handleClose()
                                        }}>
                                            <ShoppingCartIcon></ShoppingCartIcon>
                                            My cart
                                        </div>
                                        <Divider />
                                        <div className='flex cursor-pointer transition-all items-center gap-x-2 hover:bg-gray-400 p-2 rounded-md' onClick={handleClose}>
                                            <PersonAdd fontSize="small" />
                                            Add another account
                                        </div>
                                        <div className='flex cursor-pointer transition-all items-center gap-x-2 hover:bg-gray-400 p-2 rounded-md' onClick={handleClose}>
                                            <Settings fontSize="small" />
                                            Settings
                                        </div>
                                        <div className='flex cursor-pointer transition-all items-center gap-x-2 hover:bg-gray-400 p-2 rounded-md' onClick={handleLogout}>
                                            <Logout fontSize="small" />
                                            Logout
                                        </div>
                                    </div>
                                }
                            </div>
                            : <AuthModal></AuthModal>}
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}