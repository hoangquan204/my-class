import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getExerciseSelector, getThemeSelector } from "../../redux/selector";
import { Avatar, Box, Button, Card, CardMedia, Divider, FormControl, FormControlLabel, FormLabel, IconButton, Modal, Radio, RadioGroup, Tooltip, Typography } from "@mui/material";
import moment from "moment/moment";
import CountdownTimer from "../CountdownTimer";
import FlagIcon from '@mui/icons-material/Flag';
import { createExerciseResult } from "../ExerciseResult/exerciseResultSlice";
import notificationSlice from "../Notification/notificationSlice";
import BreadcrumbsCustom from "../BreadcrumbsCustom/BreadcrumbsCustom";
import { getListSchedule } from "../Schedule/scheduleSlice";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

function ExcerciseDetail() {
    const { id } = useParams();

    const [open, setOpen] = useState(false)

    const [selectedExercise, setSelectedExercise] = useState({})
    const [formattedDateTime, setFormattedDateTime] = useState('')
    const [answers, setAnswers] = useState({})

    const [countCorrect, setCountCorrect] = useState(0)

    const dispatch = useDispatch()

    const exercise = useSelector(getExerciseSelector)
    const theme = useSelector(getThemeSelector)

    const navigate = useNavigate()

    const handleReport = () => {
        const check = window.confirm("Kết quả làm bài sẽ không được lưu nếu bạn di chuyển sang trang khác!")
        if (check)
            navigate("/contact")
    }

    const handleSubmitExercise = () => {
        const check = window.confirm('Nộp bài và kết thúc!')
        if (check) {
            handleEvalueExercise()
            toggleOpenEvalueExerciseModal()
            navigate(-1)
        }
    }

    const toggleOpenEvalueExerciseModal = () => {
        setOpen(!open)
    }

    useEffect(() => {
        if (Array.isArray(exercise?.list)) {
            const item = exercise.list.find((curr) => {
                return curr.id === parseInt(id)
            })
            setSelectedExercise(item)

            const specificDateTime = moment(item?.createAt);
            setFormattedDateTime(specificDateTime.format('DD-MM-YYYY HH:mm:ss'))
        }
        dispatch(getListSchedule());
    }, []);

    const handleEvalueExercise = () => {
        var countCorrectAnswer = 0;
        selectedExercise.questions.forEach((question) => {
            if (answers[question.id]?.answerId && question.correctAnswerId === answers[question.id].answerId)
                countCorrectAnswer++;
        })
        setCountCorrect(countCorrectAnswer);

        const data = {
            exerciseId: selectedExercise.id,
            countCorrect: countCorrectAnswer,
            score: countCorrectAnswer / selectedExercise?.questions?.length * 100
        }
        dispatch(createExerciseResult(data))
        dispatch(notificationSlice.actions.showNotification({
            type: 'success',
            message: 'Nộp bài thành công!'
        }))
    }

    const evalueExerciseModal = (
        <Modal
            open={open}
            onClose={toggleOpenEvalueExerciseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography sx={{ color: theme.palette.textColor.main }} className='text-center' id="modal-modal-title" variant="h6" component="h2">
                    Nộp bài thành công
                </Typography>
                <div className='flex items-center gap-x-6 my-4'>
                    <div className='flex flex-col gap-y-2'>
                        <Typography sx={{ color: theme.palette.textColor.main }} className='h-[40px]'>
                            {`Số câu đúng: ${countCorrect}/${selectedExercise?.questions?.length}`}
                        </Typography>
                        <Typography sx={{ color: theme.palette.textColor.main }} className='h-[40px]'>
                            {`Tỉ lệ: ${Math.floor(countCorrect / selectedExercise?.questions?.length * 100)}%`}
                        </Typography>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <Typography sx={{ color: theme.palette.textColor.main }} className='h-[40px]' >Trạng thái: </Typography>
                        <Typography className='h-[40px] px-10 bg-primary text-white p-2 rounded-md text-center' >
                            {Math.floor(countCorrect / selectedExercise?.questions?.length * 100) > 80 && 'Xuất sắc'
                                || Math.floor(countCorrect / selectedExercise?.questions?.length * 100) >= 50 && 'Đạt'
                                || 'Chưa đạt'
                            }
                        </Typography>
                    </div>
                </div>
            </Box>
        </Modal>
    )
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

    return <Box className='px-10'>
        {evalueExerciseModal}
        <BreadcrumbsCustom secondary={breadcumbs} primary={selectedExercise?.title} />
        <div className='flex items-center justify-between p-2'>
            <div className='flex flex-col'>
                <Typography variant="h5">{selectedExercise?.title}</Typography>
                <Typography>{selectedExercise?.description}</Typography>
            </div>
            <div className='flex items-center gap-x-1'>
                <Avatar src={selectedExercise?.user?.avatar}></Avatar>
                <div className='flex flex-col'>
                    <Typography className='bg-primary text-white text-center rounded-md px-2'>{selectedExercise?.user?.name}</Typography>
                    <Typography variant="caption">{formattedDateTime}</Typography>
                </div>
            </div>
        </div>
        <Divider></Divider>
        <div className='flex justify-between py-5'>
            <div className='flex flex-col px-10'>
                {Array.isArray(selectedExercise?.questions) && selectedExercise?.questions.map((question, index) => {
                    return (
                        <FormControl key={question.id} className="mb-8 w-full">
                            <FormLabel id={`question-label-${question.id}`} className="text-lg font-semibold">
                                {`Câu ${index + 1}: ${question.content}`}
                            </FormLabel>

                            {question.img && (
                                <Card
                                    sx={{
                                        maxWidth: 600,
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        overflow: "hidden",
                                        my: 2,
                                    }}
                                    className="mx-auto"
                                >
                                    <CardMedia
                                        component="img"
                                        image={question.img}
                                        alt={`Câu hỏi ${index + 1}`}
                                        className="object-cover"
                                        sx={{
                                            height: { xs: 200, sm: 300, md: 400 },
                                            width: "100%",
                                        }}
                                    />
                                </Card>
                            )}

                            <RadioGroup
                                aria-labelledby={`question-label-${question.id}`}
                                name={`radio-group-${question.id}`}
                            >
                                {question.answers.map((answer) => (
                                    <FormControlLabel
                                        key={answer.id}
                                        sx={{ color: theme.palette.textColor.main }}
                                        value={answer.content}
                                        control={
                                            <Radio
                                                onClick={() => {
                                                    const newAnswers = { ...answers };
                                                    newAnswers[question.id] = {
                                                        questionIndex: index + 1,
                                                        answerId: answer.id,
                                                        content: answer.content,
                                                    };
                                                    setAnswers(newAnswers);
                                                }}
                                            />
                                        }
                                        label={answer.content}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    );
                })}
            </div>
            <div className='flex w-[20%] flex-col gap-y-2'>
                <CountdownTimer duration={selectedExercise?.time * 60} />
                <div className='flex gap-x-2 p-2 border-[1px] border-gray-300'>
                    {Array.isArray(selectedExercise?.questions) && selectedExercise?.questions.map((question, index) => {
                        return <Typography className={`px-2 max-h-[35px] rounded-md ${answers[question.id] ? 'bg-primary' : 'bg-gray-200'} `} key={index}>
                            {index + 1}
                        </Typography>
                    })}
                </div>
            </div>
        </div>
        <Divider></Divider>
        <div className='flex items-center justify-between py-2'>
            <Tooltip title='Báo lỗi'>
                <Button variant="outlined" onClick={handleReport}>
                    <FlagIcon></FlagIcon>
                </Button>
            </Tooltip>
            <Button variant="contained" onClick={handleSubmitExercise}>Nộp bài</Button>
        </div>
    </Box>
}

export default ExcerciseDetail;