import { Avatar, Box, Chip, Divider, Grid, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getLessonSelector, getNewsSelector, getThemeSelector } from "../../redux/selector";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from 'moment';
import BreadcrumbsCustom from "../BreadcrumbsCustom/BreadcrumbsCustom";
import ListLesson from "./ListLesson";
import ReactQuill from 'react-quill';
import helperSlice from "../Helper/helperSlice";

function LessonDetail() {
    const { id } = useParams();
    const [formattedDateTime, setFormattedDateTime] = useState('')

    const [selectedLesson, setSelectedLesson] = useState({})
    const lesson = useSelector(getLessonSelector)
    const theme = useSelector(getThemeSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        if (Array.isArray(lesson?.list)) {
            const item = lesson.list.find((curr) => {
                return curr.id === parseInt(id); // Lấy id từ useParams
            });
            setSelectedLesson(item);

            const specificDateTime = moment(item?.createAt);
            setFormattedDateTime(specificDateTime.format('DD-MM-YYYY HH:mm:ss'));

            const data = getTextFromHTML(item?.content?.replaceAll("!!!", "<img"))
            dispatch(helperSlice.actions.setData(data))
        }
    }, [id, lesson?.list]); // Thêm id vào dependency array

    const modules2 = {
        toolbar: {
            container: [

            ],
        },
    };

    const formats = [
        'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'align', 'link', "image"
    ];

    function getTextFromHTML(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        return doc.body.textContent || doc.body.innerText;
    }
    const breadcumbs = [
        {
            title: 'Trang chủ',
            path: '/'
        },
        {
            title: 'Bài giảng',
            path: '/class'
        }
    ]

    return <Box className='container mx-auto'>
        <BreadcrumbsCustom secondary={breadcumbs} primary={selectedLesson?.title} />
        <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
                <ListLesson lessons={lesson.list} activeLesson={selectedLesson}></ListLesson>
            </Grid>
            <Grid item xs={12} md={9}>
                <Box className='mx-auto flex flex-col p-10 gap-y-10 w-full'>
                    <div className='flex flex-col gap-y-2 relative'>
                        <Typography sx={{ color: `${theme.palette.textColor.main}` }} variant="h3">{selectedLesson?.title}</Typography>
                        <Divider></Divider>
                        <div className={` w-full flex items-center justify-between`}>
                            <div className=' flex items-center gap-x-2'>
                                <Typography sx={{ color: `${theme.palette.textColor.main}` }}>Post by: </Typography>
                                <Avatar src={selectedLesson?.user?.avatar}></Avatar>
                                <Typography sx={{ color: `${theme.palette.textColor.main}` }}>{selectedLesson?.user?.name}</Typography>
                            </div>
                            <div className='absolute top-0 right-4 flex flex-col gap-y-2'>
                                <span>
                                    {formattedDateTime}
                                </span>
                            </div>
                        </div>
                    </div>
                    <img className='w-[70%] overflow-scroll h-[400px] object-cover mx-auto rounded-md' src={selectedLesson?.thumbnail}></img>
                    <ReactQuill
                        ref={(el) => {
                            if (el) {
                                window.quillEditorRef = el.getEditor();
                            }
                        }}
                        theme="snow"
                        value={selectedLesson?.content?.replaceAll("!!!", "<img")}
                        modules={modules2}
                        style={{ height: '100%' }}
                        formats={formats}
                    />
                </Box>
            </Grid>
        </Grid>
    </Box >
}

export default LessonDetail;