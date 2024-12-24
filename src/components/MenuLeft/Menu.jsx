import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { IconButton, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSelector, getThemeSelector } from '../../redux/selector';
import themeSlice from '../../theme/themeSlice'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import { Home } from '@mui/icons-material';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
function Menu() {
    const navigate = useNavigate()

    const myTheme = useSelector(getThemeSelector)

    const dispatch = useDispatch()

    const auth = useSelector(getAuthSelector)
    const theme = useSelector(getThemeSelector)

    const handleTurnMode = () => {
        dispatch(themeSlice.actions.changeMode(theme.palette.mode === 'light' ? 'dark' : 'light'))
    }

    return <Box className='hidden md:block' sx={{ width: 250 }} role="presentation"
    >
        <List>
            <ListItem key='My class' disablePadding onClick={() => {
                navigate("/")
            }}>
                <ListItemButton>
                    <ListItemIcon>
                        <SchoolIcon></SchoolIcon>
                    </ListItemIcon>
                    <ListItemText sx={{ color: `${theme.palette.textColor.main}` }} primary={'Lớp học của bạn'} />
                </ListItemButton>
            </ListItem>
            <ListItem key='Class list' disablePadding onClick={() => {
                navigate("/class")
            }}>
                <ListItemButton>
                    <ListItemIcon>
                        <LocalLibraryIcon></LocalLibraryIcon>
                    </ListItemIcon>
                    <ListItemText sx={{ color: `${theme.palette.textColor.main}` }} primary={'Danh sách lớp học'} />
                </ListItemButton>
            </ListItem>
            <ListItem key='Dark mode' disablePadding onClick={handleTurnMode}>
                <ListItemButton>
                    <ListItemIcon>
                        {myTheme.palette.mode === 'light' ? <WbSunnyIcon></WbSunnyIcon> : <DarkModeIcon></DarkModeIcon>}
                    </ListItemIcon>
                    {myTheme.palette.mode === 'light' ? <ListItemText sx={{ color: `${theme.palette.textColor.main}` }} primary='Light mode' /> : <ListItemText sx={{ color: `${theme.palette.textColor.main}` }} primary='Dark mode' />}
                </ListItemButton>
            </ListItem>
            {auth?.userDetail?.account?.role === 'ADMIN' &&
                <ListItem key='admin_page' disablePadding onClick={() => {
                    navigate("/admin")
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AdminPanelSettingsIcon></AdminPanelSettingsIcon>
                        </ListItemIcon>
                        <ListItemText sx={{ color: `${theme.palette.textColor.main}` }}>
                            Admin page
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            }
        </List>
    </Box>
}

export default Menu;