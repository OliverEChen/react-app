import { createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: sessionStorage.getItem('token') || null,
        username: sessionStorage.getItem('username') || '',
        menuList: []
    },
    reducers: {
        setToken: (state,action) => {
            state.token = action.payload;
            sessionStorage.setItem('token', action.payload);
        },
        setUsername: (state,action) => {
            state.username = action.payload;
            sessionStorage.setItem('username', action.payload);
        },
        setMenuList: (state, action) => {
            state.menuList = action.payload;
        },
        removeToken: (state) => {
            state.token = null;
            sessionStorage.removeItem('token');
        },
        logoutAction: (state) => {
            sessionStorage.clear()
            state.token = null;
            state.username = '';
        }
    }

})
export const {setToken, removeToken, setUsername, logoutAction, setMenuList} = authSlice.actions
export default authSlice.reducer