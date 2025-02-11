import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getListExerciseResult } from "./exerciseResultSlice";
import { useEffect, useState } from "react";
import { getExerciseResultSelector, getExerciseSelector, getThemeSelector } from "../../redux/selector";
import { Avatar, Typography, Card, CardContent, Chip, Box, Grid, Table, TableRow, TableBody, TableCell, TableContainer, Paper, Tooltip } from "@mui/material";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import moment from "moment";
import BreadcrumbsCustom from "../BreadcrumbsCustom/BreadcrumbsCustom";

const ProjectPieChart = ({ data }) => {
    const COLORS = ["#FFBB28", "#1791C8", "#00C49F"]; // Màu sắc cho các phần

    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={(entry) => `${entry.name}: ${entry.value}`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

function ExcerciseResultDetail() {
    const { id } = useParams();

    const [data, setData] = useState([])
    const [seletedExercise, setSelectedExercise] = useState({})
    const exercise = useSelector(getExerciseSelector)
    const exerciseResult = useSelector(getExerciseResultSelector)
    const theme = useSelector(getThemeSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListExerciseResult(id))
        const item = exercise.list.find((item) => {
            return item.id === parseInt(id)
        })
        console.log('item: ', item);
        console.log(exercise?.list);

        if (item)
            setSelectedExercise(item)
    }, [])

    useEffect(() => {
        if (!Array.isArray(exerciseResult.list)) {
            console.error("exerciseResult.list is not an array!");
            return;
        }

        const value1 = exerciseResult.list.filter((item) => item.status === "Xuất sắc").length;
        const value2 = exerciseResult.list.filter((item) => item.status === "Đạt").length;
        const value3 = exerciseResult.list.filter((item) => item.status === "Chưa đạt").length;

        setData([
            { name: "Xuất sắc", value: value1 },
            { name: "Đạt", value: value2 },
            { name: "Chưa đạt", value: value3 },
        ]);
    }, [exerciseResult?.list]);

    const calculateAverageScore = (list) => {
        if (!Array.isArray(list) || list.length === 0) return 0; // Trả về 0 nếu không có bài
        const totalScore = list.reduce((acc, item) => acc + (item.score || 0), 0); // Tính tổng điểm
        return (totalScore / list.length).toFixed(2); // Trả về điểm trung bình với 2 chữ số thập phân
    };

    const breadcumbs = [
        {
            title: 'Trang chủ',
            path: '/'
        },
        {
            title: 'Bài tập',
            path: '/class'
        }
    ]

    return <div>
        <BreadcrumbsCustom secondary={breadcumbs} primary={'Xem kết quả'} />
        <div className='flex flex-col gap-2'>
            <div className='border border-gray-300 p-2 rounded-md'>
                <Typography
                    variant="h5"
                    className={`text-[${theme.palette.textColor.main}] text-primary text-center`}
                >
                    {seletedExercise?.title}
                </Typography>
                <div className='flex items-center justify-between'>
                    <Typography
                        variant="body2"
                        className={`text-[${theme.palette.textColor.main}]`}
                    >
                        Mô tả: {seletedExercise?.description}
                    </Typography>
                    <div>
                        <Typography
                            variant="body2"
                            className={`text-[${theme.palette.textColor.main}`}
                        >
                            Tạo ngày: {moment(seletedExercise?.createAt).format('DD-MM-YYYY HH:mm:ss')}
                        </Typography>
                        <Typography
                            variant="body2"
                            className={`text-[${theme.palette.textColor.main}`}
                        >
                            Thời gian làm bài: {seletedExercise?.time} phút
                        </Typography>
                    </div>

                </div>


            </div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                    <div className='flex flex-col  gap-2'>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableBody>
                                    <TableRow >
                                        <TableCell align="center" colSpan={2} >
                                            <ProjectPieChart data={data}></ProjectPieChart>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Số bài làm: </TableCell>
                                        <TableCell >{exerciseResult.list.length}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Điểm trung bình: </TableCell>
                                        <TableCell >{calculateAverageScore(exerciseResult.list)}</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
                <Grid item xs={12} md={7}>
                    <div className='flex flex-col gap-2'>
                        <Typography className='text-center'>Bảng điểm</Typography>
                        {Array.isArray(exerciseResult?.list) && exerciseResult?.list.length > 0 ? exerciseResult?.list?.map((item, index) => (
                            <Card
                                key={index}
                                className={`shadow-lg border ${item.score > 80
                                    ? "border-green-500"
                                    : item.score > 50
                                        ? "border-yellow-500"
                                        : "border-red-500"
                                    }`}
                            >
                                <CardContent className="flex items-center gap-4 p-4">
                                    <Avatar
                                        src={item.user.avatar}
                                        alt={item.user.name}
                                        className="w-16 h-16"
                                    />
                                    <div className="flex-1">
                                        <Typography
                                            variant="h6"
                                            className="font-semibold text-gray-800"
                                        >
                                            {item.user.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            className="text-gray-600"
                                        >
                                            {item.user.email}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            className="mt-1 text-gray-500"
                                        >
                                            Ngày làm: {item.createAt}
                                        </Typography>
                                    </div>
                                    <Typography
                                        variant="h6"
                                        className="font-bold text-primary"
                                    >
                                        Điểm: {item.score}
                                    </Typography>
                                    <div className='flex flex-col gap-2'>
                                        <Chip variant='contained' label={item.status}>
                                        </Chip>
                                        <Chip variant='outlined' label={`Câu đúng: ${item.countCorrect}`}>
                                        </Chip>
                                    </div>
                                </CardContent>
                            </Card>
                        )) :
                            <Box
                                className="flex flex-col items-center justify-center"
                                sx={{ textAlign: "center", color: theme.palette.textColor.main, py: 4 }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    Hiện chưa có học viên nào thực hiện bài tập này!
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                    Thường xuyên theo dõi để cập nhật kết quả bài tập.
                                </Typography>
                            </Box>
                        }
                    </div>
                </Grid>
            </Grid>
        </div >
    </div>
}

export default ExcerciseResultDetail