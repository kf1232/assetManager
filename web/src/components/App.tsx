import './App.css'

import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import Developer from './Developer/Developer'
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux'
import { Suspense, useCallback, useEffect } from 'react'
import { fetchUserData } from '../store/userSlice'
import { AppDispatch, RootState } from '../store/store'
import { fetchMyDevices, fetchPhonebook, fetchTeamDevices, fetchUnregisterTeamDevices } from '../store/deviceSlice'
import { fetchTeamLeaders, fetchTeamMembers, fetchTeamMembersU, fetchUserLookup } from '../store/teamSlice'
import NavigationBar from './Body/NavigationBar/NavigationBar'
import BASE_URL from '../constants/BASE_URL'

const socket = io(BASE_URL, { secure: true, rejectUnauthorized: false });

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user)

    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch])

    useEffect(() => {
        if (user.nt_id === 'defaultid2025') return;
        dispatch(fetchMyDevices(user))
    }, [user.nt_id, dispatch])

    useEffect(() => {
        if (user.team === 'Default Team') return;

        const fetchTeamData = () => {
            dispatch(fetchTeamDevices(user.team))
            dispatch(fetchUnregisterTeamDevices(user.team))
            dispatch(fetchTeamMembers(user.team))
            dispatch(fetchTeamMembersU(user.team))
            dispatch(fetchTeamLeaders())
            dispatch(fetchPhonebook())
            dispatch(fetchUserLookup())
        }

        fetchTeamData()
    }, [user.team, dispatch])

    const handleDeviceUpdate = useCallback(() => {
        dispatch(fetchMyDevices(user))
        dispatch(fetchTeamDevices(user.team));
        dispatch(fetchUnregisterTeamDevices(user.team));
        dispatch(fetchPhonebook());
    }, [dispatch, user.team])

    const handleUserUpdate = useCallback(() => {
        dispatch(fetchMyDevices(user))
        dispatch(fetchTeamMembers(user.team))
        dispatch(fetchTeamMembersU(user.team))
        dispatch(fetchTeamLeaders())
    }, [dispatch, user.team])

    useEffect(() => {
        socket.on('device_update', handleDeviceUpdate);
        socket.on('user_update', handleUserUpdate);

        return () => {
            socket.off('device_update', handleDeviceUpdate);
            socket.off('user_update', handleUserUpdate)
        }
    }, [handleDeviceUpdate, handleUserUpdate])

    return (
        <Suspense fallback={<div> Loading... </div>}>
            <Header />
            <Developer />
            <NavigationBar />
            <Body />
            <Footer />
        </Suspense>
    )
}


export default App
