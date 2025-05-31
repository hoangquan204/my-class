import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AnalyticsCards from "../Analytics/AnalyticsCards"
import { useSelector } from "react-redux";

// Hàm lọc và tính toán thống kê học tập
function getStudyStats(scheduleList) {
    if (!Array.isArray(scheduleList) || scheduleList.length === 0) {
        return [];
    }

    const studyByDate = scheduleList.map(schedule => {
        const date = new Date(schedule.start).toLocaleDateString('vi-VN');
        const totalStudyMinutes = schedule.scheduleItemResponseList?.reduce(
            (sum, item) => sum + item.duration,
            0
        ) || 0;
        return { date, totalStudyMinutes };
    });

    let minDay = studyByDate[0];
    let maxDay = studyByDate[0];
    let totalMinutes = 0;

    studyByDate.forEach(({ date, totalStudyMinutes }) => {
        if (totalStudyMinutes < minDay.totalStudyMinutes) {
            minDay = { date, totalStudyMinutes };
        }
        if (totalStudyMinutes > maxDay.totalStudyMinutes) {
            maxDay = { date, totalStudyMinutes };
        }
        totalMinutes += totalStudyMinutes;
    });

    const averageStudyMinutes = totalMinutes / studyByDate.length;

    return [
        {
            title: "Ngày học ít nhất",
            value: `${minDay.date} (${minDay.totalStudyMinutes} phút)`,
            icon: CalendarTodayIcon,
            bgColor: "bg-red-500",
        },
        {
            title: "Ngày học nhiều nhất",
            value: `${maxDay.date} (${maxDay.totalStudyMinutes} phút)`,
            icon: CalendarTodayIcon,
            bgColor: "bg-green-500",
        },
        {
            title: "Thời gian học trung bình",
            value: `${averageStudyMinutes.toFixed(2)} phút`,
            icon: AccessTimeIcon,
            bgColor: "bg-yellow-500",
        },
        {
            title: "Tổng số ngày học",
            value: studyByDate.length,
            icon: ScheduleIcon,
            bgColor: "bg-blue-500",
        },
    ];
}

function ScheduleAnalytics() {
    // Giả sử bạn có selector lấy danh sách lịch học
    const scheduleList = useSelector(state => state.schedule.list);

    // Truyền scheduleList vào hàm tính stats học tập
    const studyStats = getStudyStats(scheduleList);

    return (
        <>
            <AnalyticsCards stats={studyStats} />
        </>
    );
}

export default ScheduleAnalytics;
