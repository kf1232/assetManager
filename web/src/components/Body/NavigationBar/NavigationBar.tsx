import styles from './NavigationBar.module.css'
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../store/store";
import { ROLE, ACTIONS } from "../../../constants/keywords";
import {
    setAssignedDevices,
    setTeamDevices,
    setTeamMembers,
    setTeamManagers,
    setMobilePhonebook,
    setAdminPannel,
} from "../../../store/appSlice";


function NavigationBar() {
    const dispatch = useDispatch();
    const role = useSelector((state: RootState) => state.user.role)

    const assigned_devices_button_text = 'Assigned Devices'
    const team_devices_button_text = 'Team Devices'
    const team_members_button_text = 'Team Members'
    //const team_managers_button_text = 'Site Team Managers'
    const mobile_phonebook_button_text = 'Mobile Phonebook'
    //const admin_view_button_text = 'Admin Pannel'

    const handleViewChange = (view: string) => {
        switch (view) {
            case
                ACTIONS.ASSIGNED_DEVICES: dispatch(setAssignedDevices());
                break;
            case
                ACTIONS.TEAM_DEVICES: dispatch(setTeamDevices());
                break;
            case
                ACTIONS.TEAM_MEMBERS: dispatch(setTeamMembers());
                break;
            case
                ACTIONS.TEAM_MANAGERS: dispatch(setTeamManagers());
                break;
            case
                ACTIONS.MOBILE_PHONEBOOK: dispatch(setMobilePhonebook());
                break;
            case
                ACTIONS.ADMIN_PANNEL: dispatch(setAdminPannel());
                break;
            default:
                break;
        }
    }

    /*
        <button onClick={() => { handleViewChange(ACTIONS.TEAM_MANAGERS) }}>{team_managers_button_text}</button>
        <button onClick={() => { handleViewChange(ACTIONS.MOBILE_PHONEBOOK) }}>{mobile_phonebook_button_text}</button>
        <button onClick={() => { handleViewChange(ACTIONS.ADMIN_PANNEL) }}>{admin_view_button_text}</button>
    */

    switch (role) {
        case ROLE.ADMIN:
            return (
                <div className={styles.navBar}>
                    <button onClick={() => { handleViewChange(ACTIONS.ASSIGNED_DEVICES) }}>{assigned_devices_button_text}</button>
                    <button onClick={() => { handleViewChange(ACTIONS.TEAM_DEVICES) }}>{team_devices_button_text}</button>
                    <button onClick={() => { handleViewChange(ACTIONS.TEAM_MEMBERS) }}>{team_members_button_text}</button>
                    <button onClick={() => { handleViewChange(ACTIONS.MOBILE_PHONEBOOK) }}>{mobile_phonebook_button_text}</button>
                </div>
            )
        case ROLE.MANAGER:
            return (
                <div className={styles.navBar}>
                    <button onClick={() => { handleViewChange(ACTIONS.ASSIGNED_DEVICES) }}>{assigned_devices_button_text}</button>
                    <button onClick={() => { handleViewChange(ACTIONS.TEAM_DEVICES) }}>{team_devices_button_text}</button>
                    <button onClick={() => { handleViewChange(ACTIONS.TEAM_MEMBERS) }}>{team_members_button_text}</button>
                    <button onClick={() => { handleViewChange(ACTIONS.MOBILE_PHONEBOOK) }}>{mobile_phonebook_button_text}</button>
                </div>
            )
        case ROLE.USER:
            return (
                <div className={styles.navBar}>
                    <button onClick={() => { handleViewChange(ACTIONS.ASSIGNED_DEVICES) }}>{assigned_devices_button_text}</button>
                    <button onClick={() => { handleViewChange(ACTIONS.TEAM_DEVICES) }}>{team_devices_button_text}</button>
                    <button onClick={() => { handleViewChange(ACTIONS.TEAM_MEMBERS) }}>{team_members_button_text}</button>
                    <button onClick={() => { handleViewChange(ACTIONS.MOBILE_PHONEBOOK) }}>{mobile_phonebook_button_text}</button>
                </div>
            )
        default:
            return (
                <></>
            )
    }
}

export default NavigationBar
