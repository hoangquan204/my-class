import { Avatar, Box, Typography } from "@mui/material";
import Tabs from './Tabs'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getClassRoomSelector } from "../../redux/selector";
import moment from "moment/moment";
import { useParams } from "react-router-dom";

function ClassRoomDetail() {
    const { id } = useParams();

    const [selectedClass, setSelectedClass] = useState({})
    const [formattedDateTime, setFormattedDateTime] = useState('')

    const classRoom = useSelector(getClassRoomSelector)

    useEffect(() => {
        if (Array.isArray(classRoom?.listAll)) {
            const item = classRoom.listAll.find((curr) => {
                return curr.id === parseInt(id)
            })
            setSelectedClass(item)

            const specificDateTime = moment(item?.createAt);
            setFormattedDateTime(specificDateTime.format('DD-MM-YYYY HH:mm:ss'))
        }
    }, []);

    return <Box className='px-4'>
        <div className='relative'>
            <img className='w-full h-[300px] object-cover' src={selectedClass?.thumbnail}>
            </img>
            <img className='absolute -bottom-4 left-4 w-[100px] h-[100px] rounded-full' src={selectedClass?.avatar}></img>
        </div>
        <div className='flex items-center justify-between py-4'>
            <div className='flex flex-col gap-y-2'>
                <span className='font-semibold text-2xl'>{selectedClass?.name}</span>
                <Typography variant='body'>{selectedClass?.description}</Typography>
            </div>
            <div className='flex flex-col gap-y-2'>
                <div className='flex items-center gap-x-2'>
                    <span className='text-md font-semibold'>Giáo viên: </span>
                    <Avatar src={selectedClass?.teacher?.avatar}></Avatar>
                    <Typography>{selectedClass?.teacher?.name}</Typography>
                </div>
                <div className='flex items-center gap-x-2'>
                    <span className='text-md font-semibold'>Tạo ngày: </span>
                    <Typography>{formattedDateTime}</Typography>
                </div>
            </div>
        </div>
        <Tabs classRoom={selectedClass}></Tabs>
    </Box>
}

export default ClassRoomDetail;