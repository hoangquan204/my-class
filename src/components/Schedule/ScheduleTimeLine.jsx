import React from "react";
import { Card, CardContent, Typography, Box, ListItemText } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import { useDispatch } from "react-redux";
import notificationSlice from "../Notification/notificationSlice";

const formatTime = (date) => date.toTimeString().slice(0, 5);

const ScheduleTimeline = ({ schedule }) => {
    const [now, setNow] = React.useState(new Date());
    const [notifiedTasks, setNotifiedTasks] = React.useState([]);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 60 * 1000);
        return () => clearInterval(timer);
    }, []);

    // Nếu không có schedule, vẫn gọi hook nhưng không xử lý gì
    const timeline = React.useMemo(() => {
        if (!schedule) return [];

        const {
            start,
            breakAfterMinutes,
            breakDuration,
            scheduleItemResponseList,
        } = schedule;

        const list = [];
        let currentTime = new Date(start);
        let minutesSinceLastBreak = 0;

        for (let i = 0; i < scheduleItemResponseList?.length; i++) {
            const item = scheduleItemResponseList[i];
            let remainingDuration = item.duration;

            while (remainingDuration > 0) {
                if (minutesSinceLastBreak >= breakAfterMinutes) {
                    const breakStart = new Date(currentTime);
                    currentTime.setMinutes(currentTime.getMinutes() + breakDuration);
                    list.push({
                        task: "Nghỉ ngơi",
                        start: new Date(breakStart),
                        end: new Date(currentTime),
                        type: "break",
                    });
                    minutesSinceLastBreak = 0;
                }

                const timeToStudy = Math.min(remainingDuration, breakAfterMinutes - minutesSinceLastBreak);
                const taskStart = new Date(currentTime);
                currentTime.setMinutes(currentTime.getMinutes() + timeToStudy);

                list.push({
                    task: remainingDuration === item.duration ? item.name : `${item.name} (tiếp tục)`,
                    start: new Date(taskStart),
                    end: new Date(currentTime),
                    type: "study",
                });

                minutesSinceLastBreak += timeToStudy;
                remainingDuration -= timeToStudy;
            }
        }

        return list;
    }, [schedule]);

    // Gửi thông báo
    React.useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();

            timeline.forEach((item, index) => {
                const justStarted = Math.abs(now - item.start) < 60000;
                const alreadyNotified = notifiedTasks.includes(index);

                if (justStarted && !alreadyNotified) {
                    dispatch(notificationSlice.actions.showNotification({
                        type: item.type === 'study' ? 'info' : 'success',
                        message: item.type === 'study'
                            ? `⏰ Đã đến giờ học: ${item.task}`
                            : `☕ Đã đến giờ nghỉ!`,
                    }));

                    setNotifiedTasks((prev) => [...prev, index]);
                }
            });
        }, 30000);

        return () => clearInterval(interval);
    }, [timeline, notifiedTasks, dispatch]);

    const isNowBetween = (start, end) => now >= start && now <= end;

    if (!schedule) {
        return (
            <Typography variant="body1" className="text-center mt-6 text-gray-500">
                Không có lịch học để hiển thị.
            </Typography>
        );
    }

    const { start } = schedule;

    return (
        <Card className="max-w-3xl mx-auto mt-6 shadow-lg rounded-2xl relative">
            <CardContent>
                <ListItemText
                    secondary={
                        <Typography variant="body2" className="text-gray-600">
                            Bắt đầu lúc:{" "}
                            {new Date(start).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Typography>
                    }
                />
                <Box className="relative space-y-4">
                    {timeline.map((item, index) => (
                        <Box
                            key={index}
                            className={`flex items-center gap-4 p-4 rounded-xl border-l-4 ${item.type === "break"
                                ? "bg-yellow-100 border-yellow-500"
                                : "bg-blue-100 border-blue-500"
                                }`}
                        >
                            <div className="flex flex-col w-24 text-sm font-mono text-gray-600">
                                <span>{formatTime(item.start)}</span>
                                <span>{formatTime(item.end)}</span>
                            </div>

                            <div className="flex items-center gap-2 text-base font-medium">
                                {item.type === "study" ? (
                                    <SchoolIcon className="text-blue-600" />
                                ) : (
                                    <FreeBreakfastIcon className="text-yellow-600" />
                                )}
                                {item.task}
                            </div>
                        </Box>
                    ))}
                    <Box
                        sx={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            borderTop: "2px solid red",
                            top: (() => {
                                const diffMinutes = (now - new Date(start)) / (1000 * 60);
                                let totalMinutes = 0;
                                timeline.forEach((item) => {
                                    totalMinutes += (item.end - item.start) / (1000 * 60);
                                });
                                const totalHeight = timeline.length * 64;
                                const topPos = (diffMinutes / totalMinutes) * totalHeight;
                                return Math.min(Math.max(topPos, 0), totalHeight);
                            })(),
                            zIndex: 10,
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default ScheduleTimeline;
