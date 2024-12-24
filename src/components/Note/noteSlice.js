import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getListNote = createAsyncThunk('note/get-list-note', async (values) => {
    try {
        const { data } = await api.get(`/api/note/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export const createNote = createAsyncThunk('note/create', async (values) => {
    try {
        const { data } = await api.post("/api/note", values)
        return data
    } catch (error) {
        return error.message
    }
})

export default createSlice({
    name: 'note',
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
            //GET LIST NOTE
            .addCase(getListNote.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(getListNote.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = action.payload
                state.error = false
                state.success = true
                state.message = 'Get list note successfully!'
                state.loading = false

                return state
            })
            .addCase(getListNote.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //CREATE NOTE
            .addCase(createNote.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(createNote.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = [...state.list, action.payload]
                state.error = false
                state.success = true
                state.message = 'Create note successfully!'
                state.loading = false

                return state
            })
            .addCase(createNote.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })
    }
})