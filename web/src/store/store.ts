// src/store/store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import appSlice from './appSlice';
import deviceSlice from './deviceSlice'
import teamSlice from './teamSlice';


const rootReducer = combineReducers({
    user: userReducer,
    app: appSlice,
    device: deviceSlice,
    team: teamSlice,
})

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;