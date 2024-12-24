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

export default createSlice({
    name: 'auth',
    initialState: {
        jwt: '',
        username: '',
        userDetail: {},
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
            state.message = 'Log out successfully!'

            return state
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
                    state.message = 'Sign in successfully!'
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
                state.message = 'Sign up successfully!'
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
                state.message = 'Update your profile successfully!'
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
                state.message = 'Set avatar successfully!'

                return state
            })
            .addCase(setAvatar.rejected, (state, action) => {
                state.error = true
                state.loading = false
                state.success = false
                state.message = ''

                return state
            })

    }
})