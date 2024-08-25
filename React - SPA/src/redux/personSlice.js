import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
    const data = localStorage.getItem('persons');
    return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (data) => {
    localStorage.setItem('persons', JSON.stringify(data));
};

const personSlice = createSlice({
    name: 'person',
    initialState: loadFromLocalStorage(),
    reducers: {
      addPerson: (state, action) => {
        state.push(action.payload);
        saveToLocalStorage(state);
      },
      editPerson: (state, action) => {
        const index = state.findIndex(person => person.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
          saveToLocalStorage(state);
        }
      },
      deletePerson: (state, action) => {
        const newState = state.filter(person => person.id !== action.payload);
        saveToLocalStorage(newState);
        return newState;
      },
    },
  });

  export const { addPerson, editPerson, deletePerson } = personSlice.actions;
  export default personSlice.reducer;