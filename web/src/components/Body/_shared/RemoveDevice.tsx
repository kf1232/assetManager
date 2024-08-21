import React from 'react';
import styles from './ReleaseDevice.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { upsertDevice } from '../../../store/deviceSlice';
import { selectRole } from '../../../store/userSlice';
import { ROLE } from '../../../constants/keywords';
import RegisteredDevices from '../../../model/mobileadmin_registereddevices';

interface PopupComponentProps {
    data: RegisteredDevices;
}

const RemoveDevice: React.FC<PopupComponentProps> = ({ data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const userRole = useSelector(selectRole)

    if(userRole === ROLE.USER) return <div></div>

    const handleFormSubmit = (action: string, data: any) => {
        switch (action) {
            case 'Presto Deleto': {
                dispatch(upsertDevice(data))
                return;
            }
            default:
                return;
        }
    }

    let dData = {
        serialNumber: data.serialNumber,
        assignedUser: '',
        ashift: '',
        bshift: '',
        cshift: '',
        dshift: '',
        ownerTeam: ''
    }

    return (
        <button className={styles.releaseButton} onClick={() => handleFormSubmit('Presto Deleto', dData)}> Remove Device </button>
    )
}



export default RemoveDevice