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
        const { data } = await api.put("/api/class-room", values)
        return data
    } catch (error) {
        return error.message
    }
})

export const getPlan = createAsyncThunk('class-room/get-plan', async (values) => {
    try {
        const { data } = await api.get(`/api/plan/${values}`)
        return data
    } catch (error) {
        return error.message
    }
})

export const createPlan = createAsyncThunk('class-room/create-plan', async (values) => {
    try {
        const { data } = await api.post("/api/plan", values)
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
        listRender: [],
        page: 1,
        totalPage: 0,
        selectedClassRoomId: 0,
        error: false,
        loading: false,
        success: false,
        message: '',
        plan: {}
    },
    reducers: {
        refreshData: (state, action) => {
            state.list = []
        },
        setSelectedClassRoom: (state, action) => {
            state.selectedClassRoomId = action.payload
        },
        changePage: (state, action) => {
            state.page = action.payload
            state.listRender = state.listAll.filter((item, index) => {
                return (index < action.payload * 6) && (index >= (action.payload - 1) * 6)
            })
            return state
        }
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
                state.message = 'Lấy danh sách lớp học của bạn thành công!'
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
                if (action.payload !== 'Network Error') {
                    state.listAll = action.payload
                    state.listRender = Array.isArray(state?.listAll) ? state?.listAll?.filter((item, index) => {
                        return (index < 6) && (index >= 0)
                    }) : []
                    state.totalPage = Math.ceil(state.listAll?.length / 6)
                    state.error = false
                    state.success = true
                    state.message = 'Lấy danh sách lớp học thành công!'
                } else {
                    state.error = true
                    state.success = false
                    state.message = 'Lấy danh sách lớp học không thành công!'
                }
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
                state.listAll = [...state.listAll, action.payload]
                state.error = false
                state.success = true
                state.message = 'Tạo lớp học thành công!'
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
                state.message = 'Tham gia lớp học thành công!'
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

            //GET PLAN
            .addCase(getPlan.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(getPlan.fulfilled, (state, action) => {
                state.plan = action.payload
                state.error = false
                state.success = true
                state.message = 'Lấy kế hoạch lớp học thành công!'
                state.loading = false

                return state
            })
            .addCase(getPlan.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //CREATE PLAN
            .addCase(createPlan.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(createPlan.fulfilled, (state, action) => {
                state.plan = action.payload
                state.error = false
                state.success = true
                state.message = 'Tạo kế hoạch thành công!'
                state.loading = false

                return state
            })
            .addCase(createPlan.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

    }
})