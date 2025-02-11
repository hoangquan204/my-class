import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getListLessonByClassRoomId = createAsyncThunk('lesson/get-list-lesson', async (values) => {
    try {
        const { data } = await api.get(`/api/lesson/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export const createLesson = createAsyncThunk('lesson/create', async (values) => {
    try {
        const { data } = await api.post("/api/lesson", values)
        return data
    } catch (error) {
        return error.message
    }
})

export default createSlice({
    name: 'lesson',
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
            //GET LIST LESSON BY CLASS ROOM ID
            .addCase(getListLessonByClassRoomId.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(getListLessonByClassRoomId.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = action.payload
                state.error = false
                state.success = true
                state.message = 'Lấy danh sách bài giảng theo lớp học thành công!'
                state.loading = false

                return state
            })
            .addCase(getListLessonByClassRoomId.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //CREATE LESSON
            .addCase(createLesson.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(createLesson.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = [...state.list, action.payload]
                state.error = false
                state.success = true
                state.message = 'Tạo bài giảng thành công!'
                state.loading = false

                return state
            })
            .addCase(createLesson.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })
    }
})