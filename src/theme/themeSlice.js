import { createSlice } from "@reduxjs/toolkit";

export const darkMode = {
    mode: 'dark',
    primary: {
        main: '#198754'
    },
    secondary: {
        main: '#000082'
    },
    textColor: {
        main: '#fff'
    },
    containerColor: {
        main: '#000'
    },
    containerColor2: {
        main: '#333'
    }
}

export const lightMode = {
    mode: 'light',
    primary: {
        main: '#198754'
    },
    secondary: {
        main: '#000082'
    },
    textColor: {
        main: '#000'
    },
    containerColor: {
        main: '#fff'
    },
    containerColor2: {
        main: '#e5e7eb'
    }
}

export default createSlice({
    name: 'theme',
    initialState: {
        palette: lightMode
    }, reducers: {
        changeMode: (state, action) => {
            if (action.payload === 'light')
                state.palette = lightMode
            else
                state.palette = darkMode

            return state
        }
    }
}
)