import { useDispatch, useSelector } from "react-redux";
import AnalyticsCards from "../../Analytics/AnalyticsCards"
import { getAuthSelector } from "../../../redux/selector";
import { useEffect } from "react";
import { getAnalyticsDataByUser } from "../../User/authSlice";
import { Business, Group } from "@mui/icons-material";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';

function AnalyticsMyAccount() {
    const auth = useSelector(getAuthSelector)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAnalyticsDataByUser())
    }, [])

    const stats = [
        {
            title: "Số lớp học được tạo",
            value: auth?.analyticsData?.countClassRoom || 0,
            icon: Group,
            bgColor: "bg-blue-500",
        },
        {
            title: "Số bài tập được tạo",
            value: auth?.analyticsData?.countExercise || 0,
            icon: Business,
            bgColor: "bg-blue-500",
        },
        {
            title: "Số bài học được tạo",
            value: auth?.analyticsData?.countLesson || 0,
            icon: MilitaryTechIcon,
            bgColor: "bg-green-500",
        },
        {
            title: "Số bình luận đã gửi",
            value: auth?.analyticsData?.countComment || 0,
            icon: SchoolIcon,
            bgColor: "bg-green-500",
        },
        {
            title: "Số phản hồi đã gửi",
            value: auth?.analyticsData?.countFeedback || 0,
            icon: BarChartIcon,
            bgColor: "bg-green-500",
        },
        {
            title: "Số thông báo được tạo",
            value: auth?.analyticsData?.countNote || 0,
            icon: ScatterPlotIcon,
            bgColor: "bg-green-500",
        },
    ];
    return <AnalyticsCards stats={stats}></AnalyticsCards>
}
export default AnalyticsMyAccount