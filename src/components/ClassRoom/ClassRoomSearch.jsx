import { Avatar, Button, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addMember, getListAllClassRoom } from "./classRoomSlice";
import { useEffect } from "react";
import { getAuthSelector, getClassRoomSelector } from "../../redux/selector";
import { styled } from '@mui/material/styles';
import notificationSlice from "../Notification/notificationSlice";
import { useNavigate } from "react-router-dom";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


function ClassRoomSearch() {
    const classRoom = useSelector(getClassRoomSelector)
    const auth = useSelector(getAuthSelector)

    const isMember = (classRoom) => {
        return classRoom.teacher.account.username === auth.username || classRoom?.members?.some((member) => {
            return member.account.username === auth.username
        })
    }

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getListAllClassRoom())
    }, [dispatch])

    const handleAddMember = (classRoomId) => {
        console.log(classRoomId)
        dispatch(addMember(classRoomId))
        dispatch(notificationSlice.actions.showNotification({
            type: 'success',
            message: 'Tham gia lớp học thành công!'
        }))
    }
    return <>
        <Typography className='text-primary border-l-4 border-l-primary' >
            <span className='text-xl font-semibold px-1 '>Danh sách lớp học</span>
        </Typography>
        <TableContainer className='py-2' component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Thumbnail</StyledTableCell>
                        <StyledTableCell >Avatar</StyledTableCell>
                        <StyledTableCell >Name</StyledTableCell>
                        <StyledTableCell >Description</StyledTableCell>
                        <StyledTableCell ></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(classRoom?.listAll) && classRoom?.listAll?.map((item) => {
                        return <TableRow>
                            <StyledTableCell>
                                <img className='w-[100px] h-[50px] object-cover' src={item.thumbnail}></img>
                            </StyledTableCell>
                            <StyledTableCell >
                                <Avatar src={item.avatar}></Avatar>
                            </StyledTableCell>
                            <StyledTableCell >
                                {item.name}
                            </StyledTableCell>
                            <StyledTableCell >
                                {item.description}
                            </StyledTableCell>
                            <StyledTableCell >
                                {isMember(item)
                                    ?
                                    <Button variant='outlined' onClick={() => {
                                        navigate(`/class/${item.id}`)
                                    }} >
                                        Vào lớp
                                    </Button>
                                    :
                                    <Button variant='outlined' onClick={() => {
                                        handleAddMember(item.id)
                                    }}>
                                        Tham gia
                                    </Button>
                                }
                            </StyledTableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default ClassRoomSearch;