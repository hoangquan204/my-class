import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getAnalyticsData = createAsyncThunk('analytics/get-naylytics-data', async () => {
    try {
        const { data } = await api.get("/api/analytics")
        return data
    } catch (error) {
        return error.message
    }
})

export default createSlice({
    name: 'analytics',
    initialState: {
        data: {},
        error: false,
        loading: false,
        success: false,
        message: ''
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            //GET ANALYTICS DATA
            .addCase(getAnalyticsData.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(getAnalyticsData.fulfilled, (state, action) => {
                console.log(action.payload)
                state.data = action.payload
                state.error = false
                state.success = true
                state.message = 'Lấy số liệu thống kê thành công!'
                state.loading = false

                return state
            })
            .addCase(getAnalyticsData.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })
    }
})