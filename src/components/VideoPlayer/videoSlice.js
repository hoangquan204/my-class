import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getListVideo = createAsyncThunk('video/get-list-video', async (values) => {
    try {
        const { data } = await api.get(`/api/video/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export const createVideo = createAsyncThunk('video/create', async (values) => {
    try {
        const { data } = await api.post("/api/video", values)
        return data
    } catch (error) {
        return error.message
    }
})

export default createSlice({
    name: 'video',
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
            //GET LIST VIDEO
            .addCase(getListVideo.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(getListVideo.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = action.payload
                state.error = false
                state.success = true
                state.message = 'Lấy danh sách video thành công!'
                state.loading = false

                return state
            })
            .addCase(getListVideo.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //CREATE VIDEO
            .addCase(createVideo.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(createVideo.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = [...state.list, action.payload]
                state.error = false
                state.success = true
                state.message = 'Tạo video thành công!'
                state.loading = false

                return state
            })
            .addCase(createVideo.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })
    }
})