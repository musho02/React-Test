import { createSlice } from '@reduxjs/toolkit';

const personEditSlice = createSlice({
  name: 'personEdit',
  initialState: null,
  reducers: {
    setPersonToEdit: (state, action) => action.payload,
    clearPersonToEdit: () => null,
  },
});

export const { setPersonToEdit, clearPersonToEdit } = personEditSlice.actions;
export default personEditSlice.reducer;