import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationSelector } from "../../redux/selector";
import notificationSlice from './notificationSlice'

function Notification() {
    const notification = useSelector(getNotificationSelector)

    const dispatch = useDispatch()
    return <Snackbar
        open={notification.isShow}
        autoHideDuration={2000}
        variant="filled"
        onClose={() => {
            dispatch(notificationSlice.actions.closeNotification())
        }}
    >
        <Alert severity={notification.type}>
            {notification.message}
        </Alert>
    </Snackbar>
}

export default Notification;