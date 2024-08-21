// src/store/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface AppState {
    view: string;
    row_count: number;
}

const initialState: AppState = {
    view: 'Assigned Devices',
    row_count: 10,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAssignedDevices: state => {
            state.view = 'Assigned Devices';
        },
        setTeamDevices: state => {
            state.view = 'Team Devices';
        },
        setTeamMembers: state => {
            state.view = 'Team Members';
        },
        setTeamManagers: state => {
            state.view = 'Team Managers';
        },
        setMobilePhonebook: state => {
            state.view = 'Mobile Phonebook';
        },
        setAdminPannel: state => {
            state.view = 'Admin Pannel';
        },
        setRowCount: (state, action) => {
            state.row_count = action.payload
        }
    },
});

export const { setRowCount, setAssignedDevices, setTeamDevices, setTeamMembers, setTeamManagers, setMobilePhonebook, setAdminPannel } = appSlice.actions;

export const selectView = (state: RootState) => state.app.view;

export const selectRowCount = (state: RootState) => state.app.row_count;

export default appSlice.reducer;