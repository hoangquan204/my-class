import { Avatar, Box, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Typography } from "@mui/material";
import Tabs from '../Tabs/Tabs'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthSelector, getClassRoomSelector, getThemeSelector } from "../../redux/selector";
import moment from "moment/moment";
import { useParams } from "react-router-dom";
import { getListLessonByClassRoomId } from "../Lesson/lessonSlice";
import classRoomSlice from "./classRoomSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BreadcrumbsCustom from "../BreadcrumbsCustom/BreadcrumbsCustom";

function ClassRoomDetail() {
    const { id } = useParams();

    const [selectedClass, setSelectedClass] = useState({})
    const [formattedDateTime, setFormattedDateTime] = useState('')

    const classRoom = useSelector(getClassRoomSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log(classRoom.listAll)
        if (Array.isArray(classRoom?.listAll)) {
            const item = classRoom.listAll.find((curr) => {
                return curr.id === parseInt(id)
            })
            console.log('Selected class: ', selectedClass)
            setSelectedClass(item)

            const specificDateTime = moment(item?.createAt);
            setFormattedDateTime(specificDateTime.format('DD-MM-YYYY HH:mm:ss'))
        }

        dispatch(getListLessonByClassRoomId(id))
        dispatch(classRoomSlice.actions.setSelectedClassRoom(id))

    }, []);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const auth = useSelector(getAuthSelector)

    const breadcumbs = [
        {
            title: 'Trang chủ',
            path: '/'
        },
        {
            title: 'Lớp học',
            path: '/class'
        }
    ]

    const theme = useSelector(getThemeSelector)

    return <Box className='px-4'>
        <BreadcrumbsCustom secondary={breadcumbs} primary={selectedClass?.name} />
        <div className="flex">
            <img className='w-[80%] h-[300px] object-cover mx-auto' src={selectedClass?.thumbnail}></img>
        </div>
        <div className='flex items-center justify-between py-4'>
            <div className='flex flex-col gap-y-2'>
                <span className={`text-primary font-bold text-2xl text-[${theme.palette.textColor.main}]`}>{selectedClass?.name}</span>
                <Typography variant='body' className={`text-[${theme.palette.textColor.main}]`}>{selectedClass?.description}</Typography>

            </div>
            <div className='flex flex-col gap-y-2'>
                <div className='flex items-center gap-x-2'>
                    <span className={`text-md font-semibold text-[${theme.palette.textColor.main}]`}>Giáo viên: </span>
                    <Avatar src={selectedClass?.teacher?.avatar}></Avatar>
                    <Typography sx={{ fontWeight: 'bold' }} className="text-primary text-center rounded-md px-2">{selectedClass?.teacher?.name}</Typography>
                </div>
                <div className='flex items-center gap-x-2'>
                    <span className={`text-md font-semibold text-[${theme.palette.textColor.main}]`}>Tạo ngày: </span>
                    <Typography variant="caption" className={`text-[${theme.palette.textColor.main}]`} sx={{ fontSize: 'medium' }}>{formattedDateTime}</Typography>
                </div>
                {
                    auth?.userDetail?.id === selectedClass?.teacher?.id &&
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-password">Mật khẩu lớp học</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            disabled
                            value={selectedClass?.password}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                }
            </div>
        </div>
        <Tabs classRoom={selectedClass}></Tabs>
    </Box >
}

export default ClassRoomDetail;