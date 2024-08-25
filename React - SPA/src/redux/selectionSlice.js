import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedRowKeys: [],
};

const selectionSlice = createSlice({
    name: 'selection',
    initialState,
    reducers: {
        toggleSelectRow: (state, action) => {
            const index = state.selectedRowKeys.indexOf(action.payload);
            if (index === -1) {
                state.selectedRowKeys.push(action.payload);
            } else {
                state.selectedRowKeys.splice(index, 1);
            }
        },
        deleteSelectedRows: (state) => {
            state.selectedRowKeys = [];
        },
        selectAllRows: (state, action) => {
            state.selectedRowKeys = action.payload;
        }
    },
});

export const { toggleSelectRow, deleteSelectedRows, selectAllRows } = selectionSlice.actions;

export default selectionSlice.reducer;
