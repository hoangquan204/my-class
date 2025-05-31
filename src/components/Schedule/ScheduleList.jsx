import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Paper,
    Divider,
} from "@mui/material";
import ScheduleTimeline from "./ScheduleTimeLine";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ScheduleList({ schedules }) {
    const today = new Date();
    const isToday = (date) =>
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    return (
        <Paper elevation={2} className="p-4 max-w-4xl mx-auto mt-6">
            <Typography variant="h6" className="mb-4 font-bold text-center">
                Danh sách lịch học
            </Typography>
            <List style={{ maxHeight: 800, overflowY: 'auto' }}>
                {Array.isArray(schedules) && schedules.map((schedule, index) => {
                    const scheduleDate = new Date(schedule.start);
                    const todaySchedule = isToday(scheduleDate);

                    return (
                        <React.Fragment key={schedule.id}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id={`panel${index}-header`}
                                >
                                    <ListItem alignItems="flex-start" className="block">
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    variant="subtitle1"
                                                    className={`font-semibold ${todaySchedule ? "text-primary" : ""}`}
                                                >
                                                    📅 {todaySchedule ? 'Lịch hôm nay' : `Lịch học ngày: ${scheduleDate.toLocaleDateString('vi-VN')}`}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography
                                                    variant="body2"
                                                    className="text-gray-600"
                                                    component="div"
                                                >
                                                    <span>{schedule.description}</span>
                                                    <br />
                                                    <span>
                                                        Bắt đầu lúc:{" "}
                                                        {scheduleDate.toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}{" "}
                                                        | Nghỉ mỗi {schedule.breakAfterMinutes} phút, nghỉ {schedule.breakDuration} phút
                                                    </span>
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ScheduleTimeline schedule={schedule} />
                                </AccordionDetails>
                            </Accordion>
                            {index < schedules.length - 1 && <Divider />}
                        </React.Fragment>
                    );
                })}
            </List>
        </Paper>
    );
}

export default ScheduleList;
