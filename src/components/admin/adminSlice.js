import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getListAccount = createAsyncThunk('admin/get-list-account', async () => {
    try {
        const { data } = await api.get("/user")
        return data
    } catch (error) {
        return error.message
    }
})

export const getListOrder = createAsyncThunk('admin/get-list-order', async (values) => {
    try {
        const { data } = await api.get(`/order/list-order/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export const getListMessage = createAsyncThunk('admin/get-list-message', async (values) => {
    try {
        const { data } = await api.get(`/message/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export const createMessageAdmin = createAsyncThunk('admin/create-message', async (values) => {
    try {
        const { data } = await api.post(`/message/${values.userId}`, values.message)
        return data
    } catch (error) {
        return error.message
    }
})

export default createSlice({
    name: 'admin',
    initialState: {
        listAccount: [],
        listOrder: [],
        listMessage: [],
        error: false,
        loading: false,
        success: false,
        message: ''
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            //GET LIST ACCOUNT
            .addCase(getListAccount.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                state.success = false

                return state
            })
            .addCase(getListAccount.fulfilled, (state, action) => {
                console.log(action.payload)
                state.listAccount = action.payload
                state.error = false
                state.success = true
                state.message = 'Get list account successfully!'
                state.loading = false

                return state
            })
            .addCase(getListAccount.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''
                state.success = false

                return state
            })

            //GET LIST ORDER
            .addCase(getListOrder.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                state.success = false

                return state
            })
            .addCase(getListOrder.fulfilled, (state, action) => {
                state.listOrder = action.payload
                console.log(action.payload)
                state.error = false
                state.success = true
                state.message = 'Get list order successfully!'
                state.loading = false

                return state
            })
            .addCase(getListOrder.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //GET LIST MESSAGE
            .addCase(getListMessage.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                state.success = false

                return state
            })
            .addCase(getListMessage.fulfilled, (state, action) => {
                state.listMessage = action.payload
                console.log(action.payload)
                state.error = false
                state.success = true
                state.message = 'Get list message successfully!'
                state.loading = false

                return state
            })
            .addCase(getListMessage.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //CREATE MESSAGE BY ADMIN
            .addCase(createMessageAdmin.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                state.success = false

                return state
            })
            .addCase(createMessageAdmin.fulfilled, (state, action) => {
                state.listMessage = [...state.listMessage, action.payload]
                console.log(action.payload)
                state.error = false
                state.success = true
                state.message = 'Create message by admin successfully!'
                state.loading = false

                return state
            })
            .addCase(createMessageAdmin.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })
    }
})