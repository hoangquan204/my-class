import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, IconButton, Modal, Radio, RadioGroup, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
import { getExerciseSelector, getThemeSelector } from "../../redux/selector";
import { createExercise } from "./exerciseSlice";
import notificationSlice from "../Notification/notificationSlice";

function ExerciseCreation() {
    const exercise = useSelector(getExerciseSelector)
    const theme = useSelector(getThemeSelector)

    const [open, setOpen] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [time, setTime] = useState(0)
    const [questions, setQuestions] = useState([])

    const [questionContent, setQuestionContent] = useState('')
    const [answerA, setAnswerA] = useState('')
    const [answerB, setAnswerB] = useState('')
    const [answerC, setAnswerC] = useState('')
    const [answerD, setAnswerD] = useState('')

    const dispatch = useDispatch()


    const toggleOpenQuestionCreateModal = () => {
        setOpen(!open)
    }
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

    const handleEditQuestion = (item) => {
        const index = questions.find((curr) => {
            return curr.id === item.id
        })
        var newQuestions = [...questions]
        newQuestions?.splice(index, 1)

        setQuestions(newQuestions)

        setQuestionContent(item.content)
        setAnswerA(item.answers[0])
        setAnswerB(item.answers[1])
        setAnswerC(item.answers[2])
        setAnswerD(item.answers[3])
        setOpen(true)
    }

    const handleResetValue = () => {
        setQuestionContent('')
        setAnswerA('')
        setAnswerB('')
        setAnswerC('')
        setAnswerD('')
    }

    const handleCreateQuestion = () => {
        setQuestions([...questions, { id: questions.length, content: questionContent, answers: [answerA, answerB, answerC, answerD] }])
        handleResetValue()
        toggleOpenQuestionCreateModal()
    }

    const handleCreateExercise = () => {
        const questionCreationRequests = questions.map((item) => {
            return {
                content: item.content,
                correctAnswer: item.answers[0],
                incorrectAnswers: [item.answers[1], item.answers[2], item.answers[3]]
            }
        })
        const data = {
            title,
            description,
            time,
            classRoomId: exercise.classRoomId,
            questionCreationRequests,
        }

        if (data) {
            dispatch(createExercise(data))
            dispatch(notificationSlice.actions.showNotification({
                type: 'success',
                message: 'Tạo bài tập thành công!'
            }))
            setTitle('')
            setDescription('')
            setTime(0)
            setQuestions([])
        } else
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Bạn cần điền đầy đủ thông tin!'
            }))


        console.log(data);

    }

    const questionCreateModal = (
        <Modal
            open={open}
            onClose={toggleOpenQuestionCreateModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className='flex flex-col gap-y-2'>
                    <TextField id="filled-basic" label="Câu hỏi" value={questionContent} variant='standard' onChange={(e) => {
                        setQuestionContent(e.target.value)
                    }} />
                    <Divider></Divider>
                    <TextField id="outlined-basic" label="Câu đúng" value={answerA} onChange={(e) => {
                        setAnswerA(e.target.value)
                    }} variant="outlined" />
                    <TextField id="outlined-basic" label="Câu sai" value={answerB} variant="outlined" onChange={(e) => {
                        setAnswerB(e.target.value)
                    }} />
                    <TextField id="outlined-basic" label="Câu sai" value={answerC} variant="outlined" onChange={(e) => {
                        setAnswerC(e.target.value)
                    }} />
                    <TextField id="outlined-basic" label="Câu sai" value={answerD} variant="outlined" onChange={(e) => {
                        setAnswerD(e.target.value)
                    }} />
                    <Button variant="contained" onClick={handleCreateQuestion}>Tạo</Button>
                </div>
            </Box>
        </Modal>
    )

    return <Box>
        {questionCreateModal}
        <Typography className='text-primary border-l-4 border-l-primary' >
            <span className='text-xl font-semibold px-1'>Tạo lớp học</span>
        </Typography>
        <div className='flex flex-col gap-y-2 w-[60%] my-4'>
            <TextField id="outlined-basic" label="Tiêu đề" value={title} onChange={(e) => {
                setTitle(e.target.value)
            }} variant="outlined" />
            <TextField multiline rows={5} id="outlined-basic" label="Mô tả" value={description} onChange={(e) => {
                setDescription(e.target.value)
            }} variant="outlined" />
            <div className='flex items-center gap-x-2'>
                <TextField className='flex-1' id="outlined-basic" label="Thời gian (phút)" value={time} onChange={(e) => {
                    setTime(e.target.value)
                }} variant="outlined" type='number' />
                <Button className='flex-1' variant="outlined" onClick={toggleOpenQuestionCreateModal}>Tạo câu hỏi</Button>
            </div>

            {questions?.map((item, index) => {
                return <FormControl>
                    <div className='flex items-center justify-between py-2'>
                        <FormLabel id="demo-radio-buttons-group-label">{`Câu ${index + 1}: ${item.content}`}</FormLabel>
                        <Tooltip title='Điều chỉnh' >
                            <IconButton onClick={() => {
                                handleEditQuestion(item)
                            }}>
                                <EditIcon></EditIcon>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        sx={{ color: theme.palette.textColor.main }}
                    >
                        {item?.answers?.map((answer, index) => {
                            return <FormControlLabel className={`${index === 0 && 'bg-gray-200 text-black'}`} value={answer} control={<Radio />} label={answer} />
                        })}
                    </RadioGroup>
                </FormControl>
            })}
            <Button variant="contained" onClick={handleCreateExercise}>Tạo bài tập</Button>
        </div>
    </Box>
}

export default ExerciseCreation;