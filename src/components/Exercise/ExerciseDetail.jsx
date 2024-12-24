import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getExerciseSelector, getThemeSelector } from "../../redux/selector";
import { Avatar, Box, Button, CircularProgress, Divider, FormControl, FormControlLabel, FormLabel, IconButton, Modal, Radio, RadioGroup, Tooltip, Typography } from "@mui/material";
import moment from "moment/moment";
import CountdownTimer from "../CountdownTimer";
import FlagIcon from '@mui/icons-material/Flag';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import CircularProgressCustom from "../CircularProgressCustom";
import { theme } from "@cloudinary/url-gen/actions/effect";
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

    const exercise = useSelector(getExerciseSelector)
    const theme = useSelector(getThemeSelector)

    const handleSubmitExercise = () => {
        const check = window.confirm('Nộp bài và kết thúc!')
        if (check) {
            handleEvalueExercise()
            toggleOpenEvalueExerciseModal()
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
    }, []);

    const handleEvalueExercise = () => {
        var countCorrectAnswer = 0;
        selectedExercise.questions.forEach((question) => {
            if (answers[question.id]?.answerId && question.correctAnswerId === answers[question.id].answerId)
                countCorrectAnswer++;
        })
        setCountCorrect(countCorrectAnswer);
        console.log(countCorrectAnswer, "-", countCorrectAnswer / selectedExercise.questions.length * 100, "%");
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
    return <Box className='px-10'>
        {evalueExerciseModal}
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
                    return <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">{`Câu ${index + 1}: ${question.content}`}</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            {question.answers.map((answer) => {
                                return <FormControlLabel sx={{ color: theme.palette.textColor.main }} value={answer.content} control={<Radio onClick={(e) => {
                                    const newAnswers = { ...answers }
                                    newAnswers[question.id] = {
                                        questionIndex: index + 1,
                                        answerId: answer.id,
                                        content: answer.content,
                                    }
                                    setAnswers(newAnswers)
                                }} />} label={answer.content} />
                            })}
                        </RadioGroup>
                    </FormControl>
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
            <div className='flex items-center gap-x-2'>
                <Tooltip title='Làm lại'>
                    <Button variant="outlined">
                        <RotateLeftIcon></RotateLeftIcon>
                    </Button>
                </Tooltip>
                <Tooltip title='Báo lỗi'>
                    <Button variant="outlined">
                        <FlagIcon></FlagIcon>
                    </Button>
                </Tooltip>
            </div>
            <Button variant="contained" onClick={handleSubmitExercise}>Nộp bài</Button>
        </div>
    </Box>
}

export default ExcerciseDetail;