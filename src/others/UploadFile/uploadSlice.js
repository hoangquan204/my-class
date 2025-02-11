import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";
export const uploadFile = createAsyncThunk('/uploadFile/upload', async (values) => {
    try {
        const { data } = await api.post("/api/upload", values, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return data
    } catch (error) {
        return error.message
    }
})

export default createSlice({
    name: 'uploadFile',
    initialState: {
        url: '',
        error: false,
        loading: false,
        success: false,
        message: ''
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            //UPLOAD FILE
            .addCase(uploadFile.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.success = false
                state.message = ''
                return state
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                if (action.payload)
                    state.url = action.payload
                console.log(state.url)
                state.error = false
                state.success = true
                state.message = 'Tải file lên Cloudinary thành công!'
                state.loading = false

                return state
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })
    }
})