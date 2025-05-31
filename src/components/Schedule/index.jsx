import { Box, Typography } from "@mui/material";
import BreadcrumbsCustom from "../BreadcrumbsCustom/BreadcrumbsCustom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAuthSelector, getScheduleSelector } from "../../redux/selector";
import AuthModal from "../User/AuthModal"
import ScheduleTabs from "./ScheduleTabs";

function Schedule() {
    const schedule = useSelector(getScheduleSelector);
    const [todaySchedule, setTodaySchedule] = useState(null);
    const auth = useSelector(getAuthSelector)

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

    return (
        <Box className='container mx-auto py-10 flex flex-col'>
            <BreadcrumbsCustom
                secondary={[{ title: 'Trang chủ', path: '/' }]}
                primary={'Lịch tự học'}
            />
            {auth.username ?
                <ScheduleTabs></ScheduleTabs>
                :
                <Box className="mt-6 flex flex-col items-center justify-center text-center">
                    <Typography className="subtitle1 mb-2">
                        Bạn cần đăng nhập để lập lịch học
                    </Typography>
                    <div className='w-[100px] bg-primary m-2 rounded-md'>
                        <AuthModal />
                    </div>
                </Box>
            }
        </Box>

    );
}

export default Schedule;
