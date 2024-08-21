import React from 'react';
import styles from './ReleaseDevice.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { upsertDevice } from '../../../store/deviceSlice';
import RegisteredDevices from '../../../model/mobileadmin_registereddevices';

interface PopupComponentProps {
    data: RegisteredDevices;
}


const ReleaseDevice: React.FC<PopupComponentProps> = ({ data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const cUser = useSelector((state: RootState) => state.user)

    const handleFormSubmit = (action: string, data: any, user: any) => {

        if (user.includes(data.assignedUser)) {
            data.assignedUser = '';
        }
        if (user.includes(data.ashift)) {
            data.ashift = '';
        }
        if (user.includes(data.bshift)) {
            data.bshift = '';
        }
        if (user.includes(data.cshift)) {
            data.cshift = '';
        }
        if (user.includes(data.dshift)) {
            data.dshift = '';
        }

        switch (action) {
            case 'Deleto': {
                dispatch(upsertDevice(data))
                return;
            }
            default:
                return;
        }
    }

    let uData = [cUser.mysingle_id, cUser.name, cUser.nt_id]
    let dData = {
        serialNumber: data.serialNumber,
        assignedUser: data.assignedUser,
        ashift: data.ashift,
        bshift: data.bshift,
        cshift: data.cshift,
        dshift: data.dshift
    }

    return (
        <button className={styles.releaseButton} onClick={() => handleFormSubmit('Deleto', dData, uData)}> Release Assignment </button>
    )
}



export default ReleaseDevice