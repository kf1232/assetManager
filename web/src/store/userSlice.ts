import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
import BASE_URL from '../constants/BASE_URL';
import Users from '../model/mobileadmin_users';

export interface UserState {
    name: string;
    team: string;
    role: string;
    mysingle_id: string;
    nt_id: string;
    developer: boolean;
}
0
const initialState: UserState = {
    name: 'Default Name',
    team: 'Default Team',
    role: 'Unknown',
    mysingle_id: 'default.id',
    nt_id: 'defaultid2025',
    developer: true,
}

export const fetchUserData = createAsyncThunk('user/fetchUserData',
    async () => {
        try {
            const res = await axios.get(`${BASE_URL}/login/ntlm`, { withCredentials: true });
            return res.data
        } catch (error) {
            console.error(error)
        }
    }
)

export const usertUser = createAsyncThunk(
    'user/usertUser',
    async (input: Partial<Users>) => {
        try {
            const res = await axios.post(`${BASE_URL}/devices/upsert`, input, { withCredentials: true })
            return res.data
        } catch (error) {
            console.error(error)
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAdmin: (state: UserState) => {
            state.role = 'Admin';
        },
        setManager: (state: UserState) => {
            state.role = 'Manager';
        },
        setUser: (state: UserState) => {
            state.role = 'User';
        },
        setUnknown: (state: UserState) => {
            state.role = 'Unknown';
        },
        setTeam: (state: UserState, action) => {
            state.team = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUserData.fulfilled, (state: UserState, action) => {
            state.name        = action.payload.site_users.full_name;
            state.team        = action.payload.reg_users.teamName;
            state.role        = action.payload.reg_users.appRole;
            state.mysingle_id = action.payload.site_users.mysingle_id;
            state.nt_id       = action.payload.site_users.nt_id;
        })
    }
});

export const { setAdmin, setManager, setUser, setUnknown, setTeam } = userSlice.actions;

export const selectUser = (state: RootState) => state.user
export const selectSelf = (state: RootState) => state.user.nt_id;
export const selectTeam = (state: RootState) => state.user.team;
export const selectRole = (state: RootState) => state.user.role;
export const selectName = (state: RootState) => state.user.name;
export const selectSingle = (state: RootState) => state.user.mysingle_id;

export default userSlice.reducer;