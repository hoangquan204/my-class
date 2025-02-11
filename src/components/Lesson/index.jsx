import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthSelector, getClassRoomSelector, getLessonSelector, getThemeSelector } from "../../redux/selector";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import moment from "moment";
import ListLesson from "./ListLesson";
import { AddBox } from "@mui/icons-material";

function Lesson({ classRoomId }) {
    const navigate = useNavigate()
    const auth = useSelector(getAuthSelector)
    const classRoom = useSelector(getClassRoomSelector)
    const lesson = useSelector(getLessonSelector)
    const theme = useSelector(getThemeSelector)

    const [selectedClassRoom, setSelectedClassRoom] = useState({})

    useEffect(() => {
        const result = classRoom?.listAll?.find((item) => {
            console.log('item: ', item)
            return item.id === parseInt(classRoomId)
        })
        setSelectedClassRoom(result)
    }, [])

    return <Box>
        {
            auth?.userDetail?.id === selectedClassRoom?.teacher?.id &&
            <div className="py-2 text-center">
                <Button
                    variant="outlined"
                    onClick={() => {
                        navigate("/lesson/create");
                    }}
                >
                    <AddBox></AddBox>
                </Button>
            </div>
        }
        <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
                <ListLesson lessons={lesson.list}></ListLesson>
            </Grid>
            <Grid item xs={12} md={9}>
                <div className='flex flex-col gap-y-2 mt-2'>
                    {Array.isArray(lesson?.list) && lesson?.list.length > 0 ? lesson?.list?.map((item) => {
                        const specificDateTime = moment(item.createAt);
                        const formattedDateTime = specificDateTime.format("DD-MM-YYYY HH:mm:ss");

                        return <div className="relative flex items-center gap-4 p-4 border border-[#d3d3d3] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                            {/* Hình ảnh bài viết */}
                            <img
                                className="w-36 h-24 object-cover rounded-md"
                                src={
                                    item.thumbnail ||
                                    "https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg"
                                }
                                alt="thumbnail"
                            />
                            {/* Nội dung bài viết */}
                            <div className="flex flex-col flex-1 gap-2">
                                {/* Tiêu đề bài viết */}
                                <span className="text-lg font-semibold text-gray-800 truncate">{item.title}</span>

                                {/* Người đăng */}
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="mr-2">Post by:</span>
                                    <div className="flex items-center gap-2">
                                        <Avatar
                                            src={item?.user?.avatar || ""}
                                            sx={{ width: 24, height: 24 }}
                                            alt="user-avatar"
                                        />
                                        <Typography variant="body2" className="text-gray-700">
                                            {item?.user?.name || "Anonymous"}
                                        </Typography>
                                    </div>
                                </div>

                                {/* Ngày tạo */}
                                <span className="text-sm text-gray-500">Created at: {formattedDateTime}</span>
                            </div>

                            {/* Nút Xem chi tiết */}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={(e) => {
                                    navigate(`/lesson/${item.id}`)
                                }}
                            >
                                Xem chi tiết
                            </Button>
                        </div>
                    }) : (
                        <Box
                            className="flex flex-col items-center justify-center"
                            sx={{ textAlign: "center", color: theme.palette.textColor.main, py: 4 }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Hiện chưa có bài giảng nào!
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                Hãy theo dõi thường xuyên để nhận được bài giảng mới nhé.
                            </Typography>
                        </Box>
                    )}
                </div>
            </Grid>
        </Grid>
    </Box>
}

export default Lesson;