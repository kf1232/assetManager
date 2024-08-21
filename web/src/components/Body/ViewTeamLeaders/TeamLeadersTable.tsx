import styles from './styles.module.css'

import { useState } from "react";
import { ColumnOverride, RenderColumns } from "./TeamLeadersConstants";
import RenderPageSelect from "../_shared/RenderPageSelect";
import RenderTableHeader from "../_shared/RenderTableHeader";
import RenderBlankRows from "../_shared/RenderBlankRows";
import { SORT } from "../../../constants/keywords";
import RenderTableTitle from "../_shared/RenderTableTitle";

function TeamLeadersTable(leaders: any, recordsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<{ [key: string]: string }>({});

    const [sortConfig, setSortConfig] = useState<{ key: string, direction: string } | null>(null);

    const sortedDevices = () => {
        if (!sortConfig) return leaders;

        const sorted = [...leaders].sort((a, b) => {
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

    const handleSort = (key: string) => {
        let direction = SORT.ASCENDING;
        if (sortConfig && sortConfig.key === key && sortConfig.direction === SORT.ASCENDING) {
            direction = SORT.DESCENDING;
        }
        setSortConfig({ key, direction });
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, column: string) => {
        setFilters({
            ...filters,
            [column]: e.target.value,
        });
        setCurrentPage(1);
    };

    const getFilteredMembers = () => {
        return sortedDevices().filter((member: any) =>
            Object.keys(filters).every(key =>
                member[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
            )
        );
    };

    const filteredMembers = getFilteredMembers();

    const totalPages = Math.ceil(filteredMembers.length / recordsPerPage);
    const paginatedMembers = filteredMembers.slice(
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

    return (
        <div>
            {RenderTableTitle(
                'Team Managers',
                'Current registered Managers and Admins for MAP Service.'
            )}
            <div className={styles.tableHeader}>
                <div />
                {RenderPageSelect(handlePreviousPage, handleNextPage, currentPage, totalPages)}
            </div>
            <table>
                {RenderTableHeader(RenderColumns, ColumnOverride, filters, handleFilterChange, handleSort)}
                <tbody>
                    {paginatedMembers.map((member: any) => (
                        <tr key={member.full_name}>
                            {RenderColumns.map(key => (
                                <td key={key}>{member[key]}</td>
                            ))}
                        </tr>
                    ))}
                    {RenderBlankRows(recordsPerPage, paginatedMembers.length, RenderColumns)}
                </tbody>
            </table>
        </div>
    )
}

export default TeamLeadersTable