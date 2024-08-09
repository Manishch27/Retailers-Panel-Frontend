// client/src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import applicationReducer from '../reducers/applicationReducer';

const rootReducer = {
  auth: authReducer,
  application: applicationReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(),
});

export default store;