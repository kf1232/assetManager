import { useEffect, useState } from "react";

import { ColumnOverride, RenderColumns } from "./TeamMemberConstants";
import RenderPageSelect from "../_shared/RenderPageSelect";
import RenderTableHeader from "../_shared/RenderTableHeader";
import RenderBlankRows from "../_shared/RenderBlankRows";
import PopupComponent from "../_shared/PopupComponent";
import { SORT } from "../../../constants/keywords";
import styles from './styles.module.css'
import RenderTableTitle from "../_shared/RenderTableTitle";
import RegisteredUsers from "../../../model/mobileadmin_registeredusers";
import RegisterUser from "../_shared/RegisterUser";
import AssignRoleButton from "./AssignRoleButton";
import RemoveUserButton from "./RemoveUserButton";

const ViewRegister = (teamMembers: Array<RegisteredUsers>, recordsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<{ [key: string]: string }>({});

    const [sortConfig, setSortConfig] = useState<{ key: keyof RegisteredUsers, direction: string } | null>(null);

    const sortedDevices = () => {
        if (!sortConfig) return teamMembers;

        const sorted = [...teamMembers].sort((a, b) => {
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

    const handleSort = (key: keyof RegisteredUsers) => {
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

    const RenderTableData = <K extends keyof RegisteredUsers>(user: RegisteredUsers, key: K) => {
        const k = String(key)

        if (key === 'full_name') {
            return (
                <td key={`${user.mysingle_id}-full-name`}>
                    {user.full_name}
                    <br />
                    {user.dept_name}
                </td>
            )
        } else if (key === 'appRole') {
            return (
                <td key={`${user.mysingle_id}-RoleSet`}>
                    <AssignRoleButton data={user} />
                </td>
            )
        } else {
            return (
                <td key={k}> <button className="Action-Button-Remove"> Release Device</button> </td>
            )
        }
    }

    return (
        <div>
            {RenderTableTitle(
                'Registered Team Members',
                'Registered team members have access to the website and can be assigned to any device in ownership.'
            )}
            <div className={styles.tableHeader}>
                <RegisterUser />
                {RenderPageSelect(handlePreviousPage, handleNextPage, currentPage, totalPages)}
            </div>
            <table>
                {RenderTableHeader(RenderColumns, ColumnOverride, filters, handleFilterChange, handleSort)}
                <tbody>
                    {paginatedDevices.map((device: any) => (
                        <tr key={device.serialNumber}>
                            {RenderColumns.map(key => {
                                return RenderTableData(device, key)
                            })}
                            <td key={`${device.mysingle_id}-Actions`} className='Action-Container'>
                                <PopupComponent data={device} type={'UserRegister'} />
                                <RemoveUserButton data={device} />
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