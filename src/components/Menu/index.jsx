import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSelector, getThemeSelector } from '../../redux/selector';
import themeSlice from '../../theme/themeSlice'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import HomeIcon from '@mui/icons-material/Home';
import CallIcon from '@mui/icons-material/Call';
import SecurityIcon from '@mui/icons-material/Security';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

export default function Menu() {
    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate()

    const myTheme = useSelector(getThemeSelector)

    const dispatch = useDispatch()

    const auth = useSelector(getAuthSelector)
    const theme = useSelector(getThemeSelector)

    const toggleDrawer = () => () => {
        setOpen(!open);
    };

    const handleTurnMode = () => {
        dispatch(themeSlice.actions.changeMode(theme.palette.mode === 'light' ? 'dark' : 'light'))
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation"
        >
            <List>
                <ListItem key={'Trang chủ'} disablePadding>
                    <ListItemButton onClick={(e) => {
                        navigate("/")
                    }}>
                        <ListItemIcon>
                            <HomeIcon></HomeIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Trang chủ'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Lớp học của bạn'} disablePadding>
                    <ListItemButton onClick={(e) => {
                        navigate("/class")
                    }}>
                        <ListItemIcon>
                            <ClassIcon></ClassIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Lớp học của bạn'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Danh sách lớp học'} disablePadding>
                    <ListItemButton onClick={(e) => {
                        navigate("/list-class")
                    }}>
                        <ListItemIcon>
                            <SchoolIcon></SchoolIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Danh sách lớp học'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Lập lịch học'} disablePadding>
                    <ListItemButton onClick={(e) => {
                        navigate("/schedule")
                    }}>
                        <ListItemIcon>
                            <WatchLaterIcon> </WatchLaterIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Lập lịch học'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Liên hệ'} disablePadding>
                    <ListItemButton onClick={(e) => {
                        navigate("/contact")
                    }}>
                        <ListItemIcon>
                            <CallIcon></CallIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Liên hệ'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Điều khoản dịch vụ'} disablePadding>
                    <ListItemButton onClick={(e) => {
                        navigate("/terms")
                    }}>
                        <ListItemIcon>
                            <SecurityIcon></SecurityIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Điều khoản dịch vụ'} />
                    </ListItemButton>
                </ListItem>
                {/* <ListItem key='Dark mode' disablePadding onClick={handleTurnMode}>
                    <ListItemButton>
                        <ListItemIcon>
                            {myTheme.palette.mode === 'light' ? <WbSunnyIcon></WbSunnyIcon> : <DarkModeIcon></DarkModeIcon>}
                        </ListItemIcon>
                        {myTheme.palette.mode === 'light' ? <ListItemText sx={{ color: `${theme.palette.textColor.main}` }} primary='Light mode' /> : <ListItemText sx={{ color: `${theme.palette.textColor.main}` }} primary='Dark mode' />}
                    </ListItemButton>
                </ListItem> */}
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
    );

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={toggleDrawer()}
            >
                <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}