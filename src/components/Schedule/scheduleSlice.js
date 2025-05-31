import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getListSchedule = createAsyncThunk('schedule/get-list-schedule', async () => {
    try {
        const { data } = await api.get(`/api/schedule`)
        return data
    } catch (error) {
        return error.message
    }
})

export const createSchedule = createAsyncThunk('schedule/create', async (values) => {
    try {
        const { data } = await api.post("/api/schedule", values)
        return data
    } catch (error) {
        return error.message
    }
})

export default createSlice({
    name: 'schedule',
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
            //GET LIST SCHEDULE
            .addCase(getListSchedule.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(getListSchedule.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = action.payload
                state.error = false
                state.success = true
                state.message = 'Lấy danh sách lịch học thành công!'
                state.loading = false

                return state
            })
            .addCase(getListSchedule.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //CREATE SCHEDULE
            .addCase(createSchedule.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(createSchedule.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = [...state.list, action.payload]
                state.error = false
                state.success = true
                state.message = 'Tạo lịch học thành công!'
                state.loading = false

                return state
            })
            .addCase(createSchedule.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })
    }
})