import { configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import settingSlice from './settingSlice'
import contractSlice from './finance/contract'
export const store = configureStore({
    reducer: {
        authSlice,
        settingSlice,
        contractSlice
    },
})