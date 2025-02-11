import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getListComment = createAsyncThunk('comment/get-list-comment', async (values) => {
    try {
        const { data } = await api.get(`api/comment/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export const createComment = createAsyncThunk('comment/create', async (values) => {
    try {
        const { data } = await api.post("api/comment", values)
        return data
    } catch (error) {
        return error.message
    }
})

export default createSlice({
    name: 'comment',
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
            //GET LIST COMMENT
            .addCase(getListComment.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(getListComment.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = action.payload
                state.error = false
                state.success = true
                state.message = 'Lấy danh sách bình luận thành công!'
                state.loading = false

                return state
            })
            .addCase(getListComment.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //CREATE NEWS
            .addCase(createComment.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(createComment.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = [...state.list, action.payload]
                state.error = false
                state.success = true
                state.message = 'Gửi bình luận thành công!'
                state.loading = false

                return state
            })
            .addCase(createComment.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })
    }
})