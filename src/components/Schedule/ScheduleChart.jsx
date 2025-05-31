import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

const ScheduleChart = ({ data }) => {
    return (
        <Card className="mt-6 max-w-4xl mx-auto">
            <CardContent>
                <Typography variant="h6" className="mb-4 text-center font-bold">
                    Hiệu suất học tập theo ngày
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis unit=" phút" />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="totalMinutes"
                            stroke="#1976d2"
                            strokeWidth={3}
                            activeDot={{ r: 8 }}
                            name="Tổng phút học"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default ScheduleChart;