import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getListFlashCard = createAsyncThunk('flashcard/get-list-flashcard', async (values) => {
    try {
        const { data } = await api.get(`/api/flashcard/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export const createFlashCard = createAsyncThunk('flashcard/create', async (values) => {
    try {
        const { data } = await api.post("/api/flashcard", values)
        return data
    } catch (error) {
        return error.message
    }
})

export default createSlice({
    name: 'flashcard',
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
            //GET LIST FLASH CARD
            .addCase(getListFlashCard.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(getListFlashCard.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = action.payload
                state.error = false
                state.success = true
                state.message = 'Lấy danh sách flashcard thành công!'
                state.loading = false

                return state
            })
            .addCase(getListFlashCard.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //CREATE FlASH CARD
            .addCase(createFlashCard.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(createFlashCard.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = [...state.list, action.payload]
                state.error = false
                state.success = true
                state.message = 'Tạo flashcard thành công!'
                state.loading = false

                return state
            })
            .addCase(createFlashCard.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })
    }
})