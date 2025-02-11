import { Avatar, Box, Button, Pagination, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import classRoomSlice, { getListAllClassRoom } from "../ClassRoom/classRoomSlice";
import { useEffect, useRef, useState } from "react";
import { getAuthSelector, getClassRoomSelector, getThemeSelector } from "../../redux/selector";
import { useNavigate } from "react-router-dom";
import ClassRoomCard from "../ClassRoom/ClassRoomCard";
import SearchModal from "./SearchModal";
import BreadcrumbsCustom from "../BreadcrumbsCustom/BreadcrumbsCustom";

function ListClassRoom() {
    const classRoom = useSelector(getClassRoomSelector)
    const auth = useSelector(getAuthSelector)

    const isMember = (classRoom) => {
        return classRoom.teacher.account.username === auth.username || classRoom?.members?.some((member) => {
            return member.account.username === auth.username
        })
    }

    const theme = useSelector(getThemeSelector)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getListAllClassRoom())
    }, [dispatch])

    const headerRef = useRef(null);

    const scrollToHeader = () => {
        headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    console.log('location: ', window.location.pathname === '/')

    const breadcumbs = [
        {
            title: 'Trang chủ',
            path: '/'
        }
    ]

    return <div>
        {
            window.location.pathname !== '/' && <BreadcrumbsCustom secondary={breadcumbs} primary={'Lớp học'} />
        }
        <Typography ref={headerRef} className='text-primary py-2 border-l-4 border-l-primary' >
            <span className='text-xl font-semibold px-1 '>Danh sách lớp học: </span>
        </Typography>
        <div className='flex items-center justify-around gap-x-2 gap-y-2 flex-wrap'>
            {Array.isArray(classRoom?.listRender) && classRoom.listRender.length > 0 ? classRoom?.listRender?.map((item) => {
                return <ClassRoomCard isMember={isMember(item)} classRoom={item}></ClassRoomCard>
            }) : (
                <Box
                    className="flex flex-col items-center justify-center"
                    sx={{ textAlign: "center", color: theme.palette.textColor.main, py: 4 }}
                >
                    <Typography variant="h6" gutterBottom>
                        Bạn chưa tham gia lớp học nào!
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        Hãy tìm kiếm lớp học yêu thích ngay.
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            navigate("/list-class");
                        }}
                    >
                        Tìm kiếm lớp học
                    </Button>
                </Box>
            )
            }
        </div>
        {Array.isArray(classRoom?.listAll) && classRoom.listAll.length > 4 &&
            <Box className='flex py-2' onClick={scrollToHeader}>
                <Pagination sx={{ m: 'auto' }} count={classRoom.totalPage} variant="outlined" color="primary" onChange={(event, value) => {
                    dispatch(classRoomSlice.actions.changePage(value))
                }} />
            </Box>
        }
    </div>
}

export default ListClassRoom;