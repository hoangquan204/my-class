import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import FeedbackIcon from '@mui/icons-material/Feedback';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function MenuAdmin() {
    const navigate = useNavigate()
    return (
        <Box sx={{ width: 250 }} role="presentation" >
            <List>
                <ListItem key={'Thống kê'} disablePadding onClick={() => {
                    navigate("/admin")
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <BarChartIcon></BarChartIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Thống kê'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Lớp học'} disablePadding onClick={() => {
                    navigate("/admin/classroom")
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <ClassIcon></ClassIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Lớp học'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Người dùng'} disablePadding onClick={() => {
                    navigate("/admin/user")
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PersonIcon></PersonIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Người dùng'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Phản hồi'} disablePadding onClick={() => {
                    navigate("/admin/feedback")
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <FeedbackIcon></FeedbackIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Phản hồi'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}