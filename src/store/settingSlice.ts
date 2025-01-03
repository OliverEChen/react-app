import { createSlice} from '@reduxjs/toolkit'

export const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        collapsed: false,
    },
    reducers: {
        toggleCollapsedAction: (state,action) => {
            state.collapsed = action.payload;
        },
    }

})
export const {toggleCollapsedAction} = settingSlice.actions
export default settingSlice.reducer