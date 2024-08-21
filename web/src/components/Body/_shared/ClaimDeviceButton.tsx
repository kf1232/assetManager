import { useDispatch, useSelector } from 'react-redux';
import styles from './ClaimDeviceButton.module.css'
import { selectTeam } from '../../../store/userSlice';
import { AppDispatch } from '../../../store/store';
import { upsertDevice } from '../../../store/deviceSlice';
import ManagedDevice from '../../../model/interface_managedevice';
import UnregisteredDevices from '../../../model/mobileadmin_unregistereddevices';

const ClaimDeviceButton = (data: { data: Partial<UnregisteredDevices>}) => {
    const dispatch = useDispatch<AppDispatch>();
    const currentTeam = useSelector(selectTeam);

    const handleButton = () => {
        let device = data.data
        let submitData: Partial<ManagedDevice> = {
            serialNumber: device.SerialNum,
            ownerTeam: currentTeam
        }

        dispatch(upsertDevice(submitData))
    }

    return <button className={styles.claimButton} onClick={handleButton}> Claim Device </button>
}

export default ClaimDeviceButton