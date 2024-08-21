import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'
import { UserState } from './userSlice';
import BASE_URL from '../constants/BASE_URL';
import RegisteredDevices from '../model/mobileadmin_registereddevices';
import UnregisteredDevices from '../model/mobileadmin_unregistereddevices';
import MobilePhonebook from '../model/mobileadmin_phonebook';
import ManagedDevice from '../model/interface_managedevice';

interface DeviceState {
    my_devices: Array<RegisteredDevices>;
    team_devices: Array<RegisteredDevices>;
    u_team_devices: Array<UnregisteredDevices>;
    phonebook: Array<MobilePhonebook>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: DeviceState = {
    my_devices: [],
    team_devices: [],
    u_team_devices: [],
    phonebook: [],
    status: 'idle'
}

export const fetchMyDevices = createAsyncThunk('user/fetchMyDevices', async (userObject: UserState) => {

    try {
        const res = await axios.post(`${BASE_URL}/devices/user/`, {
            name: userObject.name,
            mysingle_id: userObject.mysingle_id,
            nt_id: userObject.nt_id
        }, { withCredentials: true });
        return res.data.my_devices
    } catch (error) {
        console.error(error)
    }
})

export const fetchTeamDevices = createAsyncThunk('user/fetchTeamDevices', async (team: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/devices/team/r/${team}`, { withCredentials: true });
        return res.data.team_devices
    } catch (error) {
        console.error(error)
    }
})

export const fetchUnregisterTeamDevices = createAsyncThunk('user/fetchUnregisterTeamDevices', async (team: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/devices/team/u/${team}`, { withCredentials: true })
        return res.data.team_devices
    } catch (error) {
        console.error(error)
    }
})

export const fetchPhonebook = createAsyncThunk('devices/fetchPhonebook', async () => {
    try {
        const res = await axios.get(`${BASE_URL}/devices/phonebook`, { withCredentials: true })
        return res.data.phonebook
    } catch (error) {
        console.error(error)
    }
})

export const deviceAction = createAsyncThunk('devices/upsertDevice', async (input: Partial<ManagedDevice>) => {
    try {
        const res = await axios.post(`${BASE_URL}/devices/upsert`, input, { withCredentials: true })
        return res.data
    } catch (error) {
        console.error(error)
    }
})

/**
 * An asynchronous thunk action creator for upserting (creating or updating) a device.
 *
 * The `createAsyncThunk` function generates an action creator that handles
 * the asynchronous logic and dispatches pending, fulfilled, and rejected actions
 * based on the promise returned from the provided payload creator.
 *
 * @param {string} typePrefix - A string that serves as a prefix for the generated action types.
 *                             The action types will be in the format: `${typePrefix}/pending`,
 *                             `${typePrefix}/fulfilled`, and `${typePrefix}/rejected`.
 *                             In this case, 'devices/upsertDevice' is the prefix.
 * @param {Function} payloadCreator - An asynchronous function that performs the actual
 *                                    upsert operation for the device. It takes a `Partial<ManagedDevice>`
 *                                    as input and returns a promise that resolves to the result
 *                                    of the upsert operation. The resolved value will be used
 *                                    as the payload for the fulfilled action.
 * @returns {AsyncThunkAction} - Returns an async thunk action creator function.
 *
 * Example usage:
 * ```
 * dispatch(deviceAction({ id: '123', name: 'New Device' }));
 * ```
 */
export const upsertDevice = createAsyncThunk(
    'devices/upsertDevice',
    async (input: Partial<ManagedDevice>) => {
        try {
            const res = await axios.post(`${BASE_URL}/devices/upsert`, input, { withCredentials: true })
            return res.data
        } catch (error) {
            console.error(error)
        }
    }
);

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.status = 'loading';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhonebook.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchPhonebook.rejected, (state) => { state.status = 'failed'; })
            .addCase(fetchPhonebook.fulfilled, (state, action: PayloadAction<Array<MobilePhonebook>>) => {
                state.phonebook = action.payload;
                state.status = 'idle'
            })

            // MobileAdmin.RegisteredDevices
            .addCase(fetchTeamDevices.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchTeamDevices.rejected, (state) => { state.status = 'failed'; })
            .addCase(fetchTeamDevices.fulfilled, (state, action: PayloadAction<Array<RegisteredDevices>>) => {
                state.team_devices = action.payload;
                state.status = 'idle'
            })


            // MobileAdmin.RegisteredDevices
            .addCase(fetchMyDevices.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchMyDevices.rejected, (state) => { state.status = 'failed'; })
            .addCase(fetchMyDevices.fulfilled, (state, action: PayloadAction<Array<RegisteredDevices>>) => {
                state.my_devices = action.payload;
                state.status = 'idle'
            })

            // MobileAdmin.UnregisteredDevices
            .addCase(fetchUnregisterTeamDevices.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchUnregisterTeamDevices.rejected, (state) => { state.status = 'failed'; })
            .addCase(fetchUnregisterTeamDevices.fulfilled, (state, action: PayloadAction<Array<UnregisteredDevices>>) => {
                state.u_team_devices = action.payload;
                state.status = 'idle'
            })
    }
})

export const { setLoading } = deviceSlice.actions

export const selectMyDevices = (state: RootState) => state.device.my_devices;
export const selectDevices = (state: RootState) => state.device.team_devices;
export const selectUnregisterDevices = (state: RootState) => state.device.u_team_devices;
export const selectPhonebook = (state: RootState) => state.device.phonebook;
export const selectDeviceStatus = (state: RootState) => state.device.status;

export default deviceSlice.reducer;