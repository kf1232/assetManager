import { useEffect, useState } from "react";
import { Device, ColumnOverride, RenderColumns } from "./TeamDevicesConstants";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLookup } from "../../../store/teamSlice";
import EditableCell from "../_shared/EditableCell";
import PopupComponent from "../_shared/PopupComponent";
import { AppDispatch } from "../../../store/store";
import { upsertDevice } from "../../../store/deviceSlice";
import RenderPageSelect from "../_shared/RenderPageSelect";
import RenderTableHeader from "../_shared/RenderTableHeader";
import RenderBlankRows from "../_shared/RenderBlankRows";
import styles from './TeamDevices.module.css'
import { SORT } from '../../../constants/keywords'
import RegisterDevice from "../_shared/RegisterDevice";
import RemoveDevice from "../_shared/RemoveDevice";
import AssignedUserSelector from "../_shared/AssignedUserSelector";
import searchUserName from "../../../middlewear/searchUserName";
import deviceWarningState from "./deviceWarningState";
import RenderTableTitle from "../_shared/RenderTableTitle";
import RegisteredDevices from "../../../model/mobileadmin_registereddevices";

const ViewRegister = (devices: Array<Device>, recordsPerPage: number) => {
    const dispatch = useDispatch<AppDispatch>();
    const UserNames = useSelector(selectUserLookup)
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<{ [key: string]: string }>({});

    const [sortConfig, setSortConfig] = useState<{ key: keyof RegisteredDevices, direction: string } | null>(null);

    const sortedDevices = () => {
        if (!sortConfig) return devices;

        const sorted = [...devices].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === SORT.ASCENDING ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === SORT.ASCENDING ? 1 : -1;
            }
            return 0;
        });

        return sorted;
    };

    const handleSort = (key: keyof RegisteredDevices) => {
        let direction = SORT.ASCENDING;
        if (sortConfig && sortConfig.key === key && sortConfig.direction === SORT.ASCENDING) {
            direction = SORT.DESCENDING;
        }
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        setCurrentPage(1)
    }, [recordsPerPage])

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, column: string) => {
        setFilters({
            ...filters,
            [column]: e.target.value,
        });
        setCurrentPage(1);
    };

    const getFilteredDevices = () => {
        return sortedDevices().filter((device: any) =>
            Object.keys(filters).every(key =>
                device[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
            )
        );
    };

    const filteredDevices = getFilteredDevices();

    // Pagination logic
    const totalPages = Math.ceil(filteredDevices.length / recordsPerPage);
    const paginatedDevices = filteredDevices.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleFormSubmit = (event: string, action: string, data: Device) => {

        switch (action) {
            case 'UpdateGSWave':
                dispatch(upsertDevice({ serialNumber: data.serialNumber, gsWave: event }))
                break;
            case 'UpdateNote':
                dispatch(upsertDevice({ serialNumber: data.serialNumber, deviceNotes: event }))
                break;
            default:
                return null
        }
    }

    const RenderTableData = <K extends keyof Device>(device: Device, key: K) => {
        const k = String(key)
        const value = device[key];

        if (key === 'serialNumber') {
            return (
                <td key={`${device.serialNumber}-serialNumber`}>
                    {value.toUpperCase()}
                    <br />
                    {device.ModelName} : {device.AndroidVer}
                    <br />
                </td>
            )
        }
        else if (key === 'assignedUser') {
            let name = searchUserName(device.assignedUser, UserNames)
            return (
                <td key={k}>{name}</td>
            )
        }
        else if (key === 'full_name') {
            return (
                <td key={k}>
                    {device.full_name}
                    <br />
                    {device.LastUserDeptName}
                </td>
            )
        }
        else if (key === 'LastUserTimestamp') {
            return (
                <td key={k}>
                    Login: {device.LastUserTimestamp.substring(0, 11).replace('T', ' ')}
                    <br />
                    WiFi: {device.LastAPTimestamp.substring(0, 11).replace('T', ' ')}
                </td>
            )
        }
        else {
            return (<td key={k}>{value}</td>)
        }
    }

    return (
        <div>
            {RenderTableTitle(
                'Team Devices',
                'Devices claimed will appear in this list.'
            )}
            <div className={styles.tableHeader}>
                <RegisterDevice />
                {RenderPageSelect(handlePreviousPage, handleNextPage, currentPage, totalPages)}
            </div>
            <table>
                {RenderTableHeader(RenderColumns, ColumnOverride, filters, handleFilterChange, handleSort)}
                <tbody>
                    {paginatedDevices.map((device: Device) => (
                        <tr key={device.serialNumber} className={deviceWarningState(device)}>
                            {RenderColumns.map(key => {
                                if (key === 'gsWave') {
                                    return <EditableCell key={`${device.serialNumber}-gsWave`} initialValue={device.gsWave} onSave={(e) => handleFormSubmit(e, 'UpdateGSWave', device)} />
                                } else if (key === 'deviceNotes') {
                                    return <EditableCell key={`${device.serialNumber}-deviceNotes`} initialValue={device.deviceNotes} onSave={(e) => handleFormSubmit(e, 'UpdateNote', device)} />
                                } else if (key === 'assignedUser') {
                                    return <AssignedUserSelector data={device} />
                                } else {
                                    return RenderTableData(device, key)
                                }
                            })}
                            <td key={`${device.serialNumber}-Actions`} className='Action-Container'>
                                <PopupComponent data={device} type={'DeviceRegister'} />
                                <RemoveDevice data={device} />
                            </td>
                        </tr>
                    ))}
                    {RenderBlankRows(recordsPerPage, paginatedDevices.length, RenderColumns)}
                </tbody>
            </table>
        </div>
    )
}

export default ViewRegister