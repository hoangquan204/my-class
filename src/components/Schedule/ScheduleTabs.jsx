import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Grid, Paper, Typography } from "@mui/material";
import ScheduleCreationModal from "./ScheduleCreationModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthSelector, getScheduleSelector } from "../../redux/selector";
import { getListSchedule } from "./scheduleSlice";
import ScheduleTimeline from "./ScheduleTimeLine";
import ScheduleList from "./ScheduleList";
import ScheduleChart from "./ScheduleChart";
import ScheduleAnalytics from './ScheduleAnalytics';
import ScheduleAdvice from './ScheduleAdvice';

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

export default function ScheduleTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const schedule = useSelector(getScheduleSelector);
    const [todaySchedule, setTodaySchedule] = useState(null);
    const auth = useSelector(getAuthSelector)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListSchedule());
    }, [dispatch]);

    useEffect(() => {
        if (Array.isArray(schedule.list)) {
            const today = new Date();

            const todaySchedules = schedule.list.filter((item) => {
                const itemDate = new Date(item.start);
                return (
                    itemDate.getDate() === today.getDate() &&
                    itemDate.getMonth() === today.getMonth() &&
                    itemDate.getFullYear() === today.getFullYear()
                );
            });

            // Sắp xếp giảm dần theo thời gian bắt đầu và lấy bản mới nhất
            todaySchedules.sort((a, b) => new Date(b.start) - new Date(a.start));
            setTodaySchedule(todaySchedules[0] || null);
        }
    }, [schedule.list]);

    // Giả sử schedule.list là danh sách lịch học từ Redux
    const learningStats = Array.isArray(schedule.list) ? schedule.list.map(sch => {
        const date = new Date(sch.start).toLocaleDateString('vi-VN');
        const totalMinutes = sch.scheduleItemResponseList.reduce((sum, item) => sum + item.duration, 0);
        return { date, totalMinutes };
    }) : []

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Lịch học" {...a11yProps(0)} />
                    <Tab label="Hiệu suất" {...a11yProps(1)} />
                    <Tab label="Lời khuyên" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Grid container className="mt-6">
                    <Grid item xs={12} md={7} className="flex flex-col gap-4">
                        <Paper elevation={2} className="p-4 max-w-4xl mx-auto">
                            <ScheduleCreationModal className="my-2" />
                            <Typography variant="h6" className="mb-2 font-bold text-center">
                                Lịch học hôm nay
                            </Typography>
                            {todaySchedule ? (
                                <ScheduleTimeline schedule={todaySchedule} />
                            ) : (
                                <Typography variant="body1" className="text-center">
                                    Không có lịch học cho hôm nay.
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={5} className="flex flex-col gap-4">
                        <ScheduleList schedules={[...schedule.list].sort((a, b) => new Date(b.start) - new Date(a.start))} />
                    </Grid>
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Grid container spacing={2} className="mt-6">
                    <Grid item xs={12}>
                        <ScheduleChart data={learningStats} />
                    </Grid>
                    <Grid item xs={12}>
                        <ScheduleAnalytics></ScheduleAnalytics>
                    </Grid>
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Grid container spacing={2} className="mt-6">
                    <Grid item xs={12}>
                        <ScheduleAdvice></ScheduleAdvice>
                    </Grid>
                </Grid>
            </CustomTabPanel>
        </Box>
    );
}