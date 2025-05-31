import React, { useEffect } from "react";
import { Business, Group } from "@mui/icons-material";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getAnalyticsSelector, getThemeSelector } from "../../redux/selector";
import AnalyticsCards from "./AnalyticsCards"
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';

const HorizontalBarChart = ({ countEducationField, countScienceField, countTechnologyField, countOtherField }) => {
    const data = [
        { name: "Giáo dục", count: countEducationField || 0 },
        { name: "Khoa học", count: countScienceField || 0 },
        { name: "Công nghệ", count: countTechnologyField || 0 },
        { name: "Khác", count: countOtherField || 0 },
    ];

    const theme = useSelector(getThemeSelector)

    return (
        <div className="w-full h-64">
            <h2 className="text-xl font-bold text-center mb-4">Thống Kê Số Lượng Lớp Học Theo Lĩnh Vực</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    layout="vertical"
                    data={data}

                    margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill={'#1976d2'} name="Số Lượng" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const AnalyticsData = () => {
    const analytics = useSelector(getAnalyticsSelector)

    const stats = [
        {
            title: "Số lớp học trên hệ thống",
            value: analytics?.data?.countClassRoom || 0,
            icon: Group,
            bgColor: "bg-blue-500",
        },
        {
            title: "Số tài khoản người dùng",
            value: analytics?.data?.countAccount || 0,
            icon: Business,
            bgColor: "bg-blue-500",
        },
        {
            title: "Số bài học được tạo",
            value: analytics?.data?.countLesson || 0,
            icon: MilitaryTechIcon,
            bgColor: "bg-green-500",
        },
        {
            title: "Số bình luận của người dùng",
            value: analytics?.data?.countComment || 0,
            icon: SchoolIcon,
            bgColor: "bg-green-500",
        },
        {
            title: "Số phản hồi của người dùng",
            value: analytics?.data?.countFeedback || 0,
            icon: BarChartIcon,
            bgColor: "bg-green-500",
        },
        {
            title: "Số câu hỏi được tạo",
            value: analytics?.data?.countQuestion || 0,
            icon: ScatterPlotIcon,
            bgColor: "bg-green-500",
        },
    ];

    return (
        <div>
            <Typography className='text-primary border-l-4 border-l-primary' >
                <span className='text-xl font-semibold px-1 '>Thống kê về trang Web: </span>
            </Typography >
            <HorizontalBarChart countEducationField={analytics?.data?.countEducationField} countScienceField={analytics?.data?.countScienceField} countTechnologyField={analytics?.data?.countTechnologyField} countOtherField={analytics?.data?.countOtherField} />
            <AnalyticsCards stats={stats}></AnalyticsCards>
        </div>
    );
};

export default AnalyticsData;
