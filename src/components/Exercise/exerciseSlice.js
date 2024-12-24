import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getListExercise = createAsyncThunk('exercise/get-list-exercise', async (values) => {
    try {
        const { data } = await api.get(`/api/exercise/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export const createExercise = createAsyncThunk('exercise/create', async (values) => {
    try {
        const { data } = await api.post("/api/exercise", values)
        return data
    } catch (error) {
        return error.message
    }
})

export default createSlice({
    name: 'exercise',
    initialState: {
        list: [],
        classRoomId: 0,
        error: false,
        loading: false,
        success: false,
        message: ''
    },
    reducers: {
        setClassRoomId: (state, action) => {
            console.log('set class room id: ', action.payload)
            state.classRoomId = action.payload
            return state
        }
    },
    extraReducers: builder => {
        builder
            //GET LIST EXERCISE
            .addCase(getListExercise.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(getListExercise.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = action.payload
                state.error = false
                state.success = true
                state.message = 'Get list excercise successfully!'
                state.loading = false

                return state
            })
            .addCase(getListExercise.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //CREATE EXERCISE
            .addCase(createExercise.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(createExercise.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = [...state.list, action.payload]
                state.error = false
                state.success = true
                state.message = 'Create exercise successfully!'
                state.loading = false

                return state
            })
            .addCase(createExercise.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })
    }
})