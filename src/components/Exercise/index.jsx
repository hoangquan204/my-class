import { useDispatch, useSelector } from "react-redux";
import { getExerciseSelector, getThemeSelector } from "../../redux/selector";
import { useEffect } from "react";
import exerciseSlice, { getListExercise } from "./exerciseSlice";
import { Avatar, Box, Button, Divider, IconButton, Typography } from "@mui/material";
import MoreIcon from '@mui/icons-material/MoreVert';
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

function Excercise({ classRoomId }) {
    const exercise = useSelector(getExerciseSelector)
    const theme = useSelector(getThemeSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListExercise(classRoomId))
        dispatch(exerciseSlice.actions.setClassRoomId(classRoomId))
    }, [dispatch])

    const navigate = useNavigate()

    return <Box>
        <Box className='flex flex-col gap-y-2 py-4'>
            {Array.isArray(exercise?.list) && exercise.list.map((item) => {
                const specificDateTime = moment(item.createAt);
                const formattedDateTime = specificDateTime.format('DD-MM-YYYY HH:mm:ss');
                return <Box className='border-[#d3d3d3] rounded-md border p-2'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-x-1 '>
                            <Avatar src={item.user.avatar}></Avatar>
                            <div className='flex flex-col'>
                                <Typography className='bg-primary text-white text-center rounded-md px-2'>{item.user.name}</Typography>
                                <Typography sx={{ color: theme.palette.textColor.main }} variant="caption" >{formattedDateTime}</Typography>
                            </div>
                        </div>
                        <Typography sx={{ color: theme.palette.textColor.main }} variant="h5">{item.title}</Typography>
                        <IconButton>
                            <MoreIcon></MoreIcon>
                        </IconButton>
                    </div>
                    <Divider></Divider>
                    <div className='flex items-center justify-between px-10 py-4'>
                        <Typography sx={{ color: theme.palette.textColor.main }}>{item.description}</Typography>
                        <Button variant="outlined" onClick={() => {
                            navigate(`/exercise/${item.id}`)
                        }}>
                            Thực hiện
                        </Button>
                    </div>
                </Box>
            })}
            <div className='flex items-center justify-between py-4'>
                <div>

                </div>
                <Button variant="contained" onClick={() => {
                    navigate("/exercise/create")
                }}>Tạo bài tập</Button>
            </div>
        </Box>
    </Box>
}

export default Excercise;