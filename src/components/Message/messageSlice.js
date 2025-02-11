import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getListMessage = createAsyncThunk('message/get-list-message', async (values) => {
    try {
        const { data } = await api.get(`/api/message/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export const createMessage = createAsyncThunk('message/create', async (values) => {
    try {
        const { data } = await api.post("/api/message", values)
        return data
    } catch (error) {
        return error.message
    }
})

export default createSlice({
    name: 'message',
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
            //GET LIST MESSAGE
            .addCase(getListMessage.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(getListMessage.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = action.payload
                state.error = false
                state.success = true
                state.message = 'Lấy danh sách tin nhắn thành công!'
                state.loading = false

                return state
            })
            .addCase(getListMessage.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //CREATE MESSAGE
            .addCase(createMessage.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = [...state.list, action.payload]
                state.error = false
                state.success = true
                state.message = 'Gửi tin nhắn thành công!'
                state.loading = false

                return state
            })
            .addCase(createMessage.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })
    }
})