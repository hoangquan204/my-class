import React from "react";
import { List, ListItem, ListItemText, Typography, Divider, Box } from "@mui/material";
import { Link } from "react-scroll"; // Thư viện để scroll đến vị trí
import { useSelector } from "react-redux";
import { getThemeSelector } from "../../redux/selector";
import { useNavigate } from "react-router-dom";

const ListLesson = ({ lessons = [], activeLesson }) => {
    const theme = useSelector(getThemeSelector)

    const navigate = useNavigate()
    return (
        <div className={`p-4 bg-[${theme.palette.containerColor.main}] rounded-lg shadow-md w-[300px]`}>
            <Typography variant="h6" className="text-primary font-semibold mb-2">
                Mục lục
            </Typography>
            <Divider className="mb-4" />
            <List className="space-y-2">
                {Array.isArray(lessons) && lessons.length > 0 ? lessons?.map((lesson) => (
                    <ListItem
                        key={lesson.id}
                        className="hover:bg-gray-200 rounded transition duration-300"
                        sx={{
                            backgroundColor: lesson.id === activeLesson?.id ? 'rgba(0, 123, 255, 0.1)' : 'inherit', // Nền màu khác
                            color: lesson.id === activeLesson?.id ? '#007BFF' : 'inherit', // Màu chữ khác
                            fontWeight: lesson.id === activeLesson?.id ? 'bold' : 'normal', // Chữ đậm hơn
                            borderLeft: lesson.id === activeLesson?.id ? '4px solid #007BFF' : '4px solid transparent', // Đường viền
                            paddingLeft: 2, // Căn chỉnh khoảng cách
                        }}
                        onClick={() => {
                            navigate(`/lesson/${lesson.id}`)
                        }}

                    >
                        <Link
                            to={lesson.id}
                            smooth={true}
                            duration={500}
                            offset={-70} // Căn chỉnh cho header nếu có
                            className="text-primary transition-colors cursor-pointer"
                        >
                            <ListItemText primary={lesson.title} />
                        </Link>
                    </ListItem>
                )) : (
                    <Box
                        className="flex flex-col items-center justify-center"
                        sx={{ textAlign: "center", color: theme.palette.textColor.main, py: 4 }}
                    >
                        <Typography variant="body2" sx={{ marginBottom: 2 }}>
                            Hiện chưa có bài giảng nào!
                        </Typography>
                    </Box>
                )}
            </List>
        </div >
    );
};

export default ListLesson;
