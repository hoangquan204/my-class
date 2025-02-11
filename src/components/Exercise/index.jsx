import { useDispatch, useSelector } from "react-redux";
import { getAuthSelector, getClassRoomSelector, getExerciseSelector, getThemeSelector } from "../../redux/selector";
import { useEffect, useState } from "react";
import exerciseSlice, { getListExercise } from "./exerciseSlice";
import { Avatar, Box, Button, Divider, IconButton, Typography } from "@mui/material";
import MoreIcon from '@mui/icons-material/MoreVert';
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import ExerciseResult from "../ExerciseResult";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getListExerciseResultByUser } from "../ExerciseResult/exerciseResultSlice";
import AddBox from '@mui/icons-material/AddBox';

function Excercise({ classRoomId }) {
    const exercise = useSelector(getExerciseSelector);
    const theme = useSelector(getThemeSelector);
    const auth = useSelector(getAuthSelector)
    const classRoom = useSelector(getClassRoomSelector)

    const dispatch = useDispatch();

    const [expandedId, setExpandedId] = useState(null); // State to track the open Accordion
    const [selectedClassRoom, setSelectedClassRoom] = useState({})

    const handleAccordionChange = (panelId) => {
        setExpandedId(expandedId === panelId ? null : panelId);
    };

    useEffect(() => {
        const result = classRoom?.listAll?.find((item) => {
            console.log('item: ', item)
            return item.id === parseInt(classRoomId)
        })
        setSelectedClassRoom(result)
    }, [])

    useEffect(() => {
        dispatch(getListExercise(classRoomId));
        dispatch(exerciseSlice.actions.setClassRoomId(classRoomId));
    }, [dispatch, classRoomId]);

    useEffect(() => {
        dispatch(getListExerciseResultByUser(expandedId))
    }, [expandedId])

    const navigate = useNavigate();

    return (
        <Box>
            {
                auth?.userDetail?.id === selectedClassRoom?.teacher?.id &&
                <div className="py-2 text-center">
                    <Button
                        variant="outlined"
                        onClick={() => {
                            navigate("/exercise/create");
                        }}
                    >
                        <AddBox></AddBox>
                    </Button>
                </div>
            }
            <Box className="flex flex-col gap-y-2">
                {Array.isArray(exercise?.list) && exercise.list.length > 0 ? (
                    exercise.list.map((item) => {
                        const specificDateTime = moment(item.createAt);
                        const formattedDateTime = specificDateTime.format("DD-MM-YYYY HH:mm:ss");
                        return (
                            <Box key={item.id} className="border-[#d3d3d3] rounded-md border p-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-x-1 ">
                                        <Avatar src={item.user.avatar} />
                                        <div className="flex flex-col">
                                            <Typography sx={{ fontWeight: 'bold' }} className="text-primary text-center rounded-md px-2">
                                                {item.user.name}
                                            </Typography>
                                            <Typography
                                                sx={{ color: theme.palette.textColor.main }}
                                                variant="caption"
                                            >
                                                {formattedDateTime}
                                            </Typography>
                                        </div>
                                    </div>
                                    <Typography sx={{ color: theme.palette.textColor.main }} variant="h5">
                                        {item.title}
                                    </Typography>
                                    <IconButton>
                                        <MoreIcon />
                                    </IconButton>
                                </div>
                                <Divider />
                                <div className="flex items-center justify-between px-10 py-4">
                                    <Typography sx={{ color: theme.palette.textColor.main }}>
                                        {item.description}
                                    </Typography>
                                    {
                                        auth?.userDetail?.id === item?.user?.id ?
                                            <div className='flex items-center gap-2'>
                                                <Button variant="outlined" onClick={() => {
                                                    navigate(`/exercise-result/${item.id}`)
                                                }}>
                                                    Xem chi tiết
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => {
                                                        navigate(`/exercise/${item.id}`);
                                                    }}
                                                >
                                                    Thực hiện
                                                </Button>
                                            </div>
                                            :
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    navigate(`/exercise/${item.id}`);
                                                }}
                                            >
                                                Thực hiện
                                            </Button>
                                    }
                                </div>
                                <Accordion
                                    expanded={expandedId === item.id}
                                    onChange={() => handleAccordionChange(item.id)} // Toggle accordion open/close
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography component="span">Xem kết quả của bạn</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ExerciseResult exerciseId={item.id}></ExerciseResult>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        );
                    })
                ) : (
                    <Box
                        className="flex flex-col items-center justify-center"
                        sx={{ textAlign: "center", color: theme.palette.textColor.main, py: 4 }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Hiện chưa có bài tập nào!
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 2 }}>
                            Hãy tạo bài tập mới để bắt đầu.
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                navigate("/exercise/create");
                            }}
                        >
                            Tạo bài tập ngay
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default Excercise;
