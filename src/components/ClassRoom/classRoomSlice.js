import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getListClassRoom = createAsyncThunk('class-room/get-list-class-room', async () => {
    try {
        const { data } = await api.get("/api/class-room")
        return data
    } catch (error) {
        return error.message
    }
})

export const getListAllClassRoom = createAsyncThunk('class-room/get-list-all-class-room', async () => {
    try {
        const { data } = await api.get("/api/class-room/get-all")
        return data
    } catch (error) {
        return error.message
    }
})

export const createClassRoom = createAsyncThunk('class-room/create', async (values) => {
    try {
        const { data } = await api.post("/api/class-room", values)
        return data
    } catch (error) {
        return error.message
    }
})

export const addMember = createAsyncThunk('class-room/add-member', async (values) => {
    try {
        console.log('endpoints: ', `/api/class-room/${values}`)
        const { data } = await api.put(`/api/class-room/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export default createSlice({
    name: 'classRoom',
    initialState: {
        list: [],
        listAll: [],
        error: false,
        loading: false,
        success: false,
        message: ''
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            //GET LIST CLASS ROOM
            .addCase(getListClassRoom.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(getListClassRoom.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = action.payload
                console.log(state.list)
                state.error = false
                state.success = true
                state.message = 'Get list class room successfully!'
                state.loading = false

                return state
            })
            .addCase(getListClassRoom.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //GET LIST ALL CLASS ROOM
            .addCase(getListAllClassRoom.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(getListAllClassRoom.fulfilled, (state, action) => {
                state.listAll = action.payload
                console.log(state.listAll)
                state.error = false
                state.success = true
                state.message = 'Get list all class room successfully!'
                state.loading = false

                return state
            })
            .addCase(getListAllClassRoom.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //CREATE CLASS ROOM
            .addCase(createClassRoom.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(createClassRoom.fulfilled, (state, action) => {
                console.log(action.payload)
                state.list = [...state.list, action.payload]
                state.listAll = [...state.list, action.payload]
                state.error = false
                state.success = true
                state.message = 'Create news successfully!'
                state.loading = false

                return state
            })
            .addCase(createClassRoom.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //ADD MEMBER
            .addCase(addMember.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(addMember.fulfilled, (state, action) => {
                state.list = [...state.list, action.payload]
                state.error = false
                state.success = true
                state.message = 'Create news successfully!'
                state.loading = false

                return state
            })
            .addCase(addMember.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

    }
})