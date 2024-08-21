import { ColumnOverrideU, RenderColumnsU } from "./TeamDevicesConstants";
import { useEffect, useState } from "react";
import PopupComponent from "../_shared/PopupComponent";
import RenderPageSelect from "../_shared/RenderPageSelect";
import RenderTableHeader from "../_shared/RenderTableHeader";
import RenderBlankRows from "../_shared/RenderBlankRows";
import { SORT } from "../../../constants/keywords";
import styles from './TeamDevices.module.css'
import RegisterDevice from "../_shared/RegisterDevice";
import ClaimDeviceButton from "../_shared/ClaimDeviceButton";
import HideDeviceButton from "../_shared/HideDeviceButton";
import RenderTableTitle from "../_shared/RenderTableTitle";
import UnregisteredDevices from "../../../model/mobileadmin_unregistereddevices";

const ViewUnregister = (devices: Array<UnregisteredDevices>, recordsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<{ [key: string]: string }>({});

    const [sortConfig, setSortConfig] = useState<{ key: keyof UnregisteredDevices, direction: string } | null>(null);

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

    const handleSort = (key: keyof UnregisteredDevices) => {
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

    const RenderTableData = (device: UnregisteredDevices, key: keyof UnregisteredDevices) => {
        const k = String(key)
        const value = device[key];

        if (key === 'SerialNum') {
            return (<td key={k}>{value.toUpperCase()}</td>)
        }
        else if (key === 'ModelName') {
            return (
                <td key={k}>
                    {device.ModelName} : {device.AndroidVer}
                    <br />
                    {device.ModelId}
                </td>
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
                    Login: {device.LastUserTimestamp ? device.LastUserTimestamp.substring(0, 11).replace('T', ' ') : null}
                    <br />
                    WiFi: {device.LastAPTimestamp ? device.LastAPTimestamp.substring(0, 11).replace('T', ' ') : "No Record"}
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
                'Unregistered Devices',
                'Devices in this list were last accessed by users within your group.'
            )}
            <div className={styles.tableHeader}>
                <RegisterDevice />
                {RenderPageSelect(handlePreviousPage, handleNextPage, currentPage, totalPages)}
            </div>
            <table>
                {RenderTableHeader(RenderColumnsU, ColumnOverrideU, filters, handleFilterChange, handleSort)}
                <tbody>
                    {paginatedDevices.map((device: UnregisteredDevices) => (
                        <tr key={device.SerialNum}>
                            {RenderColumnsU.map(key => {
                                return RenderTableData(device, key)
                            })}
                            <td key={'Actions'} className='Action-Container'>
                                <PopupComponent data={device} type={'DeviceUnregister'} />
                                <ClaimDeviceButton data={device} />
                                <HideDeviceButton data={device} />
                            </td>
                        </tr>
                    ))}
                    {RenderBlankRows(recordsPerPage, paginatedDevices.length, RenderColumnsU)}
                </tbody>
            </table>
        </div>
    )
}

export default ViewUnregister