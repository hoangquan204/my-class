import { useDispatch, useSelector } from "react-redux"
import { getAuthSelector, getClassRoomSelector, getThemeSelector } from "../../redux/selector"
import { useEffect, useState } from "react"
import { getFolder } from "../ClassRoom/classRoomSlice"
import { Box } from "lucide-react"
import DriveFolderCreationModal from "./DriveFolderCreationModal"
import { Typography } from "@mui/material"

function DriveFolder({ classRoomId }) {
    const classRoom = useSelector(getClassRoomSelector)
    const auth = useSelector(getAuthSelector)
    const theme = useSelector(getThemeSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFolder(classRoomId))
    }, [classRoomId])

    const [selectedClassRoom, setSelectedClassRoom] = useState({})

    useEffect(() => {
        const result = classRoom?.listAll?.find((item) => {
            return item.id === parseInt(classRoomId)
        })
        setSelectedClassRoom(result)
    }, [])

    return (
         classRoom?.folderId ? (
            <>
                <div className="py-2 text-center">
                    <DriveFolderCreationModal classRoomId={classRoomId}></DriveFolderCreationModal>
                </div>
                    <iframe
                        src={`https://drive.google.com/embeddedfolderview?id=${classRoom.folderId}#grid`}
                        style={{
                            width: "100%",
                            height: "100vh",   // toàn bộ chiều cao màn hình
                            border: "0",
                        }}
                        ></iframe>
            </>
                ) : (
                    <Box
                        className="flex flex-col items-center justify-center"
                        sx={{ textAlign: "center", color: theme.palette.textColor.main, py: 4 }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Chưa có thông báo nào!
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 2 }}>
                            Hãy theo dõi thường xuyên để nhận được thông báo mới nhé.
                        </Typography>
                    </Box>
                )
    )
}

export default DriveFolder
