import { useSelector } from "react-redux";

import ViewRegister from "./ViewRegister";
import ViewUnregister from "./ViewUnregister";
import { STATE, ROLE } from '../../../constants/keywords'

import { selectRole } from "../../../store/userSlice";
import { selectDeviceStatus, selectDevices, selectUnregisterDevices } from "../../../store/deviceSlice";
import { selectRowCount } from "../../../store/appSlice";

function ViewTeamDevices() {
    const role = useSelector(selectRole)
    const devices = useSelector(selectDevices);
    const recordsPerPage = useSelector(selectRowCount)
    const u_devices = useSelector(selectUnregisterDevices);
    const status = useSelector(selectDeviceStatus);

    if (status === STATE.LOADING) {
        return <div>Loading...</div>;

    } else if (status === STATE.FAILED) {
        return <div>Failed to load devices...</div>;

    } else if (role === ROLE.USER || role === ROLE.UNKNOWN) {
        return ViewRegister(devices, recordsPerPage)

    } else {
        return (
            <>
                {ViewRegister(devices, recordsPerPage)}
                <br /><br />
                {ViewUnregister(u_devices, recordsPerPage)}
            </>
        )
    }
}

export default ViewTeamDevices
