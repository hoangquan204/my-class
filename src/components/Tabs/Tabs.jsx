import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Note from '../Note';
import MemberList from '../MemberList';
import Lesson from '../Lesson';
import Exercise from '../Exercise';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({ classRoom }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log('Tabs: ', classRoom)

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Bài giảng" {...a11yProps(0)} />
                    <Tab label="Bài tập" {...a11yProps(1)} />
                    <Tab label="Thông báo" {...a11yProps(2)} />
                    <Tab label="Thành viên" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Lesson classRoomId={classRoom?.id}></Lesson>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1} sx={{ display: 'flex' }}>
                <Exercise classRoomId={classRoom.id}></Exercise>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Note classRoomId={classRoom?.id}></Note>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <MemberList members={classRoom?.members} teacher={classRoom?.teacher}></MemberList>
            </CustomTabPanel>
        </Box>
    );
}