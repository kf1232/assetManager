import { useSelector } from 'react-redux';
import { RenderColumns } from './AssignedTableConstants';
import AssignedDevicesTable from './AssignedDevicesTable';
import { selectMyDevices } from '../../../store/deviceSlice';
import { selectRowCount } from '../../../store/appSlice';

import './AssignedDevices.module.css'

function ViewAssignedDevices() {
    const devices = useSelector(selectMyDevices)
    const row_count = useSelector(selectRowCount)

    return AssignedDevicesTable(devices, row_count, RenderColumns)
}

export default ViewAssignedDevices;