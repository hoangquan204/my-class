import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getListFeedback = createAsyncThunk('feedback/get-list-feedback', async (values) => {
    try {
        const { data } = await api.get(`/api/feedback`)
        return data
    } catch (error) {
        return error.message
    }
})

export const createFeedback = createAsyncThunk('feedback/create', async (values) => {
    try {
        const { data } = await api.post("/api/feedback", values)
        return data
    } catch (error) {
        return error.message
    }
})

export const createFeedbackReply = createAsyncThunk('feedback/reply/create', async (values) => {
    try {
        const { data } = await api.post(`/api/feedback/reply/${values.replyFeedbackId}`, values.data)
        return data
    } catch (error) {
        return error.message
    }
})

export default createSlice({
    name: 'feedback',
    initialState: {
        list: [],
        error: false,
        loading: false,
        success: false,
        message: ''
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            //GET LIST FEEDBACK
            .addCase(getListFeedback.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(getListFeedback.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = action.payload
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

                return state
            })

            //CREATE FEEDBACK
            .addCase(createFeedback.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(createFeedback.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = [...state.list, action.payload]
                state.error = false
                state.success = true
                state.message = 'Gửi phản hồi thành công!'
                state.loading = false

                return state
            })
            .addCase(createFeedback.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //CREATE FEEDBACK REPLY
            .addCase(createFeedbackReply.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(createFeedbackReply.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = state.list.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
                state.error = false
                state.success = true
                state.message = 'Trả lời phản hồi thành công!'
                state.loading = false

                return state
            })
            .addCase(createFeedbackReply.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })
    }
})