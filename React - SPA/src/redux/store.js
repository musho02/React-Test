import { configureStore } from '@reduxjs/toolkit';
import personReducer from './personSlice';
import personEditReducer from './personEditSlice';
import selectionReducer from './selectionSlice';

const store = configureStore({
    reducer: {
        person: personReducer,
        personEdit: personEditReducer,
        selection: selectionReducer,
    },
});

export default store;