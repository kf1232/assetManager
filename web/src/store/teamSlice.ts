import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from './store'
import BASE_URL from "../constants/BASE_URL";
import RegisteredUsers from "../model/mobileadmin_registeredusers";
import UnregisteredUsers from "../model/mobileadmin_unregisteredusers";
import UserLookup from "../model/interface_userlookup";
import Users from "../model/mobileadmin_users";

interface TeamState {
    team_members: Array<RegisteredUsers>;
    u_team_members: Array<UnregisteredUsers>;
    team_leaders: Array<RegisteredUsers>;
    user_lookup: Array<UserLookup>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TeamState = {
    team_members: [],
    u_team_members: [],
    team_leaders: [],
    user_lookup: [],
    status: 'idle'
}

interface UpsertArgs {
    ghrNumber: string;
    teamName: string;
    appRole: string;
}

export const upsertTeamMembers = createAsyncThunk<void, UpsertArgs, { state: RootState }>('team/upsertTeamMembers', async (payload: Partial<Users>) => {
        if (payload.ghrNumber === '' || payload.ghrNumber === null) return null;

        try {
            const res = await axios.post(`${BASE_URL}/team/upsert`, payload, { withCredentials: true });
            return res.data
        } catch (error) {
            console.error(error)
        }
    })

export const fetchTeamMembers = createAsyncThunk('team/fetchTeamMembers', async (team: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/team/r/${team}`, { withCredentials: true })
        return res.data.team_members
    } catch (error) {
        console.error(error)
    }
})

export const fetchTeamMembersU = createAsyncThunk('team/fetchTeamMembersU', async (team: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/team/u/${team}`, { withCredentials: true })
        return res.data.team_members
    } catch (error) {
        console.error(error);
    }
})

export const fetchTeamLeaders = createAsyncThunk('team/fetchTeamLeaders', async () => {
    try {
        const res = await axios.get(`${BASE_URL}/team/leaders`, { withCredentials: true })
        return res.data.team_members
    } catch (error) {
        console.error(error);
    }
})

export const fetchUserLookup = createAsyncThunk('team/fetchUserLookup', async () => {
    try {
        const res = await axios.get(`${BASE_URL}/user/lookup/`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.error(error)
    }
})

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.status = 'loading'
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserLookup.pending, (state) => { state.status = 'loading' })
            .addCase(fetchUserLookup.rejected, (state) => { state.status = 'failed'; })
            .addCase(fetchUserLookup.fulfilled, (state, action: PayloadAction<Array<UserLookup>>) => {
                state.user_lookup = action.payload;
                state.status = 'idle'
            })

            // MobileAdmin.RegisteredUsers
            .addCase(fetchTeamLeaders.pending, (state) => { state.status = 'loading' })
            .addCase(fetchTeamLeaders.rejected, (state) => { state.status = 'failed'; })
            .addCase(fetchTeamLeaders.fulfilled, (state, action: PayloadAction<Array<RegisteredUsers>>) => {
                state.team_leaders = action.payload;
                state.status = 'idle'
            })

            // MobileAdmin.RegisteredUsers
            .addCase(fetchTeamMembers.pending, (state) => { state.status = 'loading' })
            .addCase(fetchTeamMembers.rejected, (state) => { state.status = 'failed'; })
            .addCase(fetchTeamMembers.fulfilled, (state, action: PayloadAction<Array<RegisteredUsers>>) => {
                state.team_members = action.payload;
                state.status = 'idle'
            })

            // MobileAdmin.UnregisteredUsers
            .addCase(fetchTeamMembersU.pending, (state) => { state.status = 'loading' })
            .addCase(fetchTeamMembersU.rejected, (state) => { state.status = 'failed'; })
            .addCase(fetchTeamMembersU.fulfilled, (state, action: PayloadAction<Array<UnregisteredUsers>>) => {
                state.u_team_members = action.payload;
                state.status = 'idle'
            })
    }
})

export const { setLoading } = teamSlice.actions;

export const selectTeamMembers = (state: RootState) => state.team.team_members;
export const selectTeamMembersU = (state: RootState) => state.team.u_team_members;
export const selectTeamLeaders = (state: RootState) => state.team.team_leaders;
export const selectUserLookup = (state: RootState) => state.team.user_lookup;
export const selectTeamStatus = (state: RootState) => state.team.status;

export default teamSlice.reducer;