import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'notification',
    initialState: {
        isShow: false,
        type: 'success',
        message: ''
    },
    reducers: {
        showNotification: (state, action) => {
            state.isShow = true
            state.type = action.payload.type
            state.message = action.payload.message
            return state
        },
        closeNotification: (state, action) => {
            state.isShow = false
            return state
        }
    }
})