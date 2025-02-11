import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getAnalyticsSelector } from "../../redux/selector";

const StatisticsCard = ({ title, value, icon: Icon, bgColor }) => {
    return (
        <Card className={`flex items-center p-4 shadow-lg ${bgColor}`}>
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full mr-4">
                <Icon className="text-2xl text-gray-700" />
            </div>
            <CardContent className="flex-1">
                <Typography variant="h6" className="text-primary">
                    {title}
                </Typography>
                <Typography variant="h4" className="font-bold">
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
};

const AnalyticsCards = ({ stats }) => {
    return (
        <div className="lg:px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
                <StatisticsCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    bgColor={stat.bgColor}
                />
            ))}
        </div>
    );
};

export default AnalyticsCards;
