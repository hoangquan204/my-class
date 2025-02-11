import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getListExerciseResult = createAsyncThunk('exercise-result/get-list-exercise-result', async (values) => {
    try {
        const { data } = await api.get(`/api/exercise-result/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export const getListExerciseResultByUser = createAsyncThunk('exercise-result/get-list-exercise-result-by-user', async (values) => {
    try {
        const { data } = await api.get(`/api/exercise-result/user/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export const createExerciseResult = createAsyncThunk('exercise-result/create', async (values) => {
    try {
        const { data } = await api.post("/api/exercise-result", values)
        return data
    } catch (error) {
        return error.message
    }
})

export default createSlice({
    name: 'exerciseResult',
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
            //GET LIST EXERCISE RESULT
            .addCase(getListExerciseResult.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(getListExerciseResult.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = action.payload
                state.error = false
                state.success = true
                state.message = 'Lấy danh sách kết quả bài tập thành công!'
                state.loading = false

                return state
            })
            .addCase(getListExerciseResult.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //GET LIST EXERCISE RESULT BY USER
            .addCase(getListExerciseResultByUser.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(getListExerciseResultByUser.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = action.payload
                state.error = false
                state.success = true
                state.message = 'Lấy danh sách kết quả bài tập theo người dùng thành công!'
                state.loading = false

                return state
            })
            .addCase(getListExerciseResultByUser.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //CREATE EXERCISE RESULT
            .addCase(createExerciseResult.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(createExerciseResult.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = [...state.list, action.payload]
                state.error = false
                state.success = true
                state.message = 'Nộp bài tập thành công!'
                state.loading = false

                return state
            })
            .addCase(createExerciseResult.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })
    }
})