import styles from './styles.module.css'

import { useEffect, useState } from "react";
import { ColumnOverrideU, RenderColumnsU } from "./TeamMemberConstants";
import RenderPageSelect from "../_shared/RenderPageSelect";
import RenderTableHeader from "../_shared/RenderTableHeader";
import RenderBlankRows from "../_shared/RenderBlankRows";
import PopupComponent from "../_shared/PopupComponent";
import { SORT } from "../../../constants/keywords";
import RenderTableTitle from "../_shared/RenderTableTitle";
import UnregisteredUsers from "../../../model/mobileadmin_unregisteredusers";
import RegisterUser from "../_shared/RegisterUser";
import ClaimUserButton from "./ClaimUserButton";
import HideUserButton from "./HideUserButton";

const ViewUnregister = (teamMembers: Array<UnregisteredUsers>, recordsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<{ [key: string]: string }>({});

    const [sortConfig, setSortConfig] = useState<{ key: keyof UnregisteredUsers, direction: string } | null>(null);

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

    const handleSort = (key: keyof UnregisteredUsers) => {
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
    }; 0

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const RenderTableData = (user: UnregisteredUsers, key: keyof UnregisteredUsers) => {
        const value = user[key];

        if (key === 'full_name') {
            return (
                <td key={`${user.mysingle_id}-fullName`}>
                    {user.full_name}
                    <br />
                    {user.dept_name}
                </td>
            )
        } else {
            return (<td key={`${user.mysingle_id}-${value}`}>{value}</td>)
        }
    }

    return (
        <div>
            {RenderTableTitle(
                'Unregistered Team Members',
                'Users in this list match your current team assignment, and are available for quick claim.'
            )}
            <div className={styles.tableHeader}>
                <RegisterUser />
                {RenderPageSelect(handlePreviousPage, handleNextPage, currentPage, totalPages)}
            </div>
            <table>
                {RenderTableHeader(RenderColumnsU, ColumnOverrideU, filters, handleFilterChange, handleSort)}
                <tbody>
                    {paginatedDevices.map((user: UnregisteredUsers) => (
                        <tr key={user.mysingle_id}>
                            {RenderColumnsU.map(key => {
                                return RenderTableData(user, key)
                            })}
                            <td key={`${user.mysingle_id}-Actions`} className='Action-Container'>
                                <PopupComponent data={user} type={'UserUnregister'} />
                                <ClaimUserButton data={user} />
                                <HideUserButton data={user} />
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