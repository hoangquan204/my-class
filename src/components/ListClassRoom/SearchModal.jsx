import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Card, CardContent, IconButton, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSelector, getClassRoomSelector, getThemeSelector } from '../../redux/selector';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { addMember } from '../ClassRoom/classRoomSlice';
import notificationSlice from '../Notification/notificationSlice';
import { Mic } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

export default function SearchModal() {
    const [open, setOpen] = React.useState(false);
    const [listResult, setListResult] = React.useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [selectedClass, setSelectedClass] = React.useState({})

    const auth = useSelector(getAuthSelector)
    const classRoom = useSelector(getClassRoomSelector)
    const navigate = useNavigate()

    const isMember = (classRoom) => {
        return classRoom.teacher.account.username === auth.username || classRoom?.members?.some((member) => {
            return member.account.username === auth.username
        })
    }

    const handleSearch = (value) => {
        setSearchValue(value)
        const result = Array.isArray(classRoom?.listAll) ?
            classRoom.listAll.filter((item) => {
                return item.name.toLowerCase().includes(searchValue?.toLowerCase())
            })
            : []
        setListResult(result)
    }

    const dispatch = useDispatch()

    const handleAddMember = () => {
        if (auth.username) {
            if (selectedClass?.password === classRoomPassword) {
                const data = {
                    classRoomId: selectedClass.id,
                    password: classRoomPassword
                }
                dispatch(addMember(data))
                dispatch(notificationSlice.actions.showNotification({
                    type: 'success',
                    message: 'Join the class successfully!'
                }))
                navigate("/class")
            } else
                dispatch(notificationSlice.actions.showNotification({
                    type: 'error',
                    message: 'Mã lớp học không đúng!'
                }))

        } else
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'You are not logged in!'
            }))
    }

    const theme = useSelector(getThemeSelector)

    const [classRoomPassword, setClassRoomPassword] = React.useState('')
    const [openClassRoomPasswordModal, setOpenClassRoomPasswordModal] = React.useState(false)

    const toggleOpenClassRoomPasswordModal = () => {
        setOpenClassRoomPasswordModal(!openClassRoomPasswordModal)
    }

    const handleGetClass = (item) => {
        console.log('status: ', item.status);

        if (item.status === 'disable')
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Lớp học đã bị vô hiệu hóa!'
            }))
        else
            navigate(`/class/${item.id}`)
    }

    const handleJoinClass = (item) => {
        console.log('status: ', item.status);

        if (item.status === 'disable')
            dispatch(notificationSlice.actions.showNotification({
                type: 'error',
                message: 'Lớp học đã bị vô hiệu hóa!'
            }))
        else {
            if (auth.username) {
                setSelectedClass(item)
                toggleOpenClassRoomPasswordModal()
            } else
                dispatch(notificationSlice.actions.showNotification({
                    type: 'error',
                    message: 'Bạn chưa đăng nhập!'
                }))
        }
    }



    const classRoomPasswordModal = (
        <Modal
            open={openClassRoomPasswordModal}
            onClose={toggleOpenClassRoomPasswordModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='flex flex-col items-center gap-y-2' sx={{ ...style, width: 400 }}>
                <Typography sx={{ color: theme.palette.textColor.main }} variant='h5'>Nhập mã lớp học</Typography>
                <TextField value={classRoomPassword} className='w-full' id="filled-basic" label={'Nhập mã lớp:'} variant="filled" onChange={(e) => {
                    setClassRoomPassword(e.target.value)
                }} />
                <Button variant='contained' onClick={handleAddMember}>Tham gia</Button>
            </Box>
        </Modal>
    )

    const [voiceSearch, setVoiceSearch] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const recognitionRef = React.useRef(null);


    const startVoiceRecognition = () => {
        setVoiceSearch(true);
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'vi-VN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognitionRef.current = recognition;

        recognition.start();

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            const result = Array.isArray(classRoom?.listAll) ?
                classRoom.listAll.filter((item) => {
                    return item.name.toLowerCase().includes(speechResult.toLowerCase())
                })
                : []
            setListResult(result)
            setSearchValue(speechResult);
            setIsOpen(true)
        };

        recognition.onspeechend = () => {
            recognition.stop();
            setVoiceSearch(false);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setVoiceSearch(false);
        };
    };

    const handleFocus = () => {
        setIsOpen(true);
    };

    const handleCloseVoiceSearch = () => {
        handleSearch()
        setVoiceSearch(false);
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    const voiceModal = (
        <Modal
            open={voiceSearch}
            onClose={handleCloseVoiceSearch}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div>
                    <Mic sx={{ fontSize: '5rem', color: `${theme.palette.primary.main}` }} />
                    <span className='voice'>
                        Đang nghe ...
                    </span>
                </div>
            </Box>
        </Modal>
    )

    return (
        <div>
            {classRoomPasswordModal}
            {voiceModal}
            <div className='flex items-center gap-1 p-2 rounded-md border' onClick={handleOpen}>
                <Typography>Tìm kiếm</Typography>
                <SearchIcon></SearchIcon>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='gap-2' sx={style}>
                    <div className='flex flex-col gap-2'>
                        <TextField
                            onFocus={handleFocus}
                            onChange={(e) => {
                                handleSearch(e.target.value)
                            }}
                            sx={{
                                borderRadius: '30px',
                            }}
                            variant="outlined"
                            placeholder="Tìm kiếm..."
                            value={searchValue}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={startVoiceRecognition}>
                                            <Mic />
                                        </IconButton>
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                        <div className='flex items-center justify-around flex-wrap h-64 overflow-y-scroll'>
                            {Array.isArray(listResult) && listResult.length > 0 ? listResult?.map((item) => {
                                return (
                                    <Card className="flex flex-row w-full gap-4 p-4 shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow">
                                        {/* Thumbnail */}
                                        <img
                                            src={item.thumbnail || "https://via.placeholder.com/150"}
                                            alt={item.name}
                                            className='w-[40%] h-20 object-cover rounded-md'
                                        />

                                        {/* Class Details */}
                                        <div className='flex w-[60%] items-center justify-between'>
                                            <CardContent className="w-[60%] flex flex-col justify-between">
                                                {/* Name */}
                                                <Typography variant="h6" className="font-bold text-gray-800">
                                                    {item.name}
                                                </Typography>
                                                {/* Description */}
                                                <Typography
                                                    variant="body2"
                                                    className="text-gray-600 line-clamp-2"
                                                >
                                                    {item.description || "No description available."}
                                                </Typography>
                                            </CardContent>

                                            {isMember(item)
                                                ?
                                                <Button variant='outlined' onClick={() => {
                                                    handleGetClass(item)
                                                }} >
                                                    Vào lớp
                                                </Button>
                                                :
                                                <Button variant='outlined' onClick={() => {
                                                    handleJoinClass(item)
                                                }}>
                                                    Tham gia
                                                </Button>
                                            }
                                        </div>
                                    </Card>
                                )
                            }) :
                                <Box
                                    className="flex flex-col items-center justify-center"
                                    sx={{ textAlign: "center", color: theme.palette.textColor.main, py: 4 }}
                                >
                                    <Typography variant="h6" gutterBottom>
                                        Kết quả tìm kiếm!
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                        Hãy điền tên khóa học mà bạn muốn tìm.
                                    </Typography>
                                </Box>
                            }
                        </div>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}