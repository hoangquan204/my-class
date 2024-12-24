import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/User/authSlice";
import notificationSlice from "../components/Notification/notificationSlice";
import themeSlice from "../theme/themeSlice";
import adminSlice from "../components/admin/adminSlice";
import uploadSlice from "../others/UploadFile/uploadSlice";
import messageSlice from "../components/Message/messageSlice";
import commentSlice from "../components/Comment/commentSlice";
import classRoomSlice from "../components/ClassRoom/classRoomSlice";
import noteSlice from "../components/Note/noteSlice";
import exerciseSlice from "../components/Exercise/exerciseSlice";

export default configureStore({
    reducer: {
        auth: authSlice.reducer,
        notification: notificationSlice.reducer,
        theme: themeSlice.reducer,
        admin: adminSlice.reducer,
        uploadFile: uploadSlice.reducer,
        message: messageSlice.reducer,
        comment: commentSlice.reducer,
        classRoom: classRoomSlice.reducer,
        note: noteSlice.reducer,
        exercise: exerciseSlice.reducer,
    }
})