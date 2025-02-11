import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getListUser = createAsyncThunk('admin/get-list-user', async () => {
    try {
        const { data } = await api.get("/api/user")
        return data
    } catch (error) {
        return error.message
    }
})

export const getListFeedback = createAsyncThunk('admin/get-list-feedback', async (values) => {
    try {
        const { data } = await api.get("/api/feedback")
        return data
    } catch (error) {
        return error.message
    }
})

export const setDisableStatusAccount = createAsyncThunk('admin/set-disable-status-account', async (values) => {
    try {
        const { data } = await api.put(`/api/auth/disable/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export const setEnableStatusAccount = createAsyncThunk('admin/set-enable-status-account', async (values) => {
    try {
        const { data } = await api.put(`/api/auth/enable/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export const setDisableStatusClassRoom = createAsyncThunk('admin/set-disable-status-class', async (values) => {
    try {
        const { data } = await api.put(`/api/class-room/disable/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export const setEnableStatusClassRoom = createAsyncThunk('admin/set-enable-status-class', async (values) => {
    try {
        const { data } = await api.put(`/api/class-room/enable/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export default createSlice({
    name: 'admin',
    initialState: {
        listUser: [],
        listFeedback: [],
        error: false,
        loading: false,
        success: false,
        message: ''
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            //GET LIST USER
            .addCase(getListUser.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                state.success = false

                return state
            })
            .addCase(getListUser.fulfilled, (state, action) => {
                console.log(action.payload)
                state.listUser = action.payload
                state.error = false
                state.success = true
                state.message = 'Lấy danh sách người dùng thành công!'
                state.loading = false

                return state
            })
            .addCase(getListUser.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''
                state.success = false

                return state
            })

            //GET LIST FEEDBACK
            .addCase(getListFeedback.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                state.success = false

                return state
            })
            .addCase(getListFeedback.fulfilled, (state, action) => {
                console.log(action.payload)
                state.listFeedback = action.payload
                state.error = false
                state.success = true
                state.message = 'Lấy danh sách phản hồi thành công!'
                state.loading = false

                return state
            })
            .addCase(getListFeedback.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''
                state.success = false

                return state
            })

            //SET DISABLE STATUS ACOUNT
            .addCase(setDisableStatusAccount.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                state.success = false

                return state
            })
            .addCase(setDisableStatusAccount.fulfilled, (state, action) => {
                console.log(action.payload)
                state.error = false
                state.success = true
                state.message = action.payload
                state.loading = false

                return state
            })
            .addCase(setDisableStatusAccount.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''
                state.success = false

                return state
            })
            //SET ENABLE STATUS ACCOUNT
            .addCase(setEnableStatusAccount.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                state.success = false

                return state
            })
            .addCase(setEnableStatusAccount.fulfilled, (state, action) => {
                console.log(action.payload)
                state.error = false
                state.success = true
                state.message = action.payload
                state.loading = false

                return state
            })
            .addCase(setEnableStatusAccount.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''
                state.success = false

                return state
            })

            //SET DISABLE STATUS CLASS
            .addCase(setDisableStatusClassRoom.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                state.success = false

                return state
            })
            .addCase(setDisableStatusClassRoom.fulfilled, (state, action) => {
                console.log(action.payload)
                state.error = false
                state.success = true
                state.message = action.payload
                state.loading = false

                return state
            })
            .addCase(setDisableStatusClassRoom.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''
                state.success = false

                return state
            })
            //SET ENABLE STATUS CLASS
            .addCase(setEnableStatusClassRoom.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                state.success = false

                return state
            })
            .addCase(setEnableStatusClassRoom.fulfilled, (state, action) => {
                console.log(action.payload)
                state.error = false
                state.success = true
                state.message = action.payload
                state.loading = false

                return state
            })
            .addCase(setEnableStatusClassRoom.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''
                state.success = false

                return state
            })
    }
})