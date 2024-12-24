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

export default function TemporaryDrawer() {
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
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem key='Dark mode' disablePadding onClick={handleTurnMode}>
                    <ListItemButton>
                        <ListItemIcon>
                            {myTheme.palette.mode === 'light' ? <WbSunnyIcon></WbSunnyIcon> : <DarkModeIcon></DarkModeIcon>}
                        </ListItemIcon>
                        {myTheme.palette.mode === 'light' ? <ListItemText primary='Light mode' /> : <ListItemText primary='Dark mode' />}
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
                            <ListItemText>
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