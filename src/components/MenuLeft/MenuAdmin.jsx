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
import { useNavigate } from 'react-router-dom';

export default function MenuAdmin() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open)
    };

    const navigate = useNavigate()

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem key={'charts'} disablePadding onClick={() => {
                    setMenu('Charts')
                    navigate("/admin")
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <BarChartIcon></BarChartIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Charts'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'accounts'} disablePadding onClick={() => {
                    setMenu('Accounts')
                    navigate("/admin/account")
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountBoxIcon></AccountBoxIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Accounts'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'users'} disablePadding onClick={() => {
                    setMenu('Users')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <GroupIcon></GroupIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Users'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'message'} disablePadding onClick={() => {
                    setMenu('Message')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <MessageIcon></MessageIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Message'} />
                    </ListItemButton>
                </ListItem>
                <Divider></Divider>
                <ListItem key={'warehouse'} disablePadding onClick={() => {
                    setMenu('Warehouse')
                    navigate('/admin/warehouse')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <WarehouseIcon></WarehouseIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Warehouse'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Revenue'} disablePadding onClick={() => {
                    setMenu('Revenue')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <MonetizationOnIcon></MonetizationOnIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Revenue'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'discount'} disablePadding onClick={() => {
                    setMenu('Discount')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <SellIcon></SellIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Discount'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'sell'} disablePadding onClick={() => {
                    setMenu('Sell')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <StoreIcon></StoreIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Sell'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'home_page'} disablePadding onClick={() => {
                    navigate("/")
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon></HomeIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Home page'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>Open drawer</Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}