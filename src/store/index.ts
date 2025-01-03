import { configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import settingSlice from './settingSlice'
export const store = configureStore({
    reducer: {
        authSlice,
        settingSlice
    },
})