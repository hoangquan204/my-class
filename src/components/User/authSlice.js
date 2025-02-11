import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { jwtDecode } from 'jwt-decode'

export const signIn = createAsyncThunk('/auth/sign-in', async (values) => {
    try {
        const { data } = await api.post('api/auth/sign-in', values)
        console.log(data)
        return data
    } catch (error) {
        return error.message
    }
})

export const signUp = createAsyncThunk('/auth/sign-up', async (values) => {
    try {
        const { data } = await api.post('api/auth/sign-up', values)
        console.log(data)
        return data
    } catch (error) {
        return error.message
    }
})

export const updateUser = createAsyncThunk('/auth/update-user', async (values) => {
    try {
        const { data } = await api.put('api/user', values)
        console.log(data)
        return data
    } catch (error) {
        return error.message
    }
})

export const setAvatar = createAsyncThunk('/auth/set-avatar', async (values) => {
    try {
        const { data } = await api.post("api/user/set-avatar", values, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return data
    } catch (error) {
        return error.message
    }
})

export const getListFeedbackByUser = createAsyncThunk('/auth/get-list-feedback', async (values) => {
    try {
        const { data } = await api.get("/api/feedback/user")
        return data
    } catch (error) {
        return error.message
    }
})

export const getAnalyticsDataByUser = createAsyncThunk('/auth/get-analytics-data', async (values) => {
    try {
        const { data } = await api.get("/api/user/analytics")
        return data
    } catch (error) {
        return error.message
    }
})

export const sendOTP = createAsyncThunk('/auth/send-otp', async (values) => {
    try {
        console.log('values', values)
        const { data } = await api.post("/api/email/send-otp", values)
        return data
    } catch (error) {
        return error.message
    }
})

export const updatePassword = createAsyncThunk('/auth/update-password', async (values) => {
    try {
        console.log('values', values)
        const { data } = await api.put("/api/user/update-password", values)
        return data
    } catch (error) {
        return error.message
    }
})
export default createSlice({
    name: 'auth',
    initialState: {
        jwt: '',
        username: '',
        userDetail: {},
        listFeedback: [],
        analyticsData: {},
        usernameOTP: '',
        otp: '',
        success: false,
        loading: false,
        error: false,
        message: ''
    },
    reducers: {
        logOut: (state, action) => {
            localStorage.clear()
            state.jwt = ''
            state.username = ''
            state.message = 'Đăng xuất thành công!'

            return state
        },
        setUsernameOTP: (state, action) => {
            state.usernameOTP = action.payload
        },
        resetOtp: (state, action) => {
            state.otp = ''
        }
    },
    extraReducers: (builder) => {
        builder
            //SIGN IN
            .addCase(signIn.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                return state
            })
            .addCase(signIn.fulfilled, (state, action) => {
                localStorage.clear()
                if (action.payload?.token) {
                    console.log(action.payload)
                    state.jwt = action.payload.token
                    localStorage.setItem('jwt', state.jwt)
                    state.username = jwtDecode(state.jwt).sub
                    state.userDetail = action.payload.userDetail
                    state.error = false
                    state.success = true
                    state.message = 'Đăng nhập thành công!'
                } else {
                    state.error = true
                    state.success = false
                    state.message = ''
                }

                state.loading = false
                return state
            })
            .addCase(signIn.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //SIGN UP
            .addCase(signUp.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                return state
            })
            .addCase(signUp.fulfilled, (state, action) => {
                localStorage.clear()
                state.message = 'Đăng ký tài khoản thành công!'
                state.userDetail = {}
                state.jwt = ''
                state.username = ''
                state.loading = false
                return state
            })
            .addCase(signUp.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //UPDATE USER
            .addCase(updateUser.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                return state
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.userDetail = action.payload
                state.loading = false
                state.error = false
                state.message = 'Cập nhật thông tin thành công!'
                return state
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //SET AVATAR
            .addCase(setAvatar.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''

                return state
            })
            .addCase(setAvatar.fulfilled, (state, action) => {
                state.userDetail = { ...state.userDetail, avatar: action.payload }
                console.log(action.payload)
                state.loading = false
                state.error = false
                state.message = 'Đổi ảnh đại diện thành công!'

                return state
            })
            .addCase(setAvatar.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

            //GET LIST FEEDBACK BY USER
            .addCase(getListFeedbackByUser.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                state.success = false

                return state
            })
            .addCase(getListFeedbackByUser.fulfilled, (state, action) => {
                console.log(action.payload)
                state.listFeedback = action.payload
                state.error = false
                state.success = true
                state.message = 'Lấy danh sách phản hồi của bạn thành công!'
                state.loading = false

                return state
            })
            .addCase(getListFeedbackByUser.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''
                state.success = false

                return state
            })

            //GET ANALYTICS DATA BY USER
            .addCase(getAnalyticsDataByUser.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                state.success = false

                return state
            })
            .addCase(getAnalyticsDataByUser.fulfilled, (state, action) => {
                console.log(action.payload)
                state.analyticsData = action.payload
                state.error = false
                state.success = true
                state.message = 'Lấy số liệu thống kê của bạn thành công!'
                state.loading = false

                return state
            })
            .addCase(getAnalyticsDataByUser.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''
                state.success = false
                return state
            })

            //SEND OTP
            .addCase(sendOTP.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                state.success = false

                return state
            })
            .addCase(sendOTP.fulfilled, (state, action) => {
                console.log(action.payload)
                state.error = false
                state.success = true
                state.otp = action.payload
                state.message = 'Gửi mã OTP thành công!'
                state.loading = false

                return state
            })
            .addCase(sendOTP.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''
                state.success = false
                return state
            })

            //UPDATE PASSWORD
            .addCase(updatePassword.pending, (state, action) => {
                state.loading = true
                state.error = false
                state.message = ''
                state.success = false

                return state
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                console.log(action.payload)
                state.error = false
                state.success = true
                state.message = 'Cập nhật mật khẩu thành công!'
                state.loading = false

                return state
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''
                state.success = false
                return state
            })
    }
})