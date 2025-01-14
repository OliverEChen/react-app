import { createSlice } from "@reduxjs/toolkit";
export const contractSlice = createSlice({
    name: "contract",
    initialState: {
        tableData: [],
        pages: {
            page: 1,
            pageSize: 10,
            total: 0
        },
        queryParams: {}
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload.data
            state.pages.total = action.payload.total
            state.pages.page = action.payload.page
            state.pages.pageSize = action.payload.pageSize

        },
        setQueryParams: (state, action) => {
            state.queryParams = action.payload
        }
    }
})

export const { setTableData, setQueryParams } = contractSlice.actions
export default contractSlice.reducer