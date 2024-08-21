import styles from './AssignedDevices.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ColumnOverride } from './AssignedTableConstants'

import { AppDispatch } from '../../../store/store';
import { upsertDevice } from "../../../store/deviceSlice";
import RegisteredDevices from '../../../model/mobileadmin_registereddevices';

import EditableCell from '../_shared/EditableCell';
import RenderPageSelect from '../_shared/RenderPageSelect';
import RenderTableHeader from '../_shared/RenderTableHeader';
import PopupComponent from '../_shared/PopupComponent';
import RenderBlankRows from '../_shared/RenderBlankRows';
import RenderTableTitle from '../_shared/RenderTableTitle';
import ReleaseDevice from '../_shared/ReleaseDevice';
import { SORT } from '../../../constants/keywords';
import searchUserName from '../../../middlewear/searchUserName';
import { selectUserLookup } from '../../../store/teamSlice';

const AssignedDevicesTable = (devices: Array<RegisteredDevices>, recordsPerPage: number, RenderColumns: Array<keyof RegisteredDevices>) => {
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
        return sortedDevices().filter((device: RegisteredDevices) =>
            Object.keys(filters).every(key => {
                const deviceKey = key as keyof RegisteredDevices;
                return device[deviceKey]?.toString().toLowerCase().includes(filters[deviceKey].toLowerCase())
            })
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

    const RenderTableData = (device: RegisteredDevices, key: keyof RegisteredDevices) => {
        const k = String(key)
        const value = device[key];

        if (key === 'serialNumber') {
            return (
                <td key={`${device.serialNumber}-${key}`}>
                    {value.toUpperCase()}
                    <br />
                    {device.ModelName}
                </td>
            )
        }
        else if (key === 'assignedUser') {
            const name = searchUserName(device.assignedUser, UserNames)

            return <td key={k}>{name}</td>
        }
        else if (key === 'full_name') {
            return (
                <td key={k}>
                    {device.full_name}
                    <br />
                    {device.dept_name_short}
                </td>
            )
        }
        else if (key === 'LastUserTimestamp') {
            return (
                <td key={k}>
                    Login: {device.LastUserTimestamp.substring(0, 16).replace('T', ' ')}
                    <br />
                    WiFi: {device.LastAPTimestamp.substring(0, 16).replace('T', ' ')}
                </td>
            )
        }
        else {
            return (<td key={k}>{value}</td>)
        }
    }

    const handleFormSubmit = (event: string, action: string, data: RegisteredDevices) => {
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

    return (
        <div>
            <div className={styles.tableHeader}>
                {RenderTableTitle(
                    'Assigned Mobile Devices',
                    'Mobile Cellphone and Tablets assigned to current user.'
                )}
                {RenderPageSelect(handlePreviousPage, handleNextPage, currentPage, totalPages)}
            </div>

            <table>
                {RenderTableHeader(RenderColumns, ColumnOverride, filters, handleFilterChange, handleSort)}
                <tbody>
                    {paginatedDevices.map((device: RegisteredDevices) => (
                        <tr key={device.serialNumber}>
                            {RenderColumns.map(key => {
                                if (key === 'gsWave') {
                                    return <EditableCell key={`${device.serialNumber}-gsWave`} initialValue={device.gsWave} onSave={(e) => handleFormSubmit(e, 'UpdateGSWave', device)} />
                                } else if (key === 'deviceNotes') {
                                    return <EditableCell key={`${device.serialNumber}-deviceNotes`} initialValue={device.deviceNotes} onSave={(e) => handleFormSubmit(e, 'UpdateNote', device)} />
                                } else {
                                    return RenderTableData(device, key)
                                }
                            })}
                            <td key={`${device.serialNumber}-Actions`} className='Action-Container'>
                                <PopupComponent data={device} type={'AssignDevices'} />
                                <ReleaseDevice data={device} />
                            </td>
                        </tr>
                    ))}
                    {RenderBlankRows(recordsPerPage, paginatedDevices.length, RenderColumns)}
                </tbody>
            </table>
        </div>
    )
}

export default AssignedDevicesTable